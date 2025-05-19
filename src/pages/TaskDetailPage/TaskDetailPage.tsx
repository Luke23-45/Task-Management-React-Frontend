import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getTaskById } from "@/api/queries/taskQueries";
import { updateTask } from "@/api/mutations/taskMutations";
import { deleteTask } from "@/api/mutations/taskMutations";

import { type Task, type UpdateTaskPayload } from "@/types/task";
import TaskForm from "@/components/specific/TaskForm";

function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const taskId = id;

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [mutationMessage, setMutationMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    data: task,
    isLoading,
    isError,
    error,
  } = useQuery<Task>({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById(taskId as string),
    enabled: !!taskId,
  });

  const updateTaskMutation = useMutation({
    mutationFn: (payload: UpdateTaskPayload) =>
      updateTask({ taskId: taskId as string, payload }),
    onSuccess: (updatedTask: Task) => {
      console.log("Task updated successfully:", updatedTask);
      setIsEditFormOpen(false);
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setMutationMessage({
        type: "success",
        text: "Task updated successfully!",
      });
      setTimeout(() => setMutationMessage(null), 5000);
    },
    onError: (err: any) => {
      console.error("Error updating task:", err);
      const errorMessage =
        err.response?.data?.detail ||
        err.message ||
        "An unexpected error occurred while updating the task.";
      setMutationMessage({ type: "error", text: `Error: ${errorMessage}` });
      setTimeout(() => setMutationMessage(null), 5000);
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (idToDelete: string | number) => deleteTask(idToDelete),
    onSuccess: () => {
      console.log("Task deleted successfully");

      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      navigate("/tasks", { replace: true });
    },
    onError: (err: any) => {
      console.error("Error deleting task:", err);

      const errorMessage =
        err.response?.data?.detail ||
        err.message ||
        "An unexpected error occurred while deleting the task.";
      setMutationMessage({ type: "error", text: `Error: ${errorMessage}` });

      setTimeout(() => setMutationMessage(null), 5000);
    },
  });

  const handleUpdateSubmit = (formData: UpdateTaskPayload) => {
    if (!taskId) {
      console.error("Cannot update task: Task ID is missing.");
      setMutationMessage({
        type: "error",
        text: "Cannot update task: ID missing.",
      });
      return;
    }
    if (Object.keys(formData).length === 0) {
      console.warn("Attempting to update task with empty payload.");
    }
    updateTaskMutation.mutate(formData);
  };

  const handleCloseEditForm = () => {
    setIsEditFormOpen(false);
    setMutationMessage(null);
  };

  const handleDeleteClick = () => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the task "${task?.title || "this task"}"?`
    );

    if (isConfirmed && taskId) {
      console.log(`Attempting to delete task with ID: ${taskId}`);

      deleteTaskMutation.mutate(taskId);
    }
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        Loading Task Details...
      </div>
    );
  }

  if (isError) {
    const errorMessage =
      (error as any).response?.status === 404
        ? "Task not found."
        : error.message || "An unexpected error occurred.";

    return (
      <div style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
        Error loading task details: {errorMessage}
      </div>
    );
  }

  if (!task) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        Task details could not be loaded. Invalid ID?
      </div>
    );
  }

  const createdAt = new Date(task.created_at).toLocaleString();
  const updatedAt = new Date(task.updated_at).toLocaleString();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Details</h1>

      {/* Display mutation message */}
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

      {isEditFormOpen ? (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            margin: "20px 0",
            borderRadius: "8px",
            background: "#f9f9f9",
          }}
        >
          <h2>Edit Task</h2>
          <TaskForm
            initialData={task}
            onSubmit={handleUpdateSubmit}
            onCancel={handleCloseEditForm}
            isLoading={updateTaskMutation.isPending}
            submitButtonText="Update"
          />
        </div>
      ) : (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h2 style={{ margin: "0 0 10px 0" }}>{task.title}</h2>
          <p style={{ margin: "0 0 15px 0", fontSize: "1.1em" }}>
            {task.description}
          </p>
          <div style={{ fontSize: "0.9em", color: "#555" }}>
            <p style={{ margin: "5px 0" }}>
              <strong>Status:</strong> {task.status}
            </p>
            <p style={{ margin: "5px 0" }}>
              <strong>Created At:</strong> {createdAt}
            </p>
            <p style={{ margin: "5px 0" }}>
              <strong>Updated At:</strong> {updatedAt}
            </p>
            <p style={{ margin: "5px 0" }}>
              <strong>User ID:</strong> {task.user}
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button
              onClick={() => setIsEditFormOpen(true)}
              disabled={
                updateTaskMutation.isPending || deleteTaskMutation.isPending
              }
              style={{
                padding: "10px 15px",
                backgroundColor: "#ffc107",
                color: "black",
                border: "none",
                borderRadius: "4px",
                cursor:
                  updateTaskMutation.isPending || deleteTaskMutation.isPending
                    ? "not-allowed"
                    : "pointer",
                opacity:
                  updateTaskMutation.isPending || deleteTaskMutation.isPending
                    ? 0.6
                    : 1,
              }}
            >
              Edit Task
            </button>

            {/* Delete Button */}
            <button
              onClick={handleDeleteClick}
              disabled={
                updateTaskMutation.isPending || deleteTaskMutation.isPending
              }
              style={{
                padding: "10px 15px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor:
                  updateTaskMutation.isPending || deleteTaskMutation.isPending
                    ? "not-allowed"
                    : "pointer",
                opacity:
                  updateTaskMutation.isPending || deleteTaskMutation.isPending
                    ? 0.6
                    : 1,
              }}
            >
              {deleteTaskMutation.isPending ? "Deleting..." : "Delete Task"}{" "}
              {/* Show loading text */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskDetailPage;
