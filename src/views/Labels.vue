<template>
  <div class="nav-wrapper">
    <div class="content">
      <p>labels.vue</p>
    </div>
    <hr />
    <Nav />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style lang="scss" scoped>
.nav-wrapper {
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  //内容多了可以滚动
  overflow: auto;
  //尽量把内容给content
  flex-grow: 1;
}
</style>