"use client";

import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import type { Task } from "@/shared/task-types";

const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["pending", "in_progress", "done"]).optional(),
});

interface CreateTaskFormProps {
  onCreateTask: (title: string, description: string) => Promise<void>;
  showEditButton: boolean;
  taskToEdit?: Task;
  onCancelEdit: () => void;
}

export function CreateTaskForm({
  onCreateTask,
  showEditButton = false,
  taskToEdit,
  onCancelEdit,
}: CreateTaskFormProps) {
  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: taskToEdit?.title || "",
      description: taskToEdit?.description || "",
      status: taskToEdit?.status || "pending",
    },
  });

  useEffect(() => {
    form.reset({
      title: taskToEdit?.title || "",
      description: taskToEdit?.description || "",
      status: taskToEdit?.status || "pending",
    });
  }, [taskToEdit, form]);

  const onSubmit = async (values: z.infer<typeof createTaskSchema>) => {
    await onCreateTask(values.title, values.description || "");
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Task Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
                  defaultValue={field.value}
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
              <Button type="submit"> Save Task </Button>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
}
