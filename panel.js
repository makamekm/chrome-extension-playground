const containerLeftPanel = document.createElement("div"); 
document.body.appendChild(containerLeftPanel);

let setSelectedPanel;

const Panel = new Vue({
  el: containerLeftPanel,
  data: () => ({
    items: getFlatItems(),
    selectedElement: null,
    selectedIndex: null,
  }),
  watch: {
    selectedElement() {
      this.checkPosition();
    },
  },
  mounted() {
    setSelectedPanel = (element, index) => {
      this.setSelected(element, index);
    },
    window.addEventListener("resize", this.checkPosition);
  },
  destroyed() {
    window.removeEventListener("resize", this.checkPosition);
  },
  methods: {
    setSelected(element, index) {
      this.selectedElement = element;
      this.selectedIndex = index;
    },
    checkPosition() {
      if (this.selectedElement && this.$refs.items[this.selectedIndex]) {
        const elem = this.$refs.items[this.selectedIndex];
        const top = this.selectedElement.getBoundingClientRect().top;
        // const height = elem.getBoundingClientRect().bottom;
        // const diffBottomY = Math.floor(top + height - window.innerHeight + 5);
        let diffY = top;
        // if (diffBottomY > 0) {
        //   diffY -= diffBottomY;
        // }
        // const diffTopY = Math.floor(top + diffY - 5);
        // if (diffTopY < 0) {
        //   diffY = -diffTopY;
        // }
        console.log(diffY);
        
        elem.style.transform = `translateY(${diffY}px)`;
      }
    },
    onEnter(event) {
      blockPanel(event.currentTarget);
    },
    onLeave(event) {
      unblockPanel(event.currentTarget);
    },
  },
  template: `<div :class="{'panel': true, 'active': !!selectedElement}" ref="offset">
    <div
      v-for="(item, index) in items"
      :class="{'panel-content': true, 'active': selectedIndex === index}"
      :key="index"
      @mouseenter="onEnter"
      @mouseleave="onLeave"
      ref="items">
        Hello {{item}}
    </div>
  </div>`,
})