export default {
  name: "Input",
  props: {
    option: {// 所有数据结构
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    change(val) {
      const conf = {};
      conf[this.option.field] = val;
      this.$espread.dispatch(this, "ysvueForm", "change", conf);
    }
  }
};
