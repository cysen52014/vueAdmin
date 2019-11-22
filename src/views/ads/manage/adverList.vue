<template>
  <div class="page-content">
    <div class="page-form__search">
      <Form :btns="form.btns" :data="form.data" :linkRef="'ys-ref-table'" />
    </div>
    <div class="page-table__date">
      <ysvue-table ref="ys-ref-table" :option="table.option" :data="table.list"></ysvue-table>
    </div>
    <el-dialog :title="dialogTitle[dialogType]" :visible.sync="dialogVisible" @close="cancel">
      <el-form :model="dialogForm" :rules="dialogFormRules" ref="dialogForm" label-width="100px">
        <el-row class="c-m-b-20" :gutter="20">
          <el-col v-if="dialogType!==0">
            <el-form-item label="客户编号">
              <el-input v-model="dialogForm.advertiserId" disabled></el-input>
            </el-form-item>
            <el-form-item label="负责人" prop="contactsName" v-if="dialogType !== 0">
              <el-input
                v-model="dialogForm.contactsName"
                placeholder="请输入联系人名称"
                :disabled="dialogType===2"
              ></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-input v-model="dialogForm.createTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="修改时间">
              <el-input v-model="dialogForm.updateTime" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="广告主名称" prop="advertiserName">
              <el-input v-model="dialogForm.advertiserName" :disabled="dialogType===2"></el-input>
            </el-form-item>
            <el-form-item label="负责人" prop="contactsName" v-if="dialogType ===0">
              <el-input v-model="dialogForm.contactsName" placeholder="请输入联系人名称"></el-input>
            </el-form-item>
            <el-form-item label="广告主手机号" prop="contactsPhone">
              <el-input v-model="dialogForm.contactsPhone" :disabled="dialogType===2"></el-input>
            </el-form-item>
            <el-form-item label="行业类型" prop="industryType">
              <el-input v-model="dialogForm.industryType" :disabled="dialogType===2"></el-input>
            </el-form-item>
            <el-form-item label="所在城市" prop="cityId">
              <el-select
                v-model="dialogForm.cityId"
                filterable
                clearable
                placeholder="请选择城市"
                :disabled="dialogType===2"
              >
                <el-option
                  v-for="item in cityList"
                  :key="item.cityId"
                  :label="item.cityName"
                  :value="item.cityId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="初始密码" prop="pwd" v-if="dialogType ===0">
              <el-input v-model="dialogForm.pwd" placeholder="请输入初始密码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            :rows="3"
            v-model="dialogForm.remark"
            :disabled="dialogType===2"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" v-if="dialogType!==2">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getAdvertiser } from "@/api";
import Form from "@/components/form/index.vue";
import citys from "@/utils/sys_citys";

const checkPhone = (rule, value, callback) => {
  if (!/^(\+?86-?)?(1[3-9]\d{9})$/.test(value)) {
    return callback(new Error("请输入正确格式的手机号"));
  } else {
    callback();
  }
};

export default {
  components: {
    Form
  },
  data() {
    return {
      cityList: citys || [],
      dialogType: 0, // 弹窗类型 0 创建,1 编辑 2详情
      dialogTitle: ["创建广告主", "编辑广告主", "广告主详情"],
      dialogVisible: false,
      dialogForm: {
        advertiserId: null, // 客户编号
        contactsName: "", // 负责人
        createTime: null, // 创建时间
        updateTime: null, // 修改时间
        advertiserName: "", // 广告主名称
        contactsPhone: "", // 广告主手机号
        industryType: "", // 行业类型
        cityId: "", // 所在城市
        pwd: "", // 密码
        remark: "" // 备注
      },
      dialogFormRules: {
        contactsName: [
          { required: true, message: "请填写负责人", trigger: "blur" }
        ],
        advertiserName: [
          { required: true, message: "请填写广告主", trigger: "blur" }
        ],
        contactsPhone: [
          { required: true, message: "请填写广告主手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        industryType: [
          { required: true, message: "请填写行业类型", trigger: "blur" }
        ],
        cityId: [{ required: true, message: "请选择城市", trigger: "change" }],
        pwd: [
          { required: true, message: "请填写初始密码", trigger: "blur" },
          { min: 3, max: 16, message: "请输入3-16位的密码", trigger: "blur" }
        ]
      },
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
            action: "createAdver",
            width: 92,
            params: {},
            type: "success",
            label: "创建广告主"
          }
        ],
        data: [
          {
            type: "input",
            label: "广&nbsp;&nbsp;告&nbsp;&nbsp;主",
            field: "username",
            value: "",
            placeholder: "广告主"
          },
          {
            type: "select",
            label: "所在城市",
            field: "city",
            value: "",
            placeholder: "所在城市",
            options: [],
            async: true
          },
          {
            type: "input",
            label: "行业类型",
            field: "username",
            value: "",
            placeholder: "行业类型"
          },
          {
            type: "date",
            label: "创建时间",
            adapt: true, // 设配移动
            field: "date",
            value: [],
            placeholder: "创建时间",
            val2Object: {
              startTime: "",
              endTime: ""
            }
          }
        ]
      },
      table: {
        list: [],
        option: {
          isPagination: true,
          paginationTotal: 50,
          paginationCurrent: 1,
          paginationSize: 10,
          isIndex: true,
          isLoading: true,
          execMethod: {
            methods: getAdvertiser,
            parmas: {},
            errorCodeValue: "0",
            errorType: "error"
          },
          column: [
            {
              label: "姓名",
              prop: "name"
            }
          ]
        }
      }
    };
  },
  methods: {
    createAdver() {
      this.openDialog(0);
    },
    editAdvertiser() {},
    addAdvertiser() {},
    onSubmit() {
      this.$refs.dialogForm.validate(async valid => {
        if (valid) {
          if (this.dialogType === 0) {
            // 创建
            this.addAdvertiser();
          } else {
            // 编辑
            this.editAdvertiser();
          }

          this.dialogVisible = false;
        } else {
          return false;
        }
      });
    },
    openDialog(dialogType, data) {
      this.dialogType = dialogType;
      if (data) {
        this.dialogForm = { ...data };
      }
      this.dialogVisible = true;
    },
    cancel() {
      this.dialogVisible = false;
      if (this.dialogType !== 0) {
        this.dialogForm = {
          advertiserId: null, // 客户编号
          contactsName: "", // 负责人
          createTime: null, // 创建时间
          updateTime: null, // 修改时间
          advertiserName: "", // 广告主名称
          contactsPhone: "", // 广告主手机号
          industryType: "", // 行业类型
          cityId: "", // 所在城市
          remark: "" // 备注
        };
      }
      this.$refs.dialogForm.resetFields();
    }
  }
};
</script>