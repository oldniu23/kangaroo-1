<template>
  <div>
    <ul class="types">
      <!-- 给v-bind:class一个对象,以动态地切换class。v-bind:class指令可以与普通的class特性共存 -->
      <!-- es6的语法  如果key里有变量 用[ ]包裹起来 -->
      <!-- 表驱动编程  如果selected后为true就selected出现 -->
      <li
        :class="{
          [classPrefix + '-item']: classPrefix,
          selected: value === '-',
        }"
        @click="selectType('-')"
      >
        支出
      </li>
      <li
        :class="{
          [classPrefix + '-item']: classPrefix,
          selected: value === '+',
        }"
        @click="selectType('+')"
      >
        收入
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Types extends Vue {
  //!意思是绝对不会是undefined  ?是可能会是undefined
  @Prop(String) readonly value!: string;
  @Prop(String) classPrefix?: string;

  selectType(type: string) {
    if (type !== "+" && type !== "-") {
      throw new Error("未知类型");
    }
    this.$emit("update:value", type);
  }
  //监控type的值 变化了就触发下列事件 此事件会触发money组件中的事件
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