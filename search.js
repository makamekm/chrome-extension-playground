const Search = Vue.component('search', {
  data: () => ({
    focused: false,
    value: '',
  }),
  computed: {
    show() {
      return (this.focused || !!this.value) ? true : null;
    }
  },
  mounted() {
    this.$parent.$on("hide", this.onHide);
  },
  destroyed() {
    this.$parent.$off("hide", this.onHide);
  },
  methods: {
    onHide() {
      this.focused = false;
      this.value = '';
      this.$emit('hide', $event)
    },
    onFocus() {
      this.focused = true;
    },
    onBlur() {
      this.focused = false;
    },
  },
  template: `<dropdown
    :force="show"
    @hide="$emit('hide', $event)"
    @show="$emit('show', $event)"
    :class="{'dropdown': true, 'active': show}">
    <div class="rj-input">
      <input type="text" placeholder="Search..." @focus="onFocus" @blur="onBlur" v-model="value">
      <div class="rj-input-i">
        <i class="material-icons">search</i>
      </div>
    </div>
    <template #content>
      <div class="list-header">
        Hello World
      </div>
      <div
        class="list-item">
        Test 1
      </div>
      <div
        class="list-item">
        Test 2
      </div>
      <div
        class="list-item">
        Test 3
      </div>
      <div class="list-header">
        Hello World
      </div>
      <div
        class="list-item">
        Test 1
      </div>
      <div
        class="list-item">
        Test 2
      </div>
      <div
        class="list-item">
        Test 3
      </div>
    </template>
  </dropdown>`,
})