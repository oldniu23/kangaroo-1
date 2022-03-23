<template>
  <div>
    <!-- 通用组件 备注和编辑标签用到的 通过money组件传值 -->
    <label class="formItem">
      <span class="name">{{ fileName }}</span>
      <input
        type="text"
        :value="value"
        @input="onValueChanged($event.target.value)"
        :placeholder="placeholder"
      />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class FormItem extends Vue {
  //value默认是空字符串
  @Prop({ default: "" }) readonly value!: string;

  //fileName必填
  @Prop({ required: true }) fileName!: string;
  //placeholder可能不存在
  @Prop() placeholder?: string;

  onValueChanged(value: string) {
    this.$emit("update:value", value);
  }
}
</script>

<style lang="scss" scoped>
.formItem {
  // background: #f5f5f5;
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-left: 16px;
  }
}
</style>