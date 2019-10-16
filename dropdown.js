const Dropdown = Vue.component('dropdown', {
  props: ['force'],
  data: () => ({
    show: false,
  }),
  // watch: {
  //   force(value) {
  //     if (value === true) {

  //     }
  //   },
  // },
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
      this.timer = setTimeout(this.onHide, 200);
    },
    stopTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = null;
    },
  },
  template: `<div :class="{'dropdown': true, 'active': show || force}" @mouseover="checkPosition">
    <slot></slot>
    <div class="dropdown-offset" ref="offset">
      <div class="dropdown-content" ref="content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>`,
})