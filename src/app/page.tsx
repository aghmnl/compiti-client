"use client";

import { trpc } from "../utils/trpc";
import { useState } from "react";
import { TaskTable } from "../components/taskTable";
import { CreateTaskForm } from "../components/createTask";
import { Toggle } from "@/components/ui/toggle";
import { Task } from "@/shared/task-types";

export default function HomePage() {
  const [editingMode, setEditingMode] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);

  const utils = trpc.useUtils();
  const { data: tasks, isLoading } = trpc.getTasks.useQuery();
  const createTask = trpc.createTask.useMutation({
    onSuccess: () => {
      utils.getTasks.invalidate();
    },
  });

  const handleCreateTask = async (title: string, description: string) => {
    await createTask.mutateAsync({
      title,
      description,
      status: "pending",
    });
  };

  const handleToggleChange = () => {
    setEditingMode((prev) => !prev);
  };

  const handleEditClick = (task: Task) => {
    setEditingMode(true);
    setTaskToEdit(task);
  };

  if (isLoading) return <p>Loading tasks...</p>;

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
          <TaskTable tasks={tasks || []} onEditClick={handleEditClick} />
        </div>
      </div>
    </div>
  );
}
