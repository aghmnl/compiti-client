"use client";

import { trpc } from "../utils/trpc";
import React, { useState } from "react";

export default function Home() {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  // Fetch all tasks
  const { data: tasks, isLoading } = trpc.getTasks.useQuery();

  // Create a new task
  const createTask = trpc.createTask.useMutation();

  // Handle form submission to create a task
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTask.mutateAsync({
      title: newTaskTitle,
      description: newTaskDescription,
      status: "pending", // Default status
    });
    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  if (isLoading) return <p>Loading tasks...</p>;

  return (
    <div>
      <h1>Task Management App</h1>

      {/* Form to create a new task */}
      <form onSubmit={handleCreateTask}>
        <input type="text" placeholder="Task Title" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} required />
        <textarea placeholder="Task Description" value={newTaskDescription} onChange={(e) => setNewTaskDescription(e.target.value)} />
        <button type="submit">Create Task</button>
      </form>

      {/* Display tasks */}
      <h2>Tasks</h2>
      <ul>
        {tasks?.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong> - {task.description || "No description"} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
