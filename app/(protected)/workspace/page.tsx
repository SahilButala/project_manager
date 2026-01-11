
import React from 'react'
import { redirect } from 'next/navigation'
import { getUserWorkSpace } from '@/app/data/workspace/get-user-workspace';



const Workspace = async () => {
  const res = await getUserWorkSpace();
  const data = res?.data;

  // const { user } = await userRequired();

  // ----------------- redirect logic ----------------- //
  if (!data) {
    redirect("/onboarding");
  }

  if (!data.onboardingCompleted) {
    redirect("/onboarding");
  }

  if (data.onboardingCompleted && data.workspaces.length === 0) {
    redirect("/create-workspace");
  }

  if (data.workspaces.length > 0) {
    redirect(`/workspace/${data.workspaces[0].workspaceId}`);
  }
  // ----------------- redirect logic ----------------- //



  return (
    <div>
 
    </div>
  );
};

export default Workspace;