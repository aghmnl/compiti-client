"use client";

import React, { useState } from "react";

interface CreateTaskFormProps {
  onCreateTask: (title: string, description: string) => Promise<void>;
}

export function CreateTaskForm({ onCreateTask }: CreateTaskFormProps) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onCreateTask(newTaskTitle, newTaskDescription);
    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <input
        type="text"
        placeholder="Task Title"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        required
        className="mb-2 rounded border p-2"
      />
      <textarea
        placeholder="Task Description"
        value={newTaskDescription}
        onChange={(e) => setNewTaskDescription(e.target.value)}
        className="mb-2 rounded border p-2"
      />
      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Create Task
      </button>
    </form>
  );
}
