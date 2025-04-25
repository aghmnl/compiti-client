"use client";

import { Task } from "@/shared/taskDefinitions";
import { ColumnDef } from "@tanstack/react-table";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { CustomAlertDialog } from "./alertDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTaskService } from "@/services/taskService";

const wrapCellStyle = "whitespace-normal break-words";

export const columns = (
  onEditClick: (task: Task) => void,
): ColumnDef<Task>[] => [
  {
    accessorKey: "id",
    header: () => <div className="hidden md:table-cell">Id</div>,
    cell: ({ row }) => (
      <div className="hidden sm:table-cell">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "title",
    header: "Task",
    cell: ({ row }) => (
      <div className={wrapCellStyle}>{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className={wrapCellStyle}>{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Task["status"];
      const displayStatus = status === "in_progress" ? "in progress" : status;
      return <div>{displayStatus}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { deleteTask } = useTaskService();

      const handleEdit = () => {
        onEditClick(row.original);
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
