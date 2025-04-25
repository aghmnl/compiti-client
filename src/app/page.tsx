"use client";

import { useState } from "react";
import { TaskTable } from "../components/taskTable";
import { CreateTaskForm } from "../components/createTask";
import { Toggle } from "@/components/ui/toggle";
import { Task, CreateTaskInput } from "@/shared/task-types";
import { useTaskService } from "@/services/taskService";

export default function HomePage() {
  const [editingMode, setEditingMode] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);
  const { createTask, fetchTasks } = useTaskService();

  // Corrected handleCreateTask function
  const handleCreateTask = async (task: CreateTaskInput) => {
    await createTask.mutateAsync(task);
  };

  const handleToggleChange = () => {
    setEditingMode((prev) => !prev);
  };

  const handleEditClick = (task: Task) => {
    setEditingMode(true);
    setTaskToEdit(task);
  };

  if (fetchTasks.isLoading) return <p>Loading tasks...</p>;

  return (
    <div className="h-screen p-8">
      <h1 className="mb-8 text-center text-3xl font-bold">Compiti</h1>
      <div className="mb-4 flex items-center justify-center">
        <Toggle
          pressed={editingMode}
          onPressedChange={handleToggleChange}
          className="data-[state=on]:bg-green-500"
        >
          {editingMode ? "Editing Mode" : "Normal Mode"}
        </Toggle>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:order-2 md:col-span-1">
          <CreateTaskForm
            onCreateTask={handleCreateTask}
            showEditButton={editingMode}
            taskToEdit={editingMode ? taskToEdit : undefined}
            onCancelEdit={() => setEditingMode(false)}
          />
        </div>

        <div className="md:order-1 md:col-span-2">
          <TaskTable
            tasks={fetchTasks.data || []}
            onEditClick={handleEditClick}
          />
        </div>
      </div>
    </div>
  );
}
