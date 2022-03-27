import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Nav from "@/components/Nav.vue";

Vue.config.productionTip = false;

Vue.component("Nav", Nav);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

// 此代码可能会在应用刚打开时帮助浏览器自动往下滑到底部
window.onload = function () {
  setTimeout(function () {
    window.scrollTo(0, 300);
  }, 0);
};
