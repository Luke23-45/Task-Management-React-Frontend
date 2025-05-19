import api from "../index";
import {
  type Task,
  type PaginatedTasksResponse,
  type TaskStatus,
} from "@/types/task";

export interface GetTasksParams {
  status?: TaskStatus;
  search?: string;
  ordering?: string;
  page?: number;
}

export const getTasks = async (
  params?: GetTasksParams
): Promise<PaginatedTasksResponse> => {
  console.log("Fetching tasks with params:", params);
  try {
    const response = await api.get<PaginatedTasksResponse>("/tasks/", {
      params: params,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);

    throw error;
  }
};

export const getTaskById = async (taskId: string | number): Promise<Task> => {
  console.log("Fetching task with ID:", taskId);

  if (!taskId) {
    throw new Error("Task ID is required to fetch details");
  }
  try {
    const response = await api.get<Task>(`/tasks/${taskId}/`);

    return response.data;
  } catch (error) {
    console.error(`Error fetching task with ID ${taskId}:`, error);

    throw error;
  }
};
