"use client";

import { DataTable } from "./ui/data-table";
import { columns } from "./columns";

interface TaskTableProps {
  tasks:
    | {
        id: number;
        title: string;
        description: string | null;
        status: string;
        createdAt: string;
        updatedAt: string;
      }[]
    | undefined;
}

export function TaskTable({ tasks }: TaskTableProps) {
  return (
    <div className="container mx-auto">
      {tasks ? (
        <DataTable columns={columns} data={tasks} />
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
}
