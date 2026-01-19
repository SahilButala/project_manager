"use client";

import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { ProjectSchema } from "@/lib/schema";
import { WorkspaceMemberProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormDescription } from "../ui/form";
import z from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardDescription } from "../ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { createNewProjectForm } from "@/app/(protected)/actions/project";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  workspaceMembers: WorkspaceMemberProps[];
}

export type ProjectData = z.infer<typeof ProjectSchema>;

const CreateProjectForm = ({ workspaceMembers }: Props) => {
  const workspaceId = useWorkspaceId();
  const [pending, setPending] = useState(false);

  const router = useRouter()
  const form = useForm<ProjectData>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      memberAccess: [],
      workspaceId: "",
    },
  });

  useEffect(() => {
    if (workspaceId) {
      form.setValue("workspaceId", workspaceId);
    }
  }, [workspaceId, form]);

  const onSubmit = async (data: ProjectData) => {
  try {
    setPending(true);

    console.log(data , "data of project")

    const res = await createNewProjectForm(data);

    if (!res.success) {
      toast.error(res.message ?? "Failed to create project");
      return;
    }

    toast.success("Project created successfully");
    router.refresh();

  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  } finally {
    setPending(false);
  }
}
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" className="size-5 cursor-pointer">
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <CardDescription>
            Set up your project for yourself and your team
          </CardDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project name" {...field} />
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
                    <Textarea
                      {...field}
                      placeholder="Describe the project"
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormField
                control={form.control}
                name="memberAccess"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Project Access</FormLabel>
                      <FormDescription>
                        Select which work member should have access to this
                        project
                      </FormDescription>

                      <div>
                        {workspaceMembers?.map((el) => (
                          <div className="" key={el?.userId}>
                            <Checkbox
                              id={el?.userId}
                              checked={field?.value?.includes(el?.userId)}
                              onCheckedChange={(checked) => {
                                const currentValue = field?.value || [];
                                if (checked) {
                                  field?.onChange([
                                    ...currentValue,
                                    el?.userId,
                                  ]);
                                } else {
                                  field?.onChange(
                                    currentValue?.filter(
                                      (id) => id !== el?.userId,
                                    ),
                                  );
                                }
                              }}
                            />

                            <label
                              htmlFor={el?.userId}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize  cursor-pointer"
                            >
                              {el?.user?.name}(
                              {el?.accessLevel?.toLocaleLowerCase()})
                            </label>
                          </div>
                        ))}
                      </div>
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit" disabled={pending}>
                Create Project
              </Button>

              <DialogTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogTrigger>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectForm;
