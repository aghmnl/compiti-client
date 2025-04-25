"use client";

import { Task } from "../../../compiti-server/src/trpc/schemas/taskSchemas";
import { ColumnDef } from "@tanstack/react-table";
import { trpc } from "../utils/trpc";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { CustomAlertDialog } from "./alertDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const columns = (onEditClick: () => void): ColumnDef<Task>[] => [
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const utils = trpc.useUtils();

      const deleteTask = trpc.deleteTask.useMutation({
        onSuccess: () => utils.getTasks.invalidate(),
      });

      const handleEdit = () => {
        onEditClick();
        console.log("Editing:", row.original);
      };
      const handleDelete = async () => {
        await deleteTask.mutateAsync({ id: row.original.id });
      };

      return (
        <div className="flex items-center space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleEdit}
                className="text-gray-500 hover:text-gray-700"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" align="center">
              <p>Edit task</p>
            </TooltipContent>
          </Tooltip>

          <CustomAlertDialog
            triggerIcon={<TrashIcon className="h-5 w-5 text-red-500" />}
            title="Delete Task"
            description="Are you sure you want to delete this task? This action cannot be undone."
            confirmText="Delete"
            onConfirm={handleDelete}
          />
        </div>
      );
    },
  },
];
