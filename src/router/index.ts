import { createRouter, createWebHistory } from "@ionic/vue-router";

import { RouteRecordRaw } from "vue-router";

import Tasks from "../views/Tasks.vue";
import Projects from "../views/Projects.vue";
import Profile from "../views/Profile.vue";
import SignIn from "../views/Login.vue";
import Rooms from "../views/Rooms.vue";
import GeneralGrid from "../views/GeneralGrid.vue";
import Call from "../views/Call.vue";
import { authLoginGuard } from "@/auth/authLoginGuard";
import { authGuard } from "@/auth/authGuard";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "GeneralGrid",
    component: GeneralGrid,
    beforeEnter: authGuard,
    children: [
      {
        path: "profile",
        name: "Profile",
        component: Profile,
        beforeEnter: authGuard
      },
      {
        path: "/",
        name: "Projects",
        component: Projects,
        beforeEnter: authGuard
      },
      {
        path: "/project/:projectId",
        name: "Tasks",
        component: Tasks,
        beforeEnter: authGuard
      },
      {
        path: "/project/:projectId/rooms",
        name: "Rooms",
        component: Rooms,
        beforeEnter: authGuard
      },
      {
        path: "/rooms/:roomId/call",
        name: "Call",
        component: Call,
        beforeEnter: authGuard
      }
    ]
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
    beforeEnter: authLoginGuard
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
