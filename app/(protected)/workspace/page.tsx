import React from "react";
import { redirect } from "next/navigation";
import { getUserWorkSpace } from "@/app/data/workspace/get-user-workspace";

const Workspace = async () => {
  const res = await getUserWorkSpace();
  const data = res?.data;

  // If user is not authenticated or data failed
  if (!data) {
    redirect("/onboarding"); // or "/login"
  }

  const workspaces = data?.workspaces ?? [];

  if (workspaces.length > 0) {
    redirect(`/workspace/${workspaces[0].workspaceId}`);
  }

  redirect("/create-workspace");
};

export default Workspace;
