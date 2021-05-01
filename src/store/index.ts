import { createStore } from "vuex";

import TasksModule from "./modules/tasks.module";
import ProjectModule from "./modules/projects.module";
import UsersModule from "./modules/users.module";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    TasksModule,
    ProjectModule,
    UsersModule
  }
});
