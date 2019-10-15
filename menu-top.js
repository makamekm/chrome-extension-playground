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
    </div>
  `,
});