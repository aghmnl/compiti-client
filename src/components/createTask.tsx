import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type {
  Task,
  CreateTaskInput,
  UpdateTaskInput,
} from "@/shared/task-types";

interface CreateTaskFormProps {
  onCreateTask: (task: CreateTaskInput) => Promise<void>;
  onUpdateTask: (task: UpdateTaskInput) => Promise<void>;
  showEditButton: boolean;
  taskToEdit?: Task;
  onCancelEdit: () => void;
}

export function CreateTaskForm({
  onCreateTask,
  onUpdateTask,
  showEditButton = false,
  taskToEdit,
  onCancelEdit,
}: CreateTaskFormProps) {
  const form = useForm<CreateTaskInput | UpdateTaskInput>({
    defaultValues: {
      title: taskToEdit?.title || "",
      description: taskToEdit?.description || "",
      status: taskToEdit?.status || "pending",
    },
  });

  useEffect(() => {
    if (taskToEdit) {
      form.reset({
        title: taskToEdit.title,
        description: taskToEdit.description || "",
        status: taskToEdit.status,
        id: taskToEdit.id,
      });
    } else {
      form.reset({
        title: "",
        description: "",
        status: "pending",
      });
    }
  }, [taskToEdit, form]);

  const onSubmit = async (values: CreateTaskInput | UpdateTaskInput) => {
    if (taskToEdit) {
      await onUpdateTask({ ...values, id: taskToEdit.id });
    } else {
      await onCreateTask(values as CreateTaskInput);
    }
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Task Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => {
            // This is a workaround to handle null values for the Textarea
            const textareaProps = {
              ...field,
              value: field.value || "",
            };
            return (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Task Description" {...textareaProps} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {showEditButton && (
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={
                    field.value as "pending" | "in_progress" | "done"
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex gap-2">
          {!showEditButton && <Button type="submit">Create Task</Button>}
          {showEditButton && (
            <div className="flex gap-2">
              <Button type="reset" onClick={onCancelEdit} variant="secondary">
                Cancel
              </Button>
              <Button type="submit">Save Task</Button>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
}
