const containerTopVersion = document.createElement("div"); 
document.body.appendChild(containerTopVersion);
const applicationTopVersion = new Vue({
  el: containerTopVersion,
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
    items: getItems(),
    near: false,
    blocked: 0,
    blockedDict: {},
  }),
  template: `
    <div :class="{'menu-backdrop': true, 'active': show}">
      <div class="menu" ref="menu">
        <div class="menu-header">
          <div>
            RJ Access Menu
          </div>
        </div>
        <dropdown
          v-for="(topItem, index) in items"
          :key="index"
          @hide="onHideChild"
          @show="onShowChild"
          class="menu-item">
          {{topItem.label}}
          <template #content>
            <menu-items :items="topItem.children"/>
          </template>
        </dropdown>
        <div class="menu-gap"></div>
        <div class="menu-static">
          <div class="row row-padding">
            <div class="i-btn">
              <i class="material-icons">home_work</i>
            </div>
            <div class="i-btn">
              <i class="material-icons">notifications</i>
              <div class="badge">
                5
              </div>
            </div>
            <div class="i-btn">
              <i class="material-icons">settings_applications</i>
            </div>
          </div>
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
        <div class="menu-static">
          <search @hide="onHideChild" @show="onShowChild" class="dropdown-bottom-left"/>
        </div>
      </div>
    </div>
  `,
});