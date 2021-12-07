// import the api endpoints
import { ActionContext } from "vuex";
import { getAllRooms, deleteRoom, createRoom, getRoomById } from "../../api/rooms";
import { RootState } from "../types";

type State = {
  rooms: any[];
  room: any;
};

const state = {
  rooms: []
};

const getters = {
  getRooms(state: State) {
    return state.rooms;
  },
  getRoom(state: State) {
    return state.room;
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
  async fetchRoomById(
    { commit }: ActionContext<State, RootState>,
    payload: { projectId: string; roomId: string }
  ) {
    const response = await getRoomById(payload.projectId, payload.roomId);
    commit("setRoom", response.data);
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
  },
  setRoom(state: State, room: any[]) {
    state.room = room;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
