import api from "../index";
import {
  type Task,
  type CreateTaskPayload,
  type UpdateTaskPayload,
} from "@/types/task";

export const createTask = async (payload: CreateTaskPayload): Promise<Task> => {
  console.log("Creating task with payload:", payload);
  try {
    const response = await api.post<Task>("/tasks/", payload);

    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);

    throw error;
  }
};

interface UpdateTaskParams {
  taskId: string | number;
  payload: UpdateTaskPayload;
}

export const updateTask = async ({
  taskId,
  payload,
}: UpdateTaskParams): Promise<Task> => {
  console.log(`Updating task ${taskId} with payload:`, payload);

  if (!taskId) {
    throw new Error("Task ID is required for update");
  }
  if (!payload || Object.keys(payload).length === 0) {
    throw new Error("Payload is required for update");
  }
  try {
    const response = await api.put<Task>(`/tasks/${taskId}/`, payload);

    return response.data;
  } catch (error) {
    console.error(`Error updating task ${taskId}:`, error);

    throw error;
  }
};

export const deleteTask = async (taskId: string | number): Promise<void> => {
  console.log(`Deleting task with ID:`, taskId);

  if (!taskId) {
    throw new Error("Task ID is required for deletion");
  }
  try {
    await api.delete<void>(`/tasks/${taskId}/`);

    return;
  } catch (error) {
    console.error(`Error deleting task ${taskId}:`, error);

    throw error;
  }
};
