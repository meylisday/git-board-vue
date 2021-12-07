import httpClient from "./httpClient";

const PROJECT = "/project";

const getAllRooms = (projectId: string, search?: string) =>
  httpClient.get(`${PROJECT}/${projectId}/room`, { params: { search } });

const createRoom = (projectId: string, room: any) =>
  httpClient.post(`${PROJECT}/${projectId}/room`, room);

const deleteRoom = (projectId: string, roomId: string) =>
  httpClient.put(`${PROJECT}/${projectId}/room/${roomId}/delete`);

const getRoomById = (projectId: string, roomId: string) =>
  httpClient.get(`${PROJECT}/${projectId}/room/${roomId}`);

export { getAllRooms, createRoom, deleteRoom, getRoomById };
