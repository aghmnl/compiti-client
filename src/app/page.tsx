"use client";

import { trpc } from "../utils/trpc";
import React from "react";
import { TaskTable } from "../components/taskTable";
import { CreateTaskForm } from "../components/createTask";
import type { Task } from "../../../compiti-server/src/trpc/schemas/taskSchemas";

export default function HomePage() {
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

  if (isLoading) return <p>Loading tasks...</p>;

  return (
    <div className="h-screen p-8">
      <h1 className="mb-8 text-center text-3xl font-bold">Compiti</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:order-2 md:col-span-1">
          <CreateTaskForm onCreateTask={handleCreateTask} />
        </div>

        <div className="md:order-1 md:col-span-2">
          <TaskTable tasks={tasks || []} />
        </div>
      </div>
    </div>
  );
}
