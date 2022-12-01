import Vue from "vue";
import VueRouter from "vue-router";
import homePage from "../components/homePage";
import TopNavbar from "../layouts/TopNavbar";
import calculate from "@/components/calculate";
import resultsOfPracticing from "@/components/resultsOfPracticing";
import resultPage from "@/components/resultPage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/practice/:eng",
    name: "calculate",
    component: calculate,
    props: true,
  },
  {
    path: "/home",
    name: "home",
    component: homePage,
    props: true,
  },
  {
    path: "/result",
    name: "result",
    component: resultPage,
    props: true,
  },
  {
    path: "/practice-results",
    name: "practice-results",
    component: resultsOfPracticing,
    props: true,
  },
  {
    path: "/",
    component: TopNavbar,
    redirect: "/home",
  },
];

const router = new VueRouter({
  base: "lefo",
  mode: "hash",
  routes,
});

export default router;
