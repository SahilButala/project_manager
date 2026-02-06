import { getUserWorkSpace } from "@/app/data/workspace/get-user-workspace";
import AppSidebarContainer from "@/components/sidebar/app-sidebarContainer";
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  children: React.ReactNode;
  params: Promise<{ workspaceid: string }>; // Must be a Promise
}

const WorkspaceIdLayout = async ({ children, params }: Props) => {
  const data = await getUserWorkSpace();
  let { workspaceid } = await params;

  const workspaceData = data?.data;

  if (workspaceData?.onboardingCompleted && !workspaceData?.workspaces) {
    redirect("/create-workspace");
  } else if (!workspaceData?.onboardingCompleted) {
    redirect("/onboarding");
  }

  return (
    <SidebarProvider>
      <div className="w-full flex   bg-background h-screen">
        <AppSidebarContainer data={workspaceData} workspaceid={workspaceid} />

        <main className="w-full overflow-y-auto min-h-screen flex-1">
          <div className="flex items-start">
            <SidebarTrigger className="pt-3" />
            {/* 
          <Navbar
          id={workspaceData?.id}
          name={workspaceData?.name as string}
          email={workspaceData?.email as string}
          image={workspaceData?.image as string}
          /> */}
          </div>

          <div className="p-0 md:p-4 pt-2">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default WorkspaceIdLayout;
