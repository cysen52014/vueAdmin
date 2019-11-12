
import "./index.scss";
import Daterange from "../../daterange/index.vue";
export default {
  name: "Input",
  filters: {
    year(val) {
      return val.replace("YYYY", "yyyy");
    }
  },
  props: {
    option: {// 所有数据结构
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: {
    daterange: Daterange
  },
  computed: {
    isMobile() {
      const width = document.documentElement.clientWidth;
      if (width < 720 && this.option.adapt) {
        return true;
      } else {
        return false;
      }
    }
  }
};

