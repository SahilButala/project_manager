"use client";

import { Project } from "@/lib/generated/prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { ArrowDown, EllipsisVertical, Paperclip } from "lucide-react";
import Link from "next/link";
import { ProjectAvatar } from "./project_avatar";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import { ProfileAvatar } from "./profile-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export type TaskTableItem = {
  id: string;
  name: string;
  status: string;
  dueDate: Date;
  assignedTo: {
    name: string;
    image?: string;
  };
  project: Project;
};

export const columns: ColumnDef<TaskTableItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
              ? "indeterminate"
              : false
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="select row"
      />
    ),

    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button variant={"ghost"} onClick={() => column?.getIsSorted() == "asc"}>
        Task Title <ArrowDown />
      </Button>
    ),
    cell: ({ row }) => {
      const title = row.getValue("title") as string;

      return (
        <Link
          href={`/workspace/${row?.original?.project?.workspaceId}/project/${row?.original?.project?.id}/${row?.original?.id}`}
        >
          <div className="flex items-center gap-2">
            <ProjectAvatar name={title} />

            <span className="text-muted-foreground font-medium xl:text-base capitalize">
              {title}
            </span>
          </div>
        </Link>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row?.getValue("status") as string;

      return (
        <Badge variant={status as any}>
          {status === "IN_PROGRESS" ? "IN PROGRESS" : status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row?.getValue("priority") as string;

      return <Badge variant={"secondary"}>{priority}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row?.getValue("createdAt") as string;

      return (
        <Badge variant={"secondary"}>
          {format(new Date(createdAt), "MMM dd,yyyy    ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const dueDate = row?.getValue("dueDate") as string;

      return (
        <Badge variant={"secondary"}>
          {format(new Date(dueDate), "MMM dd,yyyy    ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
    cell: ({ row }) => {
      const assignedTo = row?.getValue("assignedTo") as {
        name: string;
        image?: string;
      };

      return (
        <div className="flex items-center gap-2">
          <ProfileAvatar
            name={(assignedTo?.name as string) || "Undefined" || "User"}
            url={assignedTo?.image as string}
          />
          <span>{(assignedTo?.name as string) || "Undefined" || "User"}</span>
        </div>
      );
    },
  },
    {
    accessorKey: "attachments",
    header: "Attachments",
    cell: ({ row }) => {
      const attachments = row?.getValue("attachments") as string[];

      return (
        <div className="flex items-center gap-2">
          <Paperclip className="h-4 w-4" />
          {attachments?.length}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} size={"icon"}>
                <EllipsisVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link
                  href={`/workspace/${row?.original?.project?.workspaceId}/project/${row?.original?.project?.id}/${row?.original?.id}`}
                >
                  View Task
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                {/* <DeleteTask taskId={row?.original?.id}/> */}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },

];
