import { userRequired } from '@/app/data/user/is-authenticated';
import { getUserWorkSpace } from '@/app/data/workspace/get-user-workspace';
import OnbordingForm from '@/components/OnbordingForm';
import { redirect } from 'next/navigation';
import React from 'react'

const OnboardingPage = async () => {
    const res = await getUserWorkSpace();
    const data = res?.data;
  
    const { user } = await userRequired();

    console.log("length" , data?.workspaces.length)
  
    // ----------------- redirect logic ----------------- //

      if (!data) {
        redirect("/onboarding");
      }
    
      if (!data.onboardingCompleted) {
        redirect("/onboarding");
      }
    
      if (data.onboardingCompleted && data.workspaces.length === 0) {
        redirect("/create-workspace");
      }else{
         redirect("/workspace")
      }

    // ----------------- redirect logic ----------------- //
  
    const name = `${user?.given_name ?? ""} ${user?.family_name ?? ""}`;



  
  return (
    <div>
           <OnbordingForm
              name={name}
              email={user?.email as string}
              image={user?.picture || ""}
            />
    </div>
  )
}

export default OnboardingPage