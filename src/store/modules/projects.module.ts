// import the api endpoints
import { ActionContext } from "vuex";
import {
  getAllProjects,
  deleteProject,
  createProject,
  updateProject
} from "../../api/projects";
import { RootState } from "../types";

type State = {
  projects: any[];
};

const state = {
  projects: []
};

const getters = {
  getProjects(state: State) {
    return state.projects;
  }
};

const actions = {
  async fetchProjects({ commit }: ActionContext<State, RootState>) {
    try {
      const response = await getAllProjects();
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
  }
};

const mutations = {
  setProjects(state: State, projects: any[]) {
    state.projects = projects;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
