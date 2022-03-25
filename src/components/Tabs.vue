<template>
  <ul class="tabs" :class="{ [classPrefix + '-tabs']: classPrefix }">
    <!-- 选中天、周、月功能 -->
    <!-- class="tabs-item"是用来调整css的 -->
    <li
      class="tabs-item"
      v-for="item in dataSource"
      :key="item.value"
      :class="liClass(item)"
      @click="select(item)"
    >
      {{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

type DataSourceItem = { text: string; value: string };

@Component
export default class Tabs extends Vue {
  //text是支出 收入 value是 + -  required: true是必须传 dataSource是数据源
  @Prop({ required: true, type: Array })
  dataSource!: DataSourceItem[];
  //value是你选中的那一项
  @Prop(String)
  readonly value!: string;
  //classPrefix是前缀
  @Prop(String)
  classPrefix?: string;

  //为了上边class专门写的函数
  liClass(item: DataSourceItem) {
    return {
      [this.classPrefix + "-tabs-item"]: this.classPrefix,
      selected: item.value === this.value,
    };
  }

  //选中天周月 触发事件更新值
  select(item: DataSourceItem) {
    this.$emit("update:value", item.value);
  }
}
</script>


<style lang="scss" scoped>
.tabs {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  &-item {
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