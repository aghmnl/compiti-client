"use client";

import { trpc } from "../utils/trpc";
import React, { useState } from "react";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"


export default function HomePage() {
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
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Task Manager!</h1>
      <SignOutButton>
        <Button variant="destructive">Sign Out</Button>      
      </SignOutButton>

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
