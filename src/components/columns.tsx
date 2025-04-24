"use client";

import { Task } from "../../../compiti-server/src/trpc/schemas/taskSchemas";
import { ColumnDef } from "@tanstack/react-table";
import { trpc } from "../utils/trpc";
import { Button } from "@/components/ui/button"; // Assuming you have a button component
import { TrashIcon } from "@heroicons/react/24/solid";
import { useQueryClient } from "@tanstack/react-query"; // Import react-query's queryClient

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
  {
    id: "actions", // Add a column for actions
    header: "Actions",
    cell: ({ row }) => {
      const queryClient = useQueryClient(); // Access the react-query client

      const deleteTask = trpc.deleteTask.useMutation({
        onSuccess: () => {
          // Invalidate the getTasks query to refresh the table
          const query = queryClient
            .getQueryCache()
            .find({ queryKey: ["getTasks"] });
          console.log("Found 'getTasks' query in cache:", !!query);
          queryClient.invalidateQueries({ queryKey: ["getTasks"] });
        },
      });

      const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this task?")) {
          await deleteTask.mutateAsync({ id: row.original.id });
        }
      };

      return (
        <Button variant="ghost" className="text-red-500" onClick={handleDelete}>
          <TrashIcon className="h-5 w-5" />
        </Button>
      );
    },
  },
];
