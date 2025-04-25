"use client";

import { useState } from "react";
import { TaskTable } from "../components/taskTable";
import { TaskForm } from "../components/taskForm";
import {
  Task,
  CreateTaskInput,
  UpdateTaskInput,
} from "@/shared/taskDefinitions";
import { useTaskService } from "@/services/taskService";

export default function HomePage() {
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);
  const { createTask, fetchTasks, updateTask } = useTaskService();

  const handleCreateTask = async (task: CreateTaskInput) => {
    await createTask.mutateAsync(task);
  };

  const handleUpdateTask = async (task: UpdateTaskInput) => {
    await updateTask.mutateAsync(task);
    setTaskToEdit(undefined);
  };

  const handleEditClick = (task: Task) => {
    setTaskToEdit(task);
  };

  const handleCancelEdit = () => {
    setTaskToEdit(undefined);
  };

  if (fetchTasks.isLoading) return <p>Loading tasks...</p>;
  if (fetchTasks.error)
    return <p>Error loading tasks: {fetchTasks.error.message}</p>;

  return (
    <div className="h-screen p-8">
      <h1 className="mb-8 text-center text-3xl font-bold">Compiti</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:order-2 lg:col-span-1">
          <TaskForm
            onCreateTask={handleCreateTask}
            onUpdateTask={handleUpdateTask}
            taskToEdit={taskToEdit}
            onCancelEdit={handleCancelEdit}
          />
        </div>

        <div className="lg:order-1 lg:col-span-2">
          <TaskTable
            tasks={fetchTasks.data || []}
            onEditClick={handleEditClick}
          />
        </div>
      </div>
    </div>
  );
}
