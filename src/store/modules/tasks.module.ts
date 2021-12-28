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
import { groupBy, sortBy } from "lodash-es";

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

const utils = {
  groupTasksByStatus: (tasks: any) =>
    ["backlog", "todo", "review", "done"].map(key => ({
      key,
      items: sortBy(groupBy(tasks, "status")[key] || [], "order")
    }))
};

const actions = {
  async fetchTasks(
    { commit }: ActionContext<State, RootState>,
    payload: { projectId: string; search?: string }
  ) {
    try {
      const response = await getAllTasks(payload.projectId, payload.search);
      const tasks = utils.groupTasksByStatus(response.data.tasks);

      commit("setTasks", tasks);
    } catch (error) {
      // handle the error here
    }
  },
  async updateTaskStatusAction(
    { commit }: ActionContext<State, RootState>,
    { projectId, taskId, ...payload }: any
  ) {
    const response = await updateTaskStatus(projectId, taskId, payload);
    const tasks = utils.groupTasksByStatus(response.data.tasks);

    commit("setTasks", tasks);
  },
  async createTaskAction(
    { commit }: ActionContext<State, RootState>,
    payload: any
  ) {
    await createTask(payload.projectId, payload.task);
  },
  async updateTaskAction(
    { commit }: ActionContext<State, RootState>,
    payload: any
  ) {
    await updateTask(payload.projectId, payload.taskId, payload.task);
  },
  async deleteTaskAction(
    { commit }: ActionContext<State, RootState>,
    payload: any
  ) {
    await deleteTask(payload.projectId, payload.taskId);
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
