// import the api endpoints
import { ActionContext } from "vuex";
import {
  getAllProjects,
  getProjectById,
  deleteProject,
  createProject,
  updateProject,
  fetchAssignedUsers
} from "../../api/projects";
import { RootState } from "../types";

type State = {
  projects: any[];
  project: any;
  assignedUsers: any[]
};

const state = {
  projects: [],
  assignedUsers: []
};

const getters = {
  getProjects(state: State) {
    return state.projects;
  },
  getProject(state: State) {
    return state.project;
  },
  getAssignedUsers(state: State) {
    return state.assignedUsers;
  }
};

const actions = {
  async fetchProjects(
    { commit }: ActionContext<State, RootState>,
    query?: string
  ) {
    try {
      const response = await getAllProjects(query);
      commit("setProjects", response.data);
    } catch (error) {
      // handle the error here
    }
  },
  async deleteProjectAction(
    { commit }: ActionContext<State, RootState>,
    id: string
  ) {
    await deleteProject(id);
  },
  async createProjectAction(
    { commit }: ActionContext<State, RootState>,
    payload: any
  ) {
    await createProject(payload.project);
  },
  async updateProjectAction(
    { commit }: ActionContext<State, RootState>,
    payload: any
  ) {
    await updateProject(payload.project._id, payload.project);
  },
  async fetchAssignedUsersAction(
    { commit }: ActionContext<State, RootState>,
    id: string
  ) {
    const response = await fetchAssignedUsers(id);
    commit("setAssignedUsers", response.data);
  },
  async fetchProjectById(
    { commit }: ActionContext<State, RootState>,
    id: string
  ) {
    const response = await getProjectById(id);
    commit("setProject", response.data);
  },
  async clearProject({ commit }: ActionContext<State, RootState>) {
    commit("clearProject");
  }
};

const mutations = {
  setProjects(state: State, projects: any[]) {
    state.projects = projects;
  },
  setProject(state: State, project: any[]) {
    state.project = project;
  },
  clearProject(state: State) {
    state.project = undefined;
  },
  setAssignedUsers(state: State, users: any[]) {
    state.assignedUsers = users;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
