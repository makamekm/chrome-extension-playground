const Dropdown = Vue.component('dropdown', {
  data: () => ({
    show: false,
  }),
  mounted() {
    this.$el.addEventListener("mouseenter", this.onEnter);
    this.$el.addEventListener("mouseleave", this.onLeave);
    this.$el.addEventListener("mouseup", this.onMouseUpElement);
    document.addEventListener("mouseup", this.onMouseUp);
    this.$parent.$on("hide", this.onHide);
    this.$parent.$on("showChild", this.onShowChild);
    this.checkPosition();
    window.addEventListener("resize", this.checkPosition);
  },
  destroyed() {
    this.$el.removeEventListener("mouseenter", this.onEnter);
    this.$el.removeEventListener("mouseleave", this.onLeave);
    this.$el.removeEventListener("mouseup", this.onMouseUpElement);
    document.removeEventListener("mouseup", this.onMouseUp);
    this.$parent.$off("hide", this.onHide);
    this.$parent.$off("showChild", this.onShowChild);
    window.removeEventListener("resize", this.checkPosition);
  },
  methods: {
    checkPosition() {
      const top = this.$refs.offset.getBoundingClientRect().top;
      const bottom = this.$refs.offset.getBoundingClientRect().bottom;
      const left = this.$refs.offset.getBoundingClientRect().left;
      const right = this.$refs.offset.getBoundingClientRect().right;
      const diffBottomY = Math.floor(bottom - window.innerHeight + 5);
      const diffRightX = Math.floor(right - window.innerWidth + 5);
      let diffX = 0;
      let diffY = 0;
      if (diffBottomY > 0) {
        diffY -= diffBottomY;
      }
      if (diffRightX > 0) {
        diffX -= diffRightX;
      }
      const diffTopY = Math.floor(top + diffY - 5);
      const diffLeftX = Math.floor(left + diffX - 5);
      if (diffTopY < 0) {
        diffY = -diffTopY;
      }
      if (diffLeftX < 0) {
        diffX = -diffLeftX;
      }
      this.$refs.content.style.transform = `translateX(${diffX}px) translateY(${diffY}px)`;
    },
    onShowChild($el) {
      if ($el !== this.$el) {
        this.onHide();
      }
    },
    onMouseUpElement(event) {
      if (!event.baseElements) {
        event.baseElements = [];
      }
      event.baseElements.push(this.$el);
    },
    onMouseUp() {
      if (!event.baseElements || event.baseElements.indexOf(this.$el) < 0) {
        this.onHide();
      }
    },
    onHide() {
      this.stopTimer();
      if (this.show) {
        this.show = false;
        this.$emit('hide', this.$el);
      }
    },
    onEnter() {
      this.stopTimer();
      if (!this.show) {
        this.show = true;
        this.$emit('show', this.$el);
      }
    },
    onLeave() {
      this.stopTimer();
      this.timer = setTimeout(this.onHide, 500);
    },
    stopTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = null;
    },
  },
  template: `<div :class="{'dropdown': true, 'active': show}" @mouseover="checkPosition">
    <slot></slot>
    <div class="dropdown-offset" ref="offset">
      <div class="dropdown-content" ref="content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>`,
})

const topVersion = `<div :class="{'menu-backdrop': true, 'active': show}">
  <div class="menu" ref="menu">
    <div class="menu-header">
      <div>
        RJ Access Menu
      </div>
    </div>
    <dropdown @hide="onHideChild" @show="onShowChild" class="menu-item">
      Menu 1
      <template #content>
        <div class="item">
          Test 1
        </div>
        <div class="item">
          Test 2
        </div>
        <dropdown class="item dropdown-right">
          <div class="row-left-right">
            <div>
              Test Menu 1
            </div>
            <div>
              >
            </div>
          </div>
          <template #content>
            <div class="item">
              Test 1
            </div>
            <div class="item">
              Test 2
            </div>
            <dropdown class="item dropdown-right">
              <div class="row-left-right">
                <div>
                  Test Menu 2
                </div>
                <div>
                  >
                </div>
              </div>
              <template #content>
                <div class="item">
                  Test 1
                </div>
                <div class="item">
                  Test 2
                </div>
                <div class="item">
                  Test 3
                </div>
              </template>
            </dropdown>
          </template>
        </dropdown>
      </template>
    </dropdown>
    <dropdown @hide="onHideChild" @show="onShowChild" class="menu-item">
      Menu 2
      <template #content>
        <div class="item">
          Test 1
        </div>
        <div class="item">
          Test 2
        </div>
        <div class="item">
          Test 3
        </div>
      </template>
    </dropdown>
    <div class="menu-item">
      Item Click 1
    </div>
    <div class="menu-item">
      Item Click 2
    </div>
    <div class="menu-gap"></div>
    <div class="menu-item">
      Item Click 3
    </div>
    <dropdown @hide="onHideChild" @show="onShowChild" class="menu-item dropdown-bottom-left">
      Menu 3
      <template #content>
        <div class="item">
          Test 1
        </div>
        <div class="item">
          Test 2
        </div>
        <dropdown class="item dropdown-left">
          <div class="row-left-right">
            <div>
              <
            </div>
            <div>
              Test Menu 1
            </div>
          </div>
          <template #content>
            <div class="item">
              Test 1
            </div>
            <div class="item">
              Test 2
            </div>
            <div class="item">
              Test 3
            </div>
          </template>
        </dropdown>
      </template>
    </dropdown>
  </div>
</div>`

const leftVersion = `<div :class="{'menu-backdrop left': true, 'active': show}">
  <div class="menu" ref="menu">
    <div class="menu-header">
      <div>
        RJ Access Menu
      </div>
    </div>
    <div class="menu-scroll">
      <div class="menu-group">
        <div class="menu-head-item">
          Item Click 1
        </div>
        <div class="menu-item">
          Item Click 1
        </div>
        <div class="menu-item">
          Item Click 2
        </div>
      </div>
      <div class="menu-item">
        Item Click 5
      </div>
      <div class="menu-item">
        Item Click 5
      </div>
      <div class="menu-item">
        Item Click 5
      </div>
      <div class="menu-item">
        Item Click 5
      </div>
      <div class="menu-item">
        Item Click 5
      </div>
      <div class="menu-item">
        Item Click 5
      </div>
      <div class="menu-item">
        Item Click 5
      </div>
      <div class="menu-item">
        Item Click 5
      </div>
      <div class="menu-item">
        Item Click 5
      </div>
      <div class="menu-item">
        Item Click 5
      </div>
      <div class="menu-item">
        Item Click 5
      </div>
      <div class="menu-item">
        Item Click 5
      </div>
      <div class="menu-item">
        Item Click 5
      </div>
      <div class="menu-item">
        Item Click 5
      </div>
      <div class="menu-item">
        Item Click 5
      </div>
      <div class="menu-item">
        Item Click 8
      </div>
    </div>
    <div class="menu-gap"></div>
    <div class="menu-item">
      Item Click 3
    </div>
    <dropdown @hide="onHideChild" @show="onShowChild" class="menu-item dropdown-right">
      Menu 3
      <template #content>
        <div class="item">
          Test 1
        </div>
        <div class="item">
          Test 2
        </div>
        <dropdown class="item dropdown-right">
          <div class="row-left-right">
            <div>
              Test Menu 1
            </div>
            <div>
              >
            </div>
          </div>
          <template #content>
            <div class="item">
              Test 1
            </div>
            <div class="item">
              Test 2
            </div>
            <div class="item">
              Test 3
            </div>
          </template>
        </dropdown>
      </template>
    </dropdown>
  </div>
</div>`

const container1 = document.createElement("div"); 
document.body.appendChild(container1);
const applicationTopVersion = new Vue({
  el: container1,
  template: topVersion,
  mounted() {
    window.toggleRJMenu = (show) => {
      this.toggleRJMenu(show);
    };
    document.addEventListener("mousemove", this.menuHoverWatcher);
  },
  methods: {
    toggleRJMenu() {
      this.near = !this.near;
      if (!this.near) {
        this.$emit('hide');
      }
    },
    menuHoverWatcher(event) {
      this.near = isNear(this.$refs.menu, 10, event);
    },
    onShowChild($el) {
      this.$emit('showChild', $el);
      if (!this.blockedDict[$el]) {
        this.blockedDict[$el] = true;
        this.blocked++;
      }
    },
    onHideChild($el) {
      if (this.blockedDict[$el]) {
        delete this.blockedDict[$el];
        this.blocked--;
      }
    },
  },
  computed: {
    show() {
      return this.near || this.blocked;
    },
  },
  data: () => ({
    near: false,
    blocked: 0,
    blockedDict: {},
  }),
});

const container2 = document.createElement("div"); 
document.body.appendChild(container2);
const applicationLeftVersion = new Vue({
  el: container2,
  template: leftVersion,
  mounted() {
    window.toggleRJMenu = (show) => {
      this.toggleRJMenu(show);
    };
    document.addEventListener("mousemove", this.menuHoverWatcher);
  },
  methods: {
    toggleRJMenu() {
      this.near = !this.near;
      if (!this.near) {
        this.$emit('hide');
      }
    },
    menuHoverWatcher(event) {
      this.near = isNear(this.$refs.menu, 10, event);
    },
    onShowChild($el) {
      this.$emit('showChild', $el);
      if (!this.blockedDict[$el]) {
        this.blockedDict[$el] = true;
        this.blocked++;
      }
    },
    onHideChild($el) {
      if (this.blockedDict[$el]) {
        delete this.blockedDict[$el];
        this.blocked--;
      }
    },
  },
  computed: {
    show() {
      return this.near || this.blocked;
    },
  },
  data: () => ({
    near: false,
    blocked: 0,
    blockedDict: {},
  }),
});

function isNear(element, distance, event) {
  const left = element.getBoundingClientRect().left - distance;
  const top = element.getBoundingClientRect().top - distance + window.pageYOffset;
  const right = left + element.getBoundingClientRect().width + 2 * distance;
  const bottom = top + element.getBoundingClientRect().height + 2 * distance;
  const x = event.pageX;
  const y = event.pageY;

  return (x > left && x < right && y > top && y < bottom);
};