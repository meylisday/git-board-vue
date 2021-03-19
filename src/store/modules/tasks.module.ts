// import the api endpoints
import { ActionContext } from "vuex";
import { getAllTasks, updateTaskStatus } from "../../api/tasks";
import { RootState } from "../types";
import { groupBy } from "lodash-es";

type State = {
  tasks: any[];
};

const state = {
  tasks: []
};

const getters = {
  getTasks(state: State) {
    return state.tasks;
  }
  // getGroupTasks(state: State) {
  //   return groupBy(state.tasks, "status");
  // }
};

const actions = {
  async fetchTasks({ commit }: ActionContext<State, RootState>) {
    try {
      const response = await getAllTasks();

      const tasks = ["backlog", "todo", "review", "done"].map(key => ({
        key,
        items: groupBy(response.data, "status")[key] || []
      }));
      commit("setTasks", tasks);
    } catch (error) {
      // handle the error here
    }
  },
  async updateTask({ commit }: ActionContext<State, RootState>, payload: any) {
    await updateTaskStatus(payload.id, payload.status);
    // commit("updateTask", response.data.status);
  }
};

const mutations = {
  setTasks(state: State, tasks: any[]) {
    state.tasks = tasks;
  },
  updateTask(state: State, payload: any) {
    state.tasks = state.tasks.map(task => {
      if (task.id === payload.id) {
        return Object.assign({}, task, payload.data);
      }
      return task;
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
