"use server"

import { userRequired } from "@/app/data/user/is-authenticated"
import { UserDataType } from "@/components/OnbordingForm"
import db from "@/lib/db"
import { userSchema } from "@/lib/schema"
import { redirect } from "next/navigation"

export const createUser = async (data: UserDataType) => {
  const { user } = await userRequired()

  if (!user?.id || !user?.email) {
    throw new Error("User not found")
  }

  const validateData = userSchema.parse(data)

  const userData = await db.user.upsert({
    where: {
      id: user.id,
    },
    update: {
      name: validateData.name,
      about: validateData.about,
      country: validateData.country,
      industryType: validateData.industryType,
      role: validateData.role,
      onboardingCompleted: true,
      image: user.picture,
    },
    create: {
      id: user.id,
      email: user.email,
      name: validateData.name,
      about: validateData.about,
      country: validateData.country,
      industryType: validateData.industryType,
      role: validateData.role,
      onboardingCompleted: true,
      image: user.picture,
      subscription: {
        create: {
          plan: "FREE",
          status: "ACTIVE",
          currentPeriodEnd: new Date(),
          cancelAtPeriodEnd: false,
        },
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      workspaces: true,
    },
  })

  if (userData.workspaces.length === 0) {
    redirect("/create-workspace")
  }

  redirect("/workspace")
}
