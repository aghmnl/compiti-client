"use client";

import { DataTable } from "./ui/data-table";
import { columns } from "./columns";
import type { Task } from "@/shared/taskDefinitions";

interface TaskTableProps {
  tasks: Task[];
  onEditClick: (task: Task) => void;
}

export function TaskTable({ tasks, onEditClick }: TaskTableProps) {
  return (
    <div>
      <DataTable columns={columns(onEditClick)} data={tasks} />
    </div>
  );
}
