"use client";

import { Task } from "../../../compiti-server/src/trpc/schemas/taskSchemas";

import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "title",
    header: "Task",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
