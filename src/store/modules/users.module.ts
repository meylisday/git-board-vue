// import the api endpoints
import { ActionContext } from "vuex";
import { getAllUsers } from "../../api/users";
import { RootState } from "../types";

type State = {
  users: any[];
};

const state = {
  users: []
};

const getters = {
  getUsers(state: State) {
    return state.users;
  }
};

const actions = {
  async fetchUsers({ commit }: ActionContext<State, RootState>) {
    try {
      const response = await getAllUsers();
      commit("setUsers", response.data);
    } catch (error) {
      // handle the error here
    }
  }
};

const mutations = {
  setUsers(state: State, users: any[]) {
    state.users = users;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
