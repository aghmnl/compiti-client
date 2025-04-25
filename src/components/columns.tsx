"use client";

import { Task } from "@/shared/taskDefinitions";
import { ColumnDef } from "@tanstack/react-table";
import {
  TrashIcon,
  PencilIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import { CustomAlertDialog } from "./alertDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTaskService } from "@/services/taskService";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const wrapCellStyle = "whitespace-normal break-words";

export const columns = (
  onEditClick: (task: Task) => void,
): ColumnDef<Task>[] => [
  {
    accessorKey: "id",
    header: () => <div className="hidden md:table-cell">Id</div>,
    cell: ({ row }) => (
      <div className="hidden md:table-cell">{row.getValue("id")}</div>
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
    header: () => <div className="hidden sm:table-cell">Description</div>,
    cell: ({ row }) => (
      <div className={`${wrapCellStyle} hidden sm:table-cell`}>
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="xs:table-cell hidden">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as Task["status"];
      const displayStatus = status === "in_progress" ? "in progress" : status;
      return <div className="xs:table-cell hidden">{displayStatus}</div>;
    },
  },
  {
    id: "actions",
    header: () => <div className="hidden md:table-cell">Actions</div>,
    cell: ({ row }) => {
      const { deleteTask } = useTaskService();
      const task = row.original;

      const handleEdit = () => {
        onEditClick(task);
      };

      const handleDeleteConfirm = async () => {
        await deleteTask.mutateAsync({ id: task.id });
      };

      return (
        <div>
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <EllipsisHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={handleEdit}>
                  <PencilIcon className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <CustomAlertDialog
                  title="Delete Task"
                  description="Are you sure you want to delete this task? This action cannot be undone."
                  confirmText="Delete"
                  onConfirm={handleDeleteConfirm}
                >
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-red-600 focus:bg-red-100 focus:text-red-700"
                  >
                    <TrashIcon className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </CustomAlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="hidden items-center space-x-2 md:flex">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleEdit}
                  className="h-8 w-8 text-gray-500 hover:text-gray-300"
                >
                  <span className="sr-only">Edit</span>
                  <PencilIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                <p>Edit task</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <CustomAlertDialog
                title="Delete Task"
                description="Are you sure you want to delete this task? This action cannot be undone."
                confirmText="Delete"
                onConfirm={handleDeleteConfirm}
              >
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/50"
                  >
                    <span className="sr-only">Delete</span>
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
              </CustomAlertDialog>
              <TooltipContent side="top" align="center">
                <p>Delete task</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      );
    },
  },
];
