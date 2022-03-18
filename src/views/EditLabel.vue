<template>
  <Layout>
    <div>
      <Icon name="left" />
      <span>编辑标签</span>
    </div>
    <Notes fileName="标签名" placeholder="请输入标签名" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Layout from "@/components/Layout.vue";
import tagListModel from "@/models/tagListModel";
import Icon from "@/components/Icon.vue";
import Notes from "@/components/Money/Notes.vue";

@Component({ components: { Layout, Icon, Notes } })
export default class EditLabel extends Vue {
  created() {
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags = tagListModel.data;
    //filter返回的是数组
    const tag = tags.filter((t) => t.id === id)[0];
    if (tag) {
      console.log(tag);
    } else {
      //标签不存在就重定向到404页面
      this.$router.replace("/404");
    }
  }
}
</script>

<style scoped>
/* .icon {
  height: 1.2em;
  width: 1.2em;
} */
</style>