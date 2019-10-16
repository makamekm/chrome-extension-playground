const containerLeftVersion = document.createElement("div"); 
document.body.appendChild(containerLeftVersion);
const applicationLeftVersion = new Vue({
  el: containerLeftVersion,
  mounted() {
    window.toggleRJMenu = (show) => {
      this.toggleRJMenu(show);
    };
    document.addEventListener("mousemove", this.menuHoverWatcher);
  },
  methods: {
    getIndex(index, subIndex) {
      return getIndex(index, subIndex);
    },
    onSelect(event, index, subIndex, item) {
      this.selectedIndex = getIndex(index, subIndex);
      this.selectedElement = event.currentTarget;
      this.selectedItem = item;
    },
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
  watch: {
    show(value) {
      if (!value) {
        this.selectedIndex = null;
        this.selectedElement = null;
        this.selectedItem = null;
      }
    },
  },
  computed: {
    show() {
      return this.near || this.blocked;
    },
    flatItems() {
      return getFlatItems(this.items);
    },
  },
  data: () => ({
    items: getItems(),
    near: false,
    blocked: 0,
    blockedDict: {},
    selectedElement: null,
    selectedIndex: null,
    selectedItem: null,
  }),
  template: `
    <div :class="{'menu-backdrop left': true, 'active': show}">
      <menu-left-panel
        @hide="onHideChild" @show="onShowChild"
        :items="flatItems"
        :selectedElement="selectedElement"
        :selectedIndex="selectedIndex"/>
      <div class="menu" ref="menu">
        <div class="menu-header">
          <div>
            RJ Access Menu
          </div>
        </div>
        <div class="menu-scroll">
          <div class="menu-group"
            v-for="(topItem, index) in items"
            :key="index">
            <div class="menu-head-item">
              {{topItem.label}}
            </div>
            <div :class="{'menu-item': true, 'hover': selectedItem === item}"
              v-for="(item, subIndex) in topItem.children"
              @mouseover="onSelect($event, index, subIndex, item)"
              :key="subIndex">
              {{item.label}}
            </div>
          </div>
        </div>
        <div class="menu-gap"></div>
        <div class="menu-static">
          <div class="row">
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
        <div class="menu-static" style="padding-left: 5px; padding-right: 5px;">
          <search @hide="onHideChild" @show="onShowChild" class="dropdown-right"/>
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
    </div>
  `,
});
