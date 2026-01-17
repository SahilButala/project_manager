"use client";

import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import React from "react";
import {
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { CheckSquare, LayoutDashboard, Settings, Users } from "lucide-react";
import Link from "next/link";

const NavMain = () => {
  const workspaceid = useWorkspaceId();

  const { setOpenMobile } = useSidebar();

  //   this are the redirect methods of navbar based on workpace it will open
  const items = [
    {
      label: "Home",
      href: `workspace/${workspaceid}`,
      icon: LayoutDashboard,
      path: "home",
    },
    {
      label: "My Tasks",
      href: `workspace/${workspaceid}/my-tasks`,
      icon: CheckSquare,
      path: "my-tasks",
    },
    {
      label: "Members",
      href: `workspace/${workspaceid}/members`,
      icon: Users,
      path: "members",
    },
    {
      label: "Settings",
      href: `workspace/${workspaceid}/settings`,
      icon: Settings,
      path: "settings",
    },
  ];
  return (
    <div>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>

      <SidebarMenu className="space-y-3">
        {items?.map((item) => (
          <SidebarMenuItem key={item?.label}>
            <SidebarMenuButton
              asChild
              tooltip={item?.label}
              className="px-2 py-1.5"
            >
              <Link href={`${item?.path}`} onClick={() => setOpenMobile(false)}>
                <item.icon className="mr-2 h4 w-4" />
                {item?.label}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  );
};

export default NavMain;
