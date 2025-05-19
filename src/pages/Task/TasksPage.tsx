import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getTasks, type GetTasksParams } from "@/api/queries/taskQueries";
import { createTask } from "@/api/mutations/taskMutations";
import {
  type Task,
  type PaginatedTasksResponse,
  type CreateTaskPayload,
  type UpdateTaskPayload,
  type TaskStatus,
} from "@/types/task";

import TaskItem from "@/components/specific/TaskItem";
import TaskForm from "@/components/specific/TaskForm";

const taskStatuses: (TaskStatus | "")[] = [
  "",
  "pending",
  "in_progress",
  "completed",
];

const orderingOptions = [
  { value: "", label: "Default (-created_at)" },
  { value: "title", label: "Title (A-Z)" },
  { value: "-title", label: "Title (Z-A)" },
  { value: "created_at", label: "Created Oldest" },
  { value: "-created_at", label: "Created Newest" },
  { value: "status", label: "Status (A-Z)" },
  { value: "-status", label: "Status (Z-A)" },
  { value: "updated_at", label: "Updated Oldest" },
  { value: "-updated_at", label: "Updated Newest" },
];

function TasksPage() {
  const queryClient = useQueryClient();

  const [statusFilter, setStatusFilter] = useState<TaskStatus | "">("");
  const [searchQuery, setSearchQuery] = useState("");
  const [ordering, setOrdering] = useState("-created_at");
  const [currentPage, setCurrentPage] = useState(1);

  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [mutationMessage, setMutationMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    data: tasksResponse,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery<PaginatedTasksResponse, Error>({
    queryKey: [
      "tasks",
      {
        status: statusFilter,
        search: searchQuery,
        ordering,
        page: currentPage,
      },
    ],
    queryFn: () =>
      getTasks({
        status: statusFilter as TaskStatus,
        search: searchQuery,
        ordering,
        page: currentPage,
      }),
  });

  const createTaskMutation = useMutation({
    mutationFn: (payload: CreateTaskPayload) => createTask(payload),
    onSuccess: (newTask: Task) => {
      console.log("Task created successfully:", newTask);
      setIsCreateFormOpen(false);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setMutationMessage({
        type: "success",
        text: "Task created successfully!",
      });
      setTimeout(() => setMutationMessage(null), 5000);
    },
    onError: (err: any) => {
      console.error("Error creating task:", err);
      const errorMessage =
        err.response?.data?.detail ||
        err.message ||
        "An unexpected error occurred while creating the task.";
      setMutationMessage({ type: "error", text: `Error: ${errorMessage}` });
      setTimeout(() => setMutationMessage(null), 5000);
    },
  });

  const handleCreateSubmit = (formData: UpdateTaskPayload) => {
    if (!formData.title || !formData.description || !formData.status) {
      console.error("Missing required fields for task creation");
      setMutationMessage({
        type: "error",
        text: "Title, description, and status are required.",
      });
      return;
    }
    const createPayload: CreateTaskPayload = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
    };
    createTaskMutation.mutate(createPayload);
  };

  const handleCloseCreateForm = () => {
    setIsCreateFormOpen(false);
    setMutationMessage(null);
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        Loading Tasks...
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
        Error loading tasks: {error.message}
      </div>
    );
  }

  const tasks = tasksResponse?.results || [];
  const totalTasks = tasksResponse?.count || 0;

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Tasks</h1>

      <button
        onClick={() => setIsCreateFormOpen(true)}
        style={{
          padding: "10px 15px",
          background: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Create New Task
      </button>

      {mutationMessage && (
        <div
          style={{
            color: mutationMessage.type === "success" ? "green" : "red",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          {mutationMessage.text}
        </div>
      )}

      {isCreateFormOpen && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            margin: "20px 0",
            borderRadius: "8px",
            background: "#f9f9f9",
          }}
        >
          <h2>Create Task</h2>
          <TaskForm
            onSubmit={handleCreateSubmit}
            onCancel={handleCloseCreateForm}
            isLoading={createTaskMutation.isPending}
            submitButtonText="Create"
          />
        </div>
      )}

      <div
        className="task-controls"
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <div>
          <label htmlFor="task-search" style={{ marginRight: "5px" }}>
            Search:
          </label>
          <input
            id="task-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            style={{ padding: "8px" }}
          />
        </div>

        <div>
          <label htmlFor="status-filter" style={{ marginRight: "5px" }}>
            Status:
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TaskStatus | "")}
            style={{ padding: "8px" }}
          >
            {taskStatuses.map((status) => (
              <option key={status} value={status}>
                {status === ""
                  ? "All"
                  : status
                      .replace("_", " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="task-ordering" style={{ marginRight: "5px" }}>
            Order by:
          </label>
          <select
            id="task-ordering"
            value={ordering}
            onChange={(e) => setOrdering(e.target.value)}
            style={{ padding: "8px" }}
          >
            {orderingOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {isFetching && (
          <span style={{ fontSize: "0.9em", color: "#555" }}>
            Updating list...
          </span>
        )}
      </div>

      {/* Task List */}
      {tasks.length === 0 && !isFetching ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          {statusFilter || searchQuery
            ? "No tasks found matching criteria."
            : "No tasks found."}
        </div>
      ) : (
        <div className="tasks-list" style={{ marginTop: "20px" }}>
          {tasks.map((task: Task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}

      <div
        className="pagination-controls"
        style={{ marginTop: "20px", textAlign: "center" }}
      >
        {totalTasks > 0 && (
          <p style={{ fontSize: "0.9em", color: "#555" }}>
            Total tasks: {totalTasks}
          </p>
        )}
      </div>
    </div>
  );
}

export default TasksPage;
