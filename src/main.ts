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

//判断屏幕宽度  是电脑就弹出提示和二维码
if (document.documentElement.clientWidth > 500) {
  window.alert("请使用手机打开本页面，以保证浏览效果");
  const img = document.createElement("img");
  img.src = "/qrcode.png";
  img.style.position = "fixed";
  img.style.left = "50%";
  img.style.top = "50%";
  img.style.transform = "translate(-50%,-50%)";
  img.style.boxShadow = "0 0 10px rgba(0,0,0,0.25)";
  document.body.appendChild(img);
}
