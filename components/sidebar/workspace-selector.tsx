"use client";

import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { WorkspaceProps } from "@/types";

import React, { useEffect, useState } from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Drawer } from "../ui/drawer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { WorkspaceAvatar } from "../workspace/workspace-avatar";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";

const WorkspaceSelector = ({
  workspaces,
}: {
  workspaces: WorkspaceProps[];
}) => {
  const router = useRouter();
  
  const [selectedWorkspace, setselectedWorkspace] = useState<
  WorkspaceProps | undefined
  >(undefined);
const workspaceid = useWorkspaceId() ;

  // when user hit click we redirect to that workspace

  const onSelect = (id: string) => {
    setselectedWorkspace(workspaces.find((workspace) => workspace.id === id));

    router.push(`/workspace/${id}`);
  };



  // by default given workspace will show
  useEffect(() => {
    if (workspaceid && workspaces) {
      setselectedWorkspace(
        workspaces.find((workspace) => workspace?.workspaceId === workspaceid)
      );
    }
  }, [workspaceid, workspaces]);
  console.log(workspaceid, "workspaceid");
  console.log(selectedWorkspace?.id, "selected");
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <WorkspaceAvatar
                name={(selectedWorkspace?.workspace?.name as string) || "W"}
              />
              <div className="font-semibold text-muted-foreground">
                {selectedWorkspace?.workspace?.name || "Select Workspace"}
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            className="w-[var(--radix-dropdown-menu-trigger-width)]"
          >
            {workspaces?.map((w) => (
              <DropdownMenuItem
                key={w.id}
                className="w-full"
                onSelect={() => onSelect(w.workspaceId)}
              >
                <div className="flex items-center gap-3 w-full text-muted-foreground">
                  <WorkspaceAvatar name={w.workspace?.name as string} />
                  <p>{w.workspace?.name}</p>
                </div>

                {w.workspaceId === workspaceid && (
                  <Check className="ml-auto text-blue-400" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default WorkspaceSelector;
