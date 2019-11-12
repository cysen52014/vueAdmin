const input = {
  inject: {
    vxFormItem: { default: "vxFormItem" }
  },
  props: {
    disabled: {
      type: Boolean
    },
    clearable: {
      type: Boolean,
      default: true
    },
    nativeType: {
      type: String,
      default: "text"
    },
    readonly: {
      type: Boolean
    },
    value: {
      type: [String, Number]
    },
    placeholder: {
      type: String
    },
    autocomplete: {
      type: String
    },
    autofocus: {
      type: String
    },
    maxlength: {
      type: Number
    },
    name: {
      type: String,
      default() {
        return Math.random().toString(36).substr(2);
      }
    },
    checked: {
      type: Boolean
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    arrow: {
      type: Boolean,
      default: false
    },
    arrowProps: {
      type: Object
    },
    border: {
      type: Boolean,
      default: true
    },
    autoIntoView: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: "default"
    }
  },
  data() {
    return {
      isFocus: false
    };
  },
  methods: {
    handleFocusIn(e) {
      this.isFocus = true;
      const node = e.target;
      if (this.autoIntoView && node.ontouchstart !== undefined) {
        window.addEventListener("resize", () => {
          node.scrollIntoView && node.scrollIntoView();
        }, {
          once: true
        });
      }
    },
    handleFocusOut(e) {
      this.isFocus = false;
      this.eDispatch("ElFormItem", "el.form.blur", [e.target.value]);
    },
    handleChange(e) {
      this.$emit("change", e.target.value);
    },
    handleInput(e) {
      const value = e.target ? e.target.value : e;
      this.$emit("input", value);
      this.eDispatch("ElFormItem", "el.form.change", [value]);
    },
    eDispatch(...arg) { // element-ui form表单校验
      this.validateEvent && this.dispatch && this.dispatch(...arg);
    }
  }
};

export default {
  input
};
