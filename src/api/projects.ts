import httpClient from "./httpClient";

const PROJECTS = "/project";

const getAllProjects = () => httpClient.get(PROJECTS);

const createProject = (project: any) => httpClient.post(PROJECTS, project);

const updateProject = (id: string, project: any) =>
  httpClient.put(`${PROJECTS}/${id}`, project);

const deleteProject = (id: string) => httpClient.delete(`${PROJECTS}/${id}`);

export { getAllProjects, deleteProject, createProject, updateProject };
