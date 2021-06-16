import httpClient from "./httpClient";

const USERS = "/user";

const getAllUsers = () => httpClient.get(USERS);
const getUsersByProjectId = (projectId: string) => httpClient.get(`${USERS}/${projectId}`);

export { getAllUsers, getUsersByProjectId };
