<template>
  <Layout>
    <div>标签编辑页</div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Layout from "@/components/Layout.vue";
import tagListModel from "@/models/tagListModel";

@Component({ components: { Layout } })
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
</style>