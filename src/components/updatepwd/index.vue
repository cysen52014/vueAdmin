<template>
  <div class="pwd-wrap">
    <el-dialog
      :title="'修改密码'"
      :visible="show"
      :append-to-body="true"
      :width="'340px'"
      @close="cancel"
    >
      <el-form
        :model="pwdForm"
        :rules="rules"
        ref="pwdForm"
        label-width="100px"
      >
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input
            v-model="pwdForm.oldPassword"
            filterable
            clearable
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="pwdForm.newPassword"
            filterable
            clearable
            type="password"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="savePwd">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { updatePassword } from "@/api/login";
export default {
  model: {
    prop: "show",
    event: "close"
  },
  props: {
    show: false
  },
  data() {
    return {
      rules: {
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ]
      },
      pwdForm: {
        oldPassword: "",
        newPassword: ""
      }
    };
  },
  methods: {
    cancel() {
      this.$emit("close");
      this.$refs.pwdForm.resetFields();
    },
    savePwd() {
      this.$refs.pwdForm.validate(async valid => {
        if (valid) {
          const { message, errorCode } = await updatePassword(this.pwdForm);
          if (errorCode === "0") {
            this.$emit("close");
            this.$message.success("密码已修改");
          } else {
            this.$message.error(message);
          }
        }
      });
    }
  }
};
</script>
