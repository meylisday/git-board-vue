// import the api endpoints
import { ActionContext } from "vuex";
import {
  getAllTasks,
  updateTaskStatus,
  createTask,
  updateTask,
  deleteTask
} from "../../api/tasks";
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
  async updateTaskStatusAction(
    { commit }: ActionContext<State, RootState>,
    payload: any
  ) {
    await updateTaskStatus(payload.id, payload.status);
  },
  async createTaskAction(
    { commit }: ActionContext<State, RootState>,
    task: any
  ) {
    await createTask(task);
  },
  async updateTaskAction(
    { commit }: ActionContext<State, RootState>,
    payload: any
  ) {
    await updateTask(payload._id, payload);
  },
  async deleteTaskAction(
    { commit }: ActionContext<State, RootState>,
    id: string
  ) {
    await deleteTask(id);
  }
};

const mutations = {
  setTasks(state: State, tasks: any[]) {
    state.tasks = tasks;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
