<template>
    <div class="ys__form--inline">
        <div class="ys__form-item-label" v-html="option.label"></div>
        <div class="ys__form-item-mid">
          <el-input v-model="option.value" :placeholder="option.placeholder" :clearable="option.clearable || false" :disabled="option.disabled || false"></el-input>
        </div>
    </div>
</template>
<script>
import Index from "./index";
export default Index;
</script>
