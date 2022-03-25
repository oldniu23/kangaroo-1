<template>
  <Layout>
    <!-- type 是收入支出  interval是间隔时间 -->
    <Tabs classPrefix="type" :dataSource="recordTypeList" :value.sync="type" />
    <Tabs
      classPrefix="interval"
      :dataSource="intervalList"
      :value.sync="interval"
    />
    <div>
      type:{{ type }}
      <br />
      interval:{{ interval }}
    </div>
  </Layout>
</template>

<script lang="ts">
import Layout from "@/components/Layout.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import intervalList from "@/constants/intervalList";
import recordTypeList from "@/constants/recordTypeList";

@Component({ components: { Layout, Tabs } })
export default class Statistics extends Vue {
  //两个切换栏的初始值
  type = "-";
  interval = "day";

  intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item {
  background: white;
  &.selected {
    background: #c4c4c4;
    //清除下划线
    &::after {
      display: none;
    }
  }
}
::v-deep .interval-tabs-item {
  height: 48px;
}
</style>