
const components = {
  Input: () => import(`./input/index.vue`),
  Select: () => import(`./select/index.vue`),
  Date: () => import(`./date/index.vue`)
};
export default {
  name: "ysvueForm",
  props: {
    btns: {// 所有数据结构
      type: Array,
      default: () => {
        return [{
          type: "primary",
          label: "查询"
        }];
      }
    },
    data: {// 数据
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      formData: {}
    };
  },
  components: components,
  methods: {
    getAsyncComponent(type) {
      const T = type.substr(0, 1).toUpperCase();
      const E = type.substr(1);
      return T + E;
    },
    handleFormSubmit(btn) {
      this.formData = this.data.map(r => {
        let conf = {};
        if (r.type === "date") {
          conf = {
            field: r.field,
            value: r.value
          };
        } else {
          conf = {
            field: r.field,
            value: r.value
          };
        }
        return conf;
      });
      this.$parent[btn.action](this.formData);
    }
  }
};
