import httpClient from "./httpClient";

const PROJECTS = "/project";

const getAllProjects = () => httpClient.get(PROJECTS);

// const updateTask = (id: string, task: any) =>
//   httpClient.put(`${TASKS}/${id}`, task);

// const updateTaskStatus = (id: string, status: string) =>
//   httpClient.put(`${TASKS}/${id}/status`, { status });

// const createTask = (task: any) => httpClient.post(TASKS, task);

// const deleteTask = (id: string) => httpClient.delete(`${TASKS}/${id}`);

export { getAllProjects };
