import httpClient from "./httpClient";

const PROJECT = "/project";

const getAllTasks = (projectId: string) =>
  httpClient.get(`${PROJECT}/${projectId}/task`);

const updateTask = (projectId: string, taskId: string, task: any) =>
  httpClient.put(`${PROJECT}/${projectId}/task/${taskId}`, task);

const updateTaskStatus = (projectId: string, taskId: string, status: string) =>
  httpClient.put(`${PROJECT}/${projectId}/task/${taskId}/status`, { status });

const createTask = (projectId: string, task: any) =>
  httpClient.post(`${PROJECT}/${projectId}/task`, task);

const deleteTask = (projectId: string, taskId: string) =>
  httpClient.put(`${PROJECT}/${projectId}/task/${taskId}/delete`);

export { getAllTasks, updateTask, updateTaskStatus, createTask, deleteTask };
