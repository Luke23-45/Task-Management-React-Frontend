import React, { useState, useEffect } from "react";
import {
  type Task,
  type CreateTaskPayload,
  type UpdateTaskPayload,
  type TaskStatus,
} from "@/types/task";

const taskStatuses: TaskStatus[] = ["pending", "in_progress", "completed"];

interface TaskFormProps {
  initialData?: Partial<Task>;

  onSubmit: (payload: UpdateTaskPayload) => void;

  onCancel?: () => void;

  isLoading?: boolean;

  submitButtonText?: string;
}

function TaskForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
  submitButtonText = "Submit",
}: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [status, setStatus] = useState<TaskStatus>(
    initialData?.status || "pending"
  );

  useEffect(() => {
    setTitle(initialData?.title || "");
    setDescription(initialData?.description || "");
    setStatus(initialData?.status || "pending");
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: UpdateTaskPayload = {
      title: title,
      description: description,
      status: status,
    };

    onSubmit(payload);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as TaskStatus);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "15px" }}
    >
      <div>
        <label
          htmlFor="task-title"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Title:
        </label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={isLoading}
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
        />
      </div>

      <div>
        <label
          htmlFor="task-description"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Description:
        </label>
        <textarea
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          disabled={isLoading}
          rows={4}
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
        />
      </div>

      <div>
        <label
          htmlFor="task-status"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Status:
        </label>
        <select
          id="task-status"
          value={status}
          onChange={handleStatusChange}
          required
          disabled={isLoading}
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
        >
          {taskStatuses.map((s) => (
            <option key={s} value={s}>
              {s
                .replace("_", " ")
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            style={{
              padding: "10px 15px",
              background: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: "10px 15px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {isLoading ? `${submitButtonText}...` : submitButtonText}{" "}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
