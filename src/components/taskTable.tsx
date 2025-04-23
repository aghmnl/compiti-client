"use client";

import { DataTable } from "./ui/data-table";
import { columns, Task } from "./columns";

interface TaskTableProps {
  tasks: Task[] | undefined;
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
