import { userRequired } from '@/app/data/user/is-authenticated';
import { getUserWorkSpace } from '@/app/data/workspace/get-user-workspace';
import OnbordingForm from '@/components/OnbordingForm';
import { redirect } from 'next/navigation';
import React from 'react'

const OnboardingPage = async () => {
    const res = await getUserWorkSpace();
    const data = res?.data;
  
    const { user } = await userRequired();
  
    // ----------------- redirect logic ----------------- //

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