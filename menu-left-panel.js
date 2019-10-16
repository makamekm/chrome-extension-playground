const MenuLeftPanel = Vue.component('menu-left-panel', {
  props: ['selectedElement', 'selectedIndex', 'items'],
  watch: {
    selectedElement() {
      this.checkPosition();
    },
  },
  mounted() {
    window.addEventListener("resize", this.checkPosition);
  },
  destroyed() {
    window.removeEventListener("resize", this.checkPosition);
  },
  methods: {
    setSelected(element, index) {
      this.selectedElement = element;
      this.selectedIndex = index;
      this.checkPosition();
    },
    checkPosition() {
      if (this.selectedElement && this.$refs.items[this.selectedIndex]) {
        const elem = this.$refs.items[this.selectedIndex];
        const top = this.selectedElement.getBoundingClientRect().top;
        const height = elem.getBoundingClientRect().height;
        const diffBottomY = Math.floor(top + height - window.innerHeight + 5);
        let diffY = top;
        if (diffBottomY > 0) {
          diffY -= diffBottomY;
        }
        const diffTopY = Math.floor(top + diffY - 5);
        if (diffTopY < 0) {
          diffY = -diffTopY;
        }
        elem.style.transform = `translateY(${diffY}px)`;
      }
    },
    onEnter() {
      this.$emit('show', this.$el);
    },
    onLeave() {
      this.$emit('hide', this.$el);
    },
  },
  template: `<div :class="{'panel': true, 'active': !!selectedElement}" ref="offset">
    <div
      v-for="(item, index) in items"
      :class="{'panel-content list-scroll': true, 'active': selectedIndex === index}"
      :key="index"
      @mouseenter="onEnter"
      @mouseleave="onLeave"
      ref="items">
        <div
          v-for="(child, k) in item.children"
          :key="k"
          class="list-item">
          {{child.label}}
        </div>
    </div>
  </div>`,
})