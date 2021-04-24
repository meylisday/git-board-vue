import httpClient from "./httpClient";

const USERS = "/user";

const getAllUsers = () => httpClient.get(USERS);

export { getAllUsers };
