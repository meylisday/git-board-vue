import { createRouter, createWebHistory } from "@ionic/vue-router";

import { RouteRecordRaw } from "vue-router";

import Tasks from "../views/Tasks.vue";
import Projects from "../views/Projects.vue";
import SignIn from "../views/Login.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/project/:projectId",
    name: "Home",
    component: Tasks
  },
  {
    path: "/",
    name: "Projects",
    component: Projects
  },
  {
    path: "/signin",
    name: "Sign In",
    component: SignIn
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
