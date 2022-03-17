<template>
  <div>
    <router-view />
  </div>
</template>
<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333; //#333是接近黑色 比较柔和的
  line-height: 1.5;
  font-family: $font-hei;
  //默认设置16px
  font-size: 16px;
  background: #f5f5f5;
}
</style>
