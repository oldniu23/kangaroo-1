<template>
  <Layout>
    <!-- type 是收入支出  interval是间隔时间 -->
    <Tabs classPrefix="type" :dataSource="recordTypeList" :value.sync="type" />
    <!-- 如果列表有东西才展示ol -->
    <ol v-if="groupList.length > 0">
      <!-- result是个hashTable(对象) -->
      <li v-for="(group, index) in groupList" :key="index">
        <h3 class="title">
          {{ beautify(group.title) }}<span>￥{{ group.total }}</span>
        </h3>
        <ol>
          <li class="record" v-for="item in group.items" :key="item.id">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <!-- 接上边ol 如果列表没东西就展示这个div  -->
    <div v-else class="noResult">记一笔吧！</div>
  </Layout>
</template>

<script lang="ts">
import Layout from "@/components/Layout.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";

@Component({ components: { Layout, Tabs } })
export default class Statistics extends Vue {
  //展示选择的标签
  tagString(tags: Tag[]) {
    return tags.length === 0 ? "无" : tags.map((t) => t.name).join("&");
  }
  //显示今天昨天前天  以及如果是今年就不显示年份
  beautify(string: string) {
    //day是个api  跟今天是同一天  now是当前时间
    const day = dayjs(string);
    const now = dayjs();
    //'day'是单位 如果day和今天是同一天 就返回'今天'
    if (day.isSame(now, "day")) {
      return "今天";
      //减去一天是昨天
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYYY年M月D日");
    }
  }
  get recordList() {
    //拿到recordList   由于vuex的自身问题  还需要在这也声明一下类型
    return (this.$store.state as RootState).recordList;
  }
  //数组排序后分组
  get groupList() {
    //我们需要把result弄成 [{title,items},{title,items},...]
    const { recordList } = this;

    //排序 日期近的排前边 filter用来筛选类型(+、-)匹配的 sort会改变原来的数组 所以克隆一遍再用
    const newList = clone(recordList)
      .filter((r) => r.type === this.type)
      .sort(
        (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      );
    if (newList.length === 0) {
      return [];
    }
    // console.log(newList);
    type Result = { title: string; total?: number; items: RecordItem[] }[];
    const result: Result = [
      {
        title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
        items: [newList[0]],
      },
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt).format("YYYY-MM-DD"),
          items: [current],
        });
      }
    }
    //总额
    result.map((group) => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    });
    return result;
  }

  beforeCreate() {
    //获取一下数据
    this.$store.commit("fetchRecords");
  }

  //切换栏的初始值
  type = "-";
  recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
.noResult {
  padding: 16px;
  text-align: center;
}
::v-deep {
  .type-tabs-item {
    background: #c4c4c4;
    &.selected {
      background: white;
      //清除下划线
      &::after {
        display: none;
      }
    }
  }
  .interval-tabs-item {
    height: 48px;
  }
}
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
}
.record {
  @extend %item;
  background: white;
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
</style>