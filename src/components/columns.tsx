"use client";

import { Task } from "../../../compiti-server/src/trpc/schemas/taskSchemas";
import { ColumnDef } from "@tanstack/react-table";
import { trpc } from "../utils/trpc";
// import { useQueryClient } from "@tanstack/react-query"; // Import react-query's queryClient
import { TrashIcon } from "@heroicons/react/24/solid";
import { CustomAlertDialog } from "./alertDialog";

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
      const utils = trpc.useUtils(); // Get the tRPC utilities

      // const queryClient = useQueryClient(); // Access the react-query client

      const deleteTask = trpc.deleteTask.useMutation({
        onSuccess: () => {
          // console.log(
          //   "All queries in cache:",
          //   queryClient.getQueryCache().getAll(),
          // );

          utils.getTasks.invalidate(); // This is the cleanest way

          // Use the exact query key structure from your console
          // queryClient.invalidateQueries({
          //   queryKey: [["getTasks"], { type: "query" }],
          // });

          // OR even better, use this broader invalidation:
          // queryClient.invalidateQueries({
          //   queryKey: [["getTasks"]],
          // });
        },
      });

      const handleDelete = async () => {
        await deleteTask.mutateAsync({ id: row.original.id });
      };

      return (
        <CustomAlertDialog
          triggerIcon={<TrashIcon className="text-red-500" />}
          title="Delete Task"
          description="Are you sure you want to delete this task? This action cannot be undone."
          confirmText="Delete"
          onConfirm={handleDelete}
        />
      );
    },
  },
];
