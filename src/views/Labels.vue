<template>
  <Layout>
    <div class="tags">
      <router-link
        class="tag"
        v-for="tag in tags"
        :key="tag.id"
        :to="`/labels/edit/${tag.id}`"
      >
        <span>{{ tag.name }}</span>
        <Icon name="right" />
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Icon from "@/components/Icon.vue";
import Layout from "@/components/Layout.vue";
import tagListModel from "@/models/tagListModel";
import Vue from "vue";
import Button from "@/components/Button.vue";
import { Component } from "vue-property-decorator";

tagListModel.fetch(); //先获取一下

@Component({ components: { Layout, Icon, Button } })
export default class Labels extends Vue {
  tags = tagListModel.data;

  createTag() {
    const name = window.prompt("请输入标签名");
    if (name) {
      const message = tagListModel.create(name);
      if (message === "duplicated") {
        window.alert("标签名重复");
      } else if (message === "success") {
        window.alert("添加成功");
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  padding-right: 16px;

  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e7e7;
  }
  svg {
    width: 18px;
    height: 18px;
    // margin-right: 16px;
    color: #666;
  }
}
.createTag {
  // background: #767676;
  color: white;
  padding: 0 16px;
  height: 40px;
  border: none;
  border-radius: 4px;
  &-wrapper {
    padding: 16px;
    margin-top: 44-16px;
    text-align: center;
  }
}
</style>