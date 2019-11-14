<template>
  <div class="page-content">
    <div class="page-form__search">
      <Form :btns="form.btns" :data="form.data" :linkRef="'ys-ref-table'" />
    </div>
    <div class="page-table__date">
      <ysvue-table
        ref="ys-ref-table"
        :option="table.option"
        :data="table.list"
        @paginationChance="paginationChance"
      ></ysvue-table>
    </div>
  </div>
</template>
<script>
import Form from "@/components/form/index.vue";
import { getList } from "@/api/test.js";
export default {
  components: {
    Form
  },
  data() {
    return {
      form: {
        user: "",
        region: "",
        dateRange: "",
        btns: [
          {
            type: "primary",
            label: "查询"
          },
          {
            action: "export",
            type: "success",
            label: "导出"
          }
        ],
        data: [
          {
            type: "input",
            label: "账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号",
            field: "username",
            value: "",
            placeholder: "请输入商品名称"
          },
          {
            type: "select",
            label: "活动区域",
            field: "atv",
            value: "",
            placeholder: "活动区域",
            options: [],
            async: true
          },
          {
            type: "date",
            label: "时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间",
            adapt: true, // 设配移动
            field: "date",
            value: [
              new Date("2019-11-02 00:00:00"),
              new Date("2019-11-06 23:59:55")
            ],
            placeholder: "时间"
          }
        ]
      },
      table: {
        list: [],
        option: {
          isPagination: true,
          paginationTotal: 18,
          paginationCurrent: 1,
          paginationSize: 10,
          isIndex: true,
          interfaceWait: true,
          isLoading: true,
          execMethod: {
            methods: getList,
            parmas: {},
            errorCodeValue: "0",
            errorType: "error"
          },
          column: [
            {
              label: "姓名",
              prop: "name"
            },
            {
              label: "地址",
              prop: "address"
            },
            {
              label: "时间",
              prop: "date"
            }
          ]
        }
      }
    };
  },
  created() {
    // this.getTableData();
    this.getOPs();
  },
  methods: {
    export(val) {
      console.log(val);
    },
    paginationChance(val) {
      console.log("val", val);
      // this.table.option.paginationCurrent = val.data.current;
    },
    getOPs() {
      setTimeout(() => {
        this.form.data[1].options = [
          {
            label: "选项一",
            value: "1"
          },
          {
            label: "选项二",
            value: "2"
          },
          {
            label: "选项三",
            value: "3"
          }
        ];
      }, 1000);
    }
  }
};
</script>
