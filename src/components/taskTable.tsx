"use client";

import { DataTable } from "./ui/data-table";
import { columns } from "./columns";
import type { Task } from "../../../compiti-server/src/trpc/schemas/taskSchemas";

interface TaskTableProps {
  tasks: Task[];
  onEditClick: () => void;
}

export function TaskTable({ tasks, onEditClick }: TaskTableProps) {
  return (
    <div className="container mx-auto">
      <DataTable columns={columns(onEditClick)} data={tasks} />
    </div>
  );
}
