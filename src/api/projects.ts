import httpClient from "./httpClient";

const PROJECTS = "/project";

const getProjectById = (id: string) => httpClient.get(`${PROJECTS}/${id}`);

const getAllProjects = (search?: string) =>
  httpClient.get(PROJECTS, { params: { search } });

const createProject = (project: any) => httpClient.post(PROJECTS, project);

const updateProject = (id: string, project: any) =>
  httpClient.put(`${PROJECTS}/${id}`, project);

const deleteProject = (id: string) => httpClient.delete(`${PROJECTS}/${id}`);

const fetchAssignedUsers = (id: string) => httpClient.get(`${PROJECTS}/${id}/assigned`);

export {
  getProjectById,
  getAllProjects,
  deleteProject,
  createProject,
  updateProject,
  fetchAssignedUsers
};
