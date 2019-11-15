<template>
     <div class="ys__form--inline">
        <div class="ys__form-item-label" v-html="option.label"></div>
        <div class="ys__form-item-mid">
          <el-select @change="changeV" v-model="option.value" :placeholder="option.placeholder" :clearable="option.clearable || false" :disabled="option.disabled || false">
            <el-option :key="index" :label="item.label || item[option.optionsLable]" :value="item.value || item[option.optionsValue]" v-for="(item,index) in option.options"></el-option>
          </el-select>
        </div>
    </div>
</template>
<script>
import Index from "./index";
export default Index;
</script>
