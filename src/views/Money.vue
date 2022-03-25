<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
    <Tabs :data-source="recordTypeList" :value.sync="record.type" />
    <div class="notes">
      <FormItem
        file-name="备注"
        placeholder="请在这里输入备注"
        @update:value="onUpdateNotes"
      />
    </div>
    <Tags />
  </Layout>
</template>

<script lang="ts">
import Layout from "@/components/Layout.vue";
import FormItem from "@/components/Money/FormItem.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Tags from "@/components/Money/Tags.vue";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  components: { Layout, FormItem, NumberPad, Tags, Tabs },
})
export default class Money extends Vue {
  //初始化record   record用来收集标签值、备注值、类型值、计算值
  record: RecordItem = { tags: [], notes: "", type: "-", amount: 0 };
  //recordTypeList 是一个不可被修改的常量  位于constants文件夹
  recordTypeList = recordTypeList;

  get recordList() {
    return this.$store.state.recordList;
  }

  created() {
    //初始化获取数据
    this.$store.commit("fetchRecords");
  }

  onUpdateNotes(value: string) {
    //把备注值给record的notes
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    //解析数字板的output  赋给record的amount
    this.record.amount = parseFloat(value);
  }
  saveRecord() {
    //点ok触发此事件
    //把上边的record收集的值传给store.createRecord 创建一条记录
    this.$store.commit("createRecord", this.record);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px 0;
}
</style>

