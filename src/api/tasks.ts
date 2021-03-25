import httpClient from "./httpClient";

const TASKS = "/task";

const getAllTasks = () => httpClient.get(TASKS);

const updateTask = (id: string, task: any) =>
  httpClient.put(`${TASKS}/${id}`, task);

const updateTaskStatus = (id: string, status: string) =>
  httpClient.put(`${TASKS}/${id}/status`, { status });

const createTask = (task: any) => httpClient.post(TASKS, task);

const deleteTask = (id: string) => httpClient.delete(`${TASKS}/${id}`);

export { getAllTasks, updateTask, updateTaskStatus, createTask, deleteTask };
