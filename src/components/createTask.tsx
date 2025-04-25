import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

const taskFormValidationSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable().optional(),
  status: z.enum(["pending", "in_progress", "done"]),
});

type TaskFormData = z.infer<typeof taskFormValidationSchema>;

interface CreateTaskFormProps {
  onCreateTask: (task: CreateTaskInput) => Promise<void>;
  onUpdateTask: (task: UpdateTaskInput) => Promise<void>;
  taskToEdit?: Task;
  onCancelEdit: () => void;
}

export function CreateTaskForm({
  onCreateTask,
  onUpdateTask,
  taskToEdit,
  onCancelEdit,
}: CreateTaskFormProps) {
  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskFormValidationSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "pending",
      id: undefined,
    },
  });

  useEffect(() => {
    if (taskToEdit) {
      form.reset({
        id: taskToEdit.id,
        title: taskToEdit.title,
        description: taskToEdit.description || "",
        status: taskToEdit.status,
      });
    } else {
      form.reset({
        title: "",
        description: "",
        status: "pending",
        id: undefined,
      });
    }
    form.clearErrors();
  }, [taskToEdit, form]);

  const onSubmit = async (validatedData: TaskFormData) => {
    if (taskToEdit) {
      await onUpdateTask({ ...validatedData, id: taskToEdit.id });
    } else {
      const { id, ...createData } = validatedData;
      await onCreateTask(createData as CreateTaskInput);
    }
    form.reset({
      title: "",
      description: "",
      status: "pending",
      id: undefined,
    });
  };

  const isEditing = !!taskToEdit;

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
            const textareaProps = {
              ...field,
              value: field.value ?? "",
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

        {isEditing && (
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status">
                        {field.value === "in_progress"
                          ? "in progress"
                          : field.value}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pending">pending</SelectItem>
                    <SelectItem value="in_progress">in progress</SelectItem>
                    <SelectItem value="done">done</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex gap-2">
          {!isEditing && <Button type="submit">Create Task</Button>}
          {isEditing && (
            <>
              <Button onClick={onCancelEdit} variant="secondary">
                Cancel
              </Button>
              <Button type="submit">Save Task</Button>
            </>
          )}
        </div>
      </form>
    </Form>
  );
}
