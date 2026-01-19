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
        <SidebarMenu>
          {projects?.map((el) => {
            const workspaceid = el?.workspaceId;
            const href = `workspace/${workspaceid}/projects/${el?.id}`;
            return (
              <SidebarMenuItem key={el?.id}>
                <SidebarMenuButton>
                  <a
                    href=""
                    className={
                      path === href
                        ? "text-primary-foreground font-semibold"
                        : "text-muted-foreground hover:text-primary-foreground"
                    }
                  ></a>
                  {el?.name}
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
