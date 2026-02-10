"use client";

import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { taskSchema } from "@/lib/schema";
import { ProjectProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TaskPriority, TaskStatus } from "@/lib/generated/prisma/enums";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { taskStatus } from "@/app/utils";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { createTask } from "@/app/(protected)/actions/task";

interface Props {
  project: ProjectProps;
}

export type TaskDataValues = z.infer<typeof taskSchema>;

const CreateTaskDilog = ({ project }: { project: ProjectProps }) => {
  const router = useRouter();
  const [open, setopen] = useState(false);
  const workspaceid = useWorkspaceId();
  const [pending, setpending] = useState(false);


  const form = useForm<TaskDataValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      status: "TODO",
      dueDate: new Date(),
      startDate: new Date(),
      priority: "MEDIUM",
      attachments: [],
      description: "",
      assignedId: "",
    },
  });

  const handleSubmit = async (data: TaskDataValues) => {
    try {
      setpending(true);

      const res = await createTask(data, project?.id, workspaceid as string);

      console.log(res , "response")

      if(res?.success){

        toast.success("New Task Created Successfully..");
        router?.refresh();
        form.reset();
      }

    } catch (error : any) {
      console.log(error?.message);
      toast.error("Failed to create task please try again...");
    } finally {
      setpending(false);
    }
  };

  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button>Create Task</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Task title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Task Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="description"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Task description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Task Description"
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="assignedId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignee</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Assignee" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {project?.members?.map((mem) => (
                          <SelectItem key={mem?.id} value={mem?.userId || "123"}>
                            {mem?.user?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              ></FormField>


              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field?.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Assignee" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {Object.values(TaskPriority).map((priority) => (
                          <SelectItem key={priority} value={priority}>
                            {priority}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              ></FormField>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>

                    <Popover modal={true}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal ",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field?.value ? (
                              format(field?.value, "PPP")
                            ) : (
                              <span>Pick a Date</span>
                            )}

                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field?.value}
                          onSelect={field?.onChange}
                          disabled={(date) =>
                            date < field?.value ||
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>

                    <Popover modal={true}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal ",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field?.value ? (
                              format(field?.value, "PPP")
                            ) : (
                              <span>Pick a Date</span>
                            )}

                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field?.value}
                          onSelect={field?.onChange}
                          disabled={(date) =>
                            date < field?.value ||
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>

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
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {taskStatus.map((mem) => (
                        <SelectItem
                          key={mem?.label}
                          value={mem?.label}
                          className={""}
                        >
                          {mem?.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            ></FormField>

            <div className="flex justify-end space-x-2">
              <Button type="submit" disabled={pending}>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDilog;
