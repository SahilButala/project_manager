"use client";

import { ProjectProps, WorkspaceMemberProps } from "@/types";
import React from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { usePathname } from "next/navigation";
import CreateProjectForm from "../project/create-project";
import Link from "next/link";

const NavProjects = ({
  projects,
  workspaceMembers,
}: {
  projects: ProjectProps[];
  workspaceMembers: WorkspaceMemberProps[];
}) => {
  const { isMobile, setOpenMobile } = useSidebar();

  // to get path form url like example workspace/my-task
  // path : my-task
  const path = usePathname();

  console.log("projects" , projects)

  return (
    <div>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel className="flex justify-between items-center">
          <span className="text-sm font-semibold text-muted-foreground uppercase">
            Projects
          </span>

          <CreateProjectForm workspaceMembers={workspaceMembers} />
        </SidebarGroupLabel>
        <SidebarMenu className="mt-2">
          {projects?.map((el) => {
            const workspaceid = el?.workspaceId;
            const href = `/workspace/${workspaceid}/project/${el?.id}`;
            // const href = `/workspace/${workspaceid}/sample`;
            return (
              <SidebarMenuItem key={el?.id}>
                <SidebarMenuButton asChild >
                  <Link
                    href={href}
                    className={
                  path.startsWith(href)
                        ? "text-gray-700 font-semibold cursor-pointer bg-gray-200 "
                        : "text-muted-foreground hover:text-primary-foreground cursor-pointer"
                    }
                  >  {el?.name}</Link>
                
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </div>
  );
};

export default NavProjects;
