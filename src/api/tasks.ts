import httpClient from "./httpClient";

const TASKS = "/task";
const PROJECT = "/project";

const getAllTasks = (projectId: string) =>
  httpClient.get(`${PROJECT}/${projectId}/task`);

const updateTask = (projectId: string, taskId: string, task: any) =>
  httpClient.put(`${PROJECT}/${projectId}/task/${taskId}`, task);

const updateTaskStatus = (id: string, status: string) =>
  httpClient.put(`${TASKS}/${id}/status`, { status });

const createTask = (projectId: string, task: any) =>
  httpClient.post(`${PROJECT}/${projectId}/task`, task);

const deleteTask = (projectId: string, taskId: string) =>
  httpClient.put(`${PROJECT}/${projectId}/task/${taskId}/delete`);

export { getAllTasks, updateTask, updateTaskStatus, createTask, deleteTask };
