/* eslint-disable getter-return */

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
    },
    linkRef: {// 数据
      type: String,
      default: ""
    },
    callActions: {// 外部方法
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      formData: {}
    };
  },
  created() {
    window["__storevueappdate__state_queue"]["obj"] = this.data.filter(q => q.type === "select" && q.async === true);
    window["__storevueappdate__state_queue"]["count"] = 0;
    this.data.forEach(r => {
      this.formData[r.field] = r.value;
    });
    if (window["__storevueappdate__state_queue"]["obj"].length < 1) {
      this.execActions();
    }
  },
  components: components,
  methods: {
    execActions() {
      this.callActions.forEach(func => {
        this.$parent[func](this.formData);
      });
    },
    getAsyncComponent(type) {
      const T = type.substr(0, 1).toUpperCase();
      const E = type.substr(1);
      return T + E;
    },
    change(val) {
      this.formData = Object.assign(this.formData, val);
    },
    triggleTableData() {
      this.data.forEach(r => {
        this.formData[r.field] = r.value;
      });
      window["__storevueappdate__state_formData"] = this.formData;
      this.execActions();
      if (this.$parent.$refs[this.linkRef]) {
        this.$parent.$refs[this.linkRef]._props.option.paginationCurrent = 1;
        this.$parent.$refs[this.linkRef].getTableData();
      }
    },
    handleFormSubmit(btn) {
      this.data.forEach(r => {
        this.formData[r.field] = r.value;
      });
      window["__storevueappdate__state_formData"] = this.formData;
      this.execActions();
      if (btn.action) {
        if (btn.params) {
          this.$parent[btn.action](btn.params);
        } else {
          this.$parent[btn.action](this.formData);
        }
      } else {
        console.log(this.$parent.$refs[this.linkRef]);
        if (this.$parent.$refs[this.linkRef]) {
          this.$parent.$refs[this.linkRef]._props.option.paginationCurrent = 1;
          this.$parent.$refs[this.linkRef].getTableData();
        }
      }
    }
  }
};
