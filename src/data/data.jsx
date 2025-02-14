export const priorityOptions = ["P1", "P2", "P3", "P4"];

export const statusOptions = [
  "In Progress",
  "Completed",
  "Backlogs",
  "To Be Picked",
];
export const taskTypeOptions = ["FE", "BE", "Bugs", "Backlogs"];

// Backend
export const API_BASE_URL = "http://127.0.0.1:8000"; // Change when deployed

export const API_ENDPOINTS = {
  FETCH_HELLO: "/",
  CREATE_TASK: "/allTasks",
  GET_TASKS: "/allTasks",
  UPDATE_TASK: (taskId) => `/allTasks/${taskId}`,
  GET_TEAM: "/teamMembers",
  POST_TEAM: "/teamMembers",
  UPDATE_TEAM: (teamMemberId) => `/teamMembers/${teamMemberId}`,
};
