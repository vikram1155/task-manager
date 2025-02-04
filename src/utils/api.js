import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../data/data";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Tasks
// Read
export const getAllTasksFromApi = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.GET_TASKS);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Create
export const createTaskApi = async (taskData) => {
  try {
    const response = await api.post(API_ENDPOINTS.CREATE_TASK, taskData);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Update
export const updateTaskApi = async (taskId, taskData) => {
  try {
    const response = await api.put(API_ENDPOINTS.UPDATE_TASK(taskId), taskData);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
// Delete
export const deleteTaskApi = async (taskId, taskData) => {
  try {
    const response = await api.delete(API_ENDPOINTS.UPDATE_TASK(taskId));
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Team Members
// Read
export const getAllTeamFromApi = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.GET_TEAM);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Create
export const createTeamMember = async (teamMember) => {
  try {
    const response = await api.post(API_ENDPOINTS.POST_TEAM, teamMember);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Update
export const updateTeamMember = async (teamMemberId, teamMember) => {
  try {
    const response = await api.put(
      API_ENDPOINTS.UPDATE_TEAM(teamMemberId),
      teamMember
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const deleteMemberApi = async (teamMemberId) => {
  try {
    const response = await api.delete(API_ENDPOINTS.UPDATE_TEAM(teamMemberId));
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
