import React from "react";
import { redirect } from "next/navigation";
import { getUserWorkSpace } from "@/app/data/workspace/get-user-workspace";

const Workspace = async () => {
  const res = await getUserWorkSpace();
  const data = res?.data;

  if (!data) {
    return;
  }

  // const { user } = await userRequired();

  // ----------------- redirect logic ----------------- //

  const workspaceid = data?.workspaces[0]?.workspaceId 

  if (data?.workspaces?.length > 0) {
    redirect(`/workspace/${workspaceid}`);
  }else{
      redirect(`/create-workspace`)
  }

  return <div></div>;
};

export default Workspace;
