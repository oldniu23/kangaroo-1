import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Money from "@/views/Money.vue";
import Labels from "@/views/Labels.vue";
import Statistics from "@/views/Statistics.vue";
import NotFound from "@/views/NotFound.vue";
import EditLabel from "@/views/EditLabel.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    //根目录  重定向到money页面
    path: "/",
    redirect: "/money",
  },
  {
    path: "/money",
    component: Money,
  },
  {
    path: "/labels",
    component: Labels,
  },
  {
    path: "/labels/edit",
    component: EditLabel,
  },
  {
    path: "/statistics",
    component: Statistics,
  },
  {
    //页面匹配顺序由上到下 上边的不存在则会匹配 *（所有）
    path: "*",
    component: NotFound,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
