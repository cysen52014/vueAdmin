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
  watch: {
    "option.options": {
      handler(newName, oldName) {
        if (newName.length > 0) {
          window["__storevueappdate__state_queue"]["count"]++;
          this.option.value = newName[0].value;
          this.changeV(this.option.value);
          if (window["__storevueappdate__state_queue"]["obj"].length === window["__storevueappdate__state_queue"]["count"]) {
            this.$espread.dispatch(this, "ysvueForm", "triggleTableData", {});
          }
        }
      },
      immediate: true,
      deep: true
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

