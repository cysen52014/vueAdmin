<template>
  <div class="ys__form--inline">
    <div class="ys__form-item-label" v-html="option.label"></div>
    <div class="ys__form-item-mid ys__form-date">
      <el-date-picker
        v-if="!isMobile"
        v-model="option.value"
        :type="option.dateRangeType || 'datetimerange'"
        :range-separator="option.rangeSeparator || ' 至 '"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        :default-time="option.defaultTime || ['00:00:00','23:59:59']"
        :clearable="option.clearable || false"
        :disabled="option.disabled || false"
        @change="changeV"
      ></el-date-picker>
      <daterange
        v-else
        v-model="option.value"
        :defaultTime="option.defaultTime || ['00:00:00','23:59:59']"
        :separator="option.rangeSeparator || ' 至 '"
        :format="option.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
        :placeholder="option.placeholder"
         @change="changeV"
      ></daterange>
    </div>
  </div>
</template>
<script>
import Index from "./index";
export default Index;
</script>
