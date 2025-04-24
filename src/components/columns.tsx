"use client";

import { z } from "zod";
import { taskSchema } from "../../../compiti-server/src/trpc/schemas/taskSchemas";

export type Task = z.infer<typeof taskSchema>;

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
