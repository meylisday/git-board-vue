// import the api endpoints
import { ActionContext } from "vuex";
import { getAllRooms, deleteRoom, createRoom } from "../../api/rooms";
import { RootState } from "../types";

type State = {
  rooms: any[];
};

const state = {
  rooms: []
};

const getters = {
  getRooms(state: State) {
    return state.rooms;
  }
};

const actions = {
  async fetchRooms(
    { commit }: ActionContext<State, RootState>,
    payload: { projectId: string; search?: string }
  ) {
    try {
      const response = await getAllRooms(payload.projectId, payload.search);
      commit("setRooms", response.data.rooms);
    } catch (error) {
      // handle the error here
    }
  },
  async createRoomAction(
    { commit }: ActionContext<State, RootState>,
    payload: any
  ) {
    await createRoom(payload.projectId, payload.room);
  },
  async deleteRoomAction(
    { commit }: ActionContext<State, RootState>,
    payload: any
  ) {
    await deleteRoom(payload.projectId, payload.roomId);
  }
};

const mutations = {
  setRooms(state: State, rooms: any[]) {
    state.rooms = rooms;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
