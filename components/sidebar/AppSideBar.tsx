"use client";

import React from "react";
import { AppSideBarDataProps } from "./app-sidebarContainer";
import { User } from "@/lib/generated/prisma/client";
import { ProjectProps, WorkspaceMemberProps, WorkspaceProps } from "@/types";
import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "../ui/sidebar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import WorkspaceSelector from "./workspace-selector";
import Link from "next/link";
import NavMain from "./nav-main";
import NavProjects from "./NavProjects";

const AppSideBar = ({
  data,
  projects,
  workspaceMembers,
  user,
}: {
  data: AppSideBarDataProps;
  projects: ProjectProps[];
  workspaceMembers: WorkspaceMemberProps[];
  user: User;
}) => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="bg-background"></SidebarHeader>

      <div className="flex items-center  justify-between">
        <SidebarGroupLabel>
          <span className="text-xl ">Project</span>
        </SidebarGroupLabel>
        <Avatar>
          <AvatarImage src={"/next.svg"} />
        </Avatar>
      </div>

      <div className="flex justify-between mb-0 mt-2  items-center">
        <SidebarGroupLabel className="mb-2 text-sm font-semibold text-muted-foreground uppercase">
          Workspace
        </SidebarGroupLabel>

        <Button asChild size={"icon"} className="size-5">
          <Link href={"/create-workspace"}>
            <Plus />
          </Link>
        </Button>
      </div>

      <WorkspaceSelector
        workspaces={data?.workspaces as unknown as WorkspaceProps[]}
      />

      {/* below workspace content */}

      <SidebarContent className="mt-3">
        <NavMain />

        <NavProjects
          projects={projects as unknown as ProjectProps[]}
          workspaceMembers={
            workspaceMembers as unknown as WorkspaceMemberProps[]
          }
        />
      </SidebarContent>
    </Sidebar>    
  );
};

export default AppSideBar;
