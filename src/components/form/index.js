/* eslint-disable getter-return */
import moment from "moment";
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
  computed: {
    getW() {
      let w = 0;
      this.btns.forEach(btn => {
        w += (btn.width || 56) + 10;
      });
      return w;
    }
  },
  data() {
    return {
      formData: {}
    };
  },
  created() {
    if (typeof (window["__storevueappdate__state_queue"]) === "undefined") {
      window["__storevueappdate__state_queue"] = {};
    }
    if (typeof (window["__storevueappdate__state_formData"]) === "undefined") {
      window["__storevueappdate__state_formData"] = {};
    }
    window["__storevueappdate__state_queue"]["obj"] = this.data.filter(q => q.type === "select" && (q.async === true || q.computed));
    window["__storevueappdate__state_queue"]["count"] = 0;
    // this.setFormDate();
    if (window["__storevueappdate__state_queue"]["obj"].length < 1) {
      this.execActions();
      this.setFormDate();
    }
  },
  components: components,
  methods: {
    execActions() {
      if (this.callActions.length > 0) {
        this.callActions.forEach(func => {
          this.$parent[func](this.formData);
        });
      }
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
      this.setFormDate();
      window["__storevueappdate__state_formData"] = this.formData;
      this.execActions();
      if (this.$parent.$refs[this.linkRef]) {
        this.$parent.$refs[this.linkRef]._props.option.paginationCurrent = 1;
        this.$parent.$refs[this.linkRef].getTableData();
      }
    },
    setFormDate() {
      this.data.forEach(r => {
        if (r.arr2String) {
          if (r.value) {
            this.formData[r.field] = r.value.join(",");
          }
        } else if (r.val2Object) {
          const k = Object.keys(r.val2Object);
          r.value.forEach((rr, index) => {
            this.formData[k[index]] = moment(rr).format(r.valueFormat || "YYYY-MM-DD HH:mm:ss");
          });
          delete this.formData[r.field];
        } else {
          this.formData[r.field] = r.value;
        }
      });
    },
    handleFormSubmit(btn) {
      this.setFormDate();
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
