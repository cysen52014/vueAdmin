<template>
  <div class="cy__form_flex">
    <div class="cy__form">
      <div class="cy__form-item" :key="index" v-for="(form,index) in data">
        <component :is="getAsyncComponent(form.type)" :option="form"></component>
      </div>
    </div>
    <div class="cy__form-btn" :style="'width:'+ getW + 'px'">
      <el-button @click="handleFormSubmit(btn)" :type="btn.type" :key="index" v-for="(btn,index) in btns">{{btn.label}}</el-button>
    </div>
  </div>
</template>
<script>
import Index from "./index";
export default Index;
</script>
<style lang="scss">
.cy__form_flex{
  display: flex;
}
.cy__form{
  flex: 1;
}
.cy__form-item {
  display: inline-block;
  margin-bottom: 10px;
  .ys__form-item-label {
    display: inline-block;
    width: 78px;
    text-align: right;
    margin-right: 5px;
  }
  .ys__form-item-mid {
    display: inline-block;
    input,
    select {
      width: 196px;
    }
    .date-range {
      width: 486px;
    }
  }
}

.isMobile {
  .cy__form_flex{
    display: block;
  }
  .cy__form-item {
    display: block;
    .ys__form-item-label {
      display: block;
      margin-bottom: 5px;
      text-align: left;
    }
    .ys__form-item-mid {
      display: block;
      width: 100%;
      input,
      select {
        width: 100%;
      }
      .el-select {
        width: 100%;
      }
      &.ys__form-date .el-input__inner {
        width: 100%;
      }
    }
  }
}
</style>