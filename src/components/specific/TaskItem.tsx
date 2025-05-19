import React from 'react';
import { type Task } from '@/types/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '@/api/mutations/taskMutations';
import {
  StyledTaskItemLink,
  TaskItemContainer,
  TaskDetails,
  TaskTitle,
  TaskDescription,
  TaskMeta,
  TaskStatusSpan,
  TaskActions,
  EditButton,
  DeleteButton,
} from './TaskItem.styled';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const queryClient = useQueryClient();

  const deleteTaskMutation = useMutation<void, Error, number | string>({
    mutationFn: deleteTask,
    onSuccess: () => {
      console.log('Task deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (err) => {
      console.error('Error deleting task:', err);
    },
  });

  const createdAt = new Date(task.created_at).toLocaleString();
  const updatedAt = new Date(task.updated_at).toLocaleString();

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      window.confirm(`Are you sure you want to delete "${task.title}"?`)
    ) {
      console.log(`Deleting task ID: ${task.id}`);
      deleteTaskMutation.mutate(task.id);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Edit task ID: ${task.id}`);
    
  };

  return (
    <StyledTaskItemLink to={`/tasks/${task.id}`}>
      <TaskItemContainer
        $isLoading={deleteTaskMutation.isPending}
        title={`View details for "${task.title}"`}
      >
        <TaskDetails>
          <TaskTitle>{task.title}</TaskTitle>
          <TaskDescription>
            {task.description.length > 150
              ? `${task.description.substring(0, 150)}…`
              : task.description}
          </TaskDescription>
          <TaskMeta>
            Status: <TaskStatusSpan>{task.status}</TaskStatusSpan> | Created: {createdAt} | Updated: {updatedAt}
          </TaskMeta>
        </TaskDetails>

        <TaskActions>
          <EditButton
            onClick={handleEditClick}
            disabled={deleteTaskMutation.isPending}
          >
            Edit
          </EditButton>
          <DeleteButton
            onClick={handleDeleteClick}
            disabled={deleteTaskMutation.isPending}
          >
            {deleteTaskMutation.isPending ? 'Deleting…' : 'Delete'}
          </DeleteButton>
        </TaskActions>
      </TaskItemContainer>
    </StyledTaskItemLink>
  );
};

export default TaskItem;
