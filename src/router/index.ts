import { createRouter, createWebHistory } from "@ionic/vue-router";

import { RouteRecordRaw } from "vue-router";

import Tasks from "../views/Tasks.vue";
import Projects from "../views/Projects.vue";
import Profile from "../views/Profile.vue";
import SignIn from "../views/Login.vue";
import { authLoginGuard } from "@/auth/authLoginGuard";
import { authGuard } from "@/auth/authGuard";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/project/:projectId",
    name: "Home",
    component: Tasks,
    beforeEnter: authGuard
  },
  {
    path: "/",
    name: "Projects",
    component: Projects,
    beforeEnter: authGuard
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
    beforeEnter: authLoginGuard
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: authGuard
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
