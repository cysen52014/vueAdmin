/* eslint-disable getter-return */
import "./index.scss";
export default {
  name: "Select",
  props: {
    option: {// 所有数据结构
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    changeV(val) {
      const conf = {};
      conf[this.option.field] = val;
      this.$espread.dispatch(this, "ysvueForm", "change", conf);
    }
  }
};

