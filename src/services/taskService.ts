// src/services/taskService.ts
import { trpc } from "@/utils/trpc";

export function useTaskService() {
  const utils = trpc.useUtils();

  const deleteTask = trpc.deleteTask.useMutation({
    onSuccess: () => utils.getTasks.invalidate(),
  });

  const createTask = trpc.createTask.useMutation({
    onSuccess: () => {
      utils.getTasks.invalidate();
    },
  });

  const updateTask = trpc.updateTask.useMutation({
    onSuccess: () => {
      utils.getTasks.invalidate();
    },
  });

  const fetchTasks = trpc.getTasks.useQuery();

  return { deleteTask, createTask, updateTask, fetchTasks };
}
