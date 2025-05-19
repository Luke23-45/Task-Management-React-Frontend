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

import {
  PageContainer,
  PageTitle,
  CreateTaskButton,
  MutationMessage,
  CreateFormContainer,
  TaskControls,
  ControlGroup,
  ControlLabel,
  ControlInput,
  ControlSelect,
  FetchingIndicator,
  TaskListContainer,
  NoTasksMessage,
  PaginationControls,
  PaginationButton,
  CurrentPageSpan,
  TotalTasksText,
} from "./TasksPage.styled";

const taskStatuses: (TaskStatus | "")[] = [
  "",
  "pending",
  "in_progress",
  "completed",
];

const orderingOptions = [
  { value: "", label: "Default (Newest)" },
  { value: "title", label: "Title (A–Z)" },
  { value: "-title", label: "Title (Z–A)" },
  { value: "created_at", label: "Created (Oldest)" },
  { value: "-created_at", label: "Created (Newest)" },
  { value: "status", label: "Status (A–Z)" },
  { value: "-status", label: "Status (Z–A)" },
  { value: "updated_at", label: "Updated (Oldest)" },
  { value: "-updated_at", label: "Updated (Newest)" },
];

const TasksPage: React.FC = () => {
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
        status: statusFilter,
        search: searchQuery,
        ordering,
        page: currentPage,
      } as GetTasksParams),
  });

  const createTaskMutation = useMutation<Task, any, CreateTaskPayload>({
    mutationFn: createTask,
    onSuccess: (newTask) => {
      setIsCreateFormOpen(false);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setMutationMessage({
        type: "success",
        text: "Task created successfully!",
      });
      setCurrentPage(1);
      setTimeout(() => setMutationMessage(null), 5000);
    },
    onError: (err: any) => {
      const msg =
        err.response?.data?.detail ||
        err.message ||
        "Unexpected error creating task.";
      setMutationMessage({ type: "error", text: `Error: ${msg}` });
      setTimeout(() => setMutationMessage(null), 5000);
    },
  });

  const handleCreateSubmit = (formData: UpdateTaskPayload) => {
    const { title, description, status } = formData;
    if (!title || !description || !status) {
      setMutationMessage({
        type: "error",
        text: "Title, description, and status are required.",
      });
      return;
    }
    createTaskMutation.mutate({ title, description, status });
  };

  const handleCloseCreateForm = () => {
    setIsCreateFormOpen(false);
    setMutationMessage(null);
  };

  const handlePreviousPage = () => {
    if (tasksResponse?.previous) setCurrentPage((p) => p - 1);
  };

  const handleNextPage = () => {
    if (tasksResponse?.next) setCurrentPage((p) => p + 1);
  };

  if (isLoading)
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>Loading tasks…</div>
    );
  if (isError)
    return (
      <div style={{ textAlign: "center", color: "red", marginTop: 50 }}>
        Error loading tasks: {error.message}
      </div>
    );

  const tasks = tasksResponse?.results ?? [];
  const totalTasks = tasksResponse?.count ?? 0;
  const canGoPrevious = !!tasksResponse?.previous;
  const canGoNext = !!tasksResponse?.next;

  return (
    <PageContainer>
      <PageTitle>My Tasks</PageTitle>

      <CreateTaskButton
        onClick={() => setIsCreateFormOpen(true)}
        disabled={createTaskMutation.isPending}
      >
        Create New Task
      </CreateTaskButton>

      {mutationMessage && (
        <MutationMessage $type={mutationMessage.type}>
          {mutationMessage.text}
        </MutationMessage>
      )}

      {isCreateFormOpen && (
        <CreateFormContainer>
          <h2>Create Task</h2>
          <TaskForm
            onSubmit={handleCreateSubmit}
            onCancel={handleCloseCreateForm}
            isLoading={createTaskMutation.isPending}
            submitButtonText="Create"
          />
        </CreateFormContainer>
      )}

      <TaskControls>
        <ControlGroup>
          <ControlLabel htmlFor="task-search">Search:</ControlLabel>
          <ControlInput
            id="task-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks…"
          />
        </ControlGroup>

        <ControlGroup>
          <ControlLabel htmlFor="status-filter">Status:</ControlLabel>
          <ControlSelect
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TaskStatus | "")}
          >
            {taskStatuses.map((s) => (
              <option key={s} value={s}>
                {s === ""
                  ? "All"
                  : s
                      .replace("_", " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
              </option>
            ))}
          </ControlSelect>
        </ControlGroup>

        <ControlGroup>
          <ControlLabel htmlFor="task-ordering">Order by:</ControlLabel>
          <ControlSelect
            id="task-ordering"
            value={ordering}
            onChange={(e) => setOrdering(e.target.value)}
          >
            {orderingOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </ControlSelect>
        </ControlGroup>

        {isFetching && <FetchingIndicator>Updating list…</FetchingIndicator>}
      </TaskControls>

      {tasks.length === 0 && !isFetching ? (
        <NoTasksMessage>
          {statusFilter || searchQuery
            ? "No tasks found matching criteria."
            : "No tasks found."}
        </NoTasksMessage>
      ) : (
        <TaskListContainer>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </TaskListContainer>
      )}

      {totalTasks > 0 && (
        <>
          <PaginationControls>
            <PaginationButton
              onClick={handlePreviousPage}
              disabled={!canGoPrevious || isFetching}
            >
              Previous
            </PaginationButton>
            <CurrentPageSpan>Page {currentPage}</CurrentPageSpan>
            <PaginationButton
              onClick={handleNextPage}
              disabled={!canGoNext || isFetching}
            >
              Next
            </PaginationButton>
          </PaginationControls>
          <TotalTasksText>Total tasks: {totalTasks}</TotalTasksText>
        </>
      )}
    </PageContainer>
  );
};

export default TasksPage;
