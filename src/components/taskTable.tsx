"use client";

import { DataTable } from "./ui/data-table";
import { columns } from "./columns";
import type { Task } from "../../../compiti-server/src/trpc/schemas/taskSchemas";

interface TaskTableProps {
  tasks: Task[];
}

export function TaskTable({ tasks }: TaskTableProps) {
  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={tasks} />
    </div>
  );
}
