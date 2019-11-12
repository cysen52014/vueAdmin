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
  }
};

