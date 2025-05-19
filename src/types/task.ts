export interface Task {
  id: number;
  user: number;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  created_at: string;
  updated_at: string;
}

export interface PaginatedTasksResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Task[];
}

export interface CreateTaskPayload {
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  status?: "pending" | "in_progress" | "completed";
}

export type TaskStatus = "pending" | "in_progress" | "completed";
