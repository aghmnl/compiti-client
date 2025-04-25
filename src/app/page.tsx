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
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function HomePage() {
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);
  const [isFormVisibleMobile, setIsFormVisibleMobile] = useState(false);
  const { createTask, fetchTasks, updateTask } = useTaskService();

  const handleCreateTask = async (task: CreateTaskInput) => {
    await createTask.mutateAsync(task);
    setIsFormVisibleMobile(false);
  };

  const handleUpdateTask = async (task: UpdateTaskInput) => {
    await updateTask.mutateAsync(task);
    setTaskToEdit(undefined);
    setIsFormVisibleMobile(false);
  };

  const handleEditClick = (task: Task) => {
    setTaskToEdit(task);
    setIsFormVisibleMobile(true);
  };

  const handleCancelEdit = () => {
    setTaskToEdit(undefined);
    setIsFormVisibleMobile(false);
  };

  const handleFabClick = () => {
    setTaskToEdit(undefined);
    setIsFormVisibleMobile(true);
  };

  if (fetchTasks.isLoading) return <p>Loading tasks...</p>;
  if (fetchTasks.error)
    return <p>Error loading tasks: {fetchTasks.error.message}</p>;

  return (
    <div className="relative min-h-screen p-4 sm:p-8">
      <h1 className="mb-8 text-center text-3xl font-bold">Compiti</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div
          className={` ${isFormVisibleMobile ? "block" : "hidden"} xs:block lg:order-2 lg:col-span-1`}
        >
          <TaskForm
            onCreateTask={handleCreateTask}
            onUpdateTask={handleUpdateTask}
            taskToEdit={taskToEdit}
            onCancelEdit={handleCancelEdit}
          />
        </div>

        <div
          className={` ${isFormVisibleMobile ? "hidden" : "block"} xs:block lg:order-1 lg:col-span-2`}
        >
          <TaskTable
            tasks={fetchTasks.data || []}
            onEditClick={handleEditClick}
          />
        </div>
      </div>

      {!isFormVisibleMobile && (
        <Button
          onClick={handleFabClick}
          className="xs:hidden fixed right-6 bottom-6 h-14 w-14 rounded-full p-4 shadow-lg"
          aria-label="Create new task"
        >
          <PlusIcon className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
