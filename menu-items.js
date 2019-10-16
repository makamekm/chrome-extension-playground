const MenuItems = Vue.component('menu-items', {
  props: ['items'],
  mounted() {
    this.updateResize();
    window.addEventListener("resize", this.updateResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.updateResize);
  },
  methods: {
    updateResize() {
      if (this.$refs.blocks.length > 0) {
        const left = this.$refs.blocks[0].getBoundingClientRect().left;
        let right = this.$refs.blocks[0].getBoundingClientRect().right;
        for (const block of this.$refs.blocks) {
          if (block.getBoundingClientRect().right > right) {
            right = block.getBoundingClientRect().right;
          }
        }
        this.$refs.container.style.width = `${Math.ceil(right - left + 4)}px`;  
      }
    }
  },
  template: `
    <div class="item-list-wrapper">
      <div class="item-list" ref="container">
        <div
          ref="blocks"
          v-for="(item, index) in items"
          :key="index"
          class="item-list-block">
          <div class="item-list-block-header">
            {{item.label}}
          </div>
          <div
          v-for="(row, k) in item.children"
          :key="k"
          class="list-item">
            {{row.label}}
          </div>
        </div>
      </div>
    </div>
  `,
})