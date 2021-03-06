import httpClient from "./httpClient";

const PROJECT = "/project";

const getAllTasks = (projectId: string, search?: string) =>
  httpClient.get(`${PROJECT}/${projectId}/task`, { params: { search } });

const updateTask = (projectId: string, taskId: string, task: any) =>
  httpClient.put(`${PROJECT}/${projectId}/task/${taskId}`, task);

const updateTaskStatus = (
  projectId: string,
  taskId: string,
  payload: { status: string; order: number }
) => httpClient.put(`${PROJECT}/${projectId}/task/${taskId}/status`, payload);

const createTask = (projectId: string, task: any) =>
  httpClient.post(`${PROJECT}/${projectId}/task`, task);

const deleteTask = (projectId: string, taskId: string) =>
  httpClient.put(`${PROJECT}/${projectId}/task/${taskId}/delete`);

const commentTask = (
  projectId: string,
  taskId: string,
  payload: { authorId: string; text: string }
) => httpClient.put(`${PROJECT}/${projectId}/task/${taskId}/comment`, payload);

const deleteComment = (projectId: string, taskId: string, commentId: string) =>
  httpClient.put(
    `${PROJECT}/${projectId}/task/${taskId}/comment/${commentId}/delete`
  );

const updateComment = (
  projectId: string,
  taskId: string,
  commentId: string,
  comment: any
) =>
  httpClient.put(
    `${PROJECT}/${projectId}/task/${taskId}/comment/${commentId}`,
    comment
  );

export {
  getAllTasks,
  updateTask,
  updateTaskStatus,
  createTask,
  deleteTask,
  commentTask,
  deleteComment,
  updateComment
};
