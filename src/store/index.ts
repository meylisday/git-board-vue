import { createStore } from "vuex";

import TasksModule from "./modules/tasks.module";
import ProjectModule from "./modules/projects.module";
import UsersModule from "./modules/users.module";
import RoomsModule from "./modules/rooms.module";

const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    TasksModule,
    ProjectModule,
    UsersModule,
    RoomsModule
  }
});

export default store;
