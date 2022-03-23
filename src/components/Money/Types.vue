<template>
  <div>
    <ul class="types">
      <!-- 给v-bind:class一个对象,以动态地切换class。v-bind:class指令可以与普通的class特性共存 -->
      <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
      <li :class="type === '+' && 'selected'" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";

@Component
export default class Types extends Vue {
  //初始type值为支出 通过点击切换type值
  type = "-";
  selectType(type: string) {
    if (type !== "+" && type !== "-") {
      throw new Error("未知类型");
    }
    this.type = type;
  }
  //监控type的值 变化了就触发下列事件 此事件会触发money组件中的事件
  @Watch("type")
  onValueChanged(value: string) {
    this.$emit("update:value", value);
  }
}
</script>

<style lang="scss" scoped>
.types {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  > li {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>