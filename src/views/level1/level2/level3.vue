<template>
  <div class="page-content">
    <div class="page-form__search">
      <!-- <div class="ys-form-item">
        <div class="ys-form-item-label">账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</div>
        <div class="ys-form-item-mid">
          <el-input v-model="form.user" placeholder="账号"></el-input>
        </div>
      </div>
      <div class="ys-form-item">
        <div class="ys-form-item-label">活动区域</div>
        <div class="ys-form-item-mid">
          <el-select v-model="form.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </div>
      </div>
      <div class="ys-form-item">
        <div class="ys-form-item-label">日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</div>
        <div class="ys-form-item-mid">
          <el-date-picker
            class="date-range"
            v-model="form.dateRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :editable="false"
            :default-time="['00:00:00','23:59:59']"
          ></el-date-picker>
        </div>
      </div>-->
      <Form :btns="form.btns" :data="form.data" />
    </div>
    <div class="page-table__date">
      <ysvue-table ref="TABLE" :option="table.option" :data="table.data"></ysvue-table>
    </div>
  </div>
</template>
<script>
import Form from "@/components/form/index.vue";
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
            action: "seacch",
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
            options: [
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
            ]
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
        option: {},
        data: []
      }
    };
  },
  methods: {
    seacch(val) {
      console.log(val);
    },
    export(val) {
      console.log(val);
    }
  }
};
</script>
