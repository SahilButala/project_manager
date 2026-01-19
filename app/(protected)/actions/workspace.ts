"use server"

import { userRequired } from "@/app/data/user/is-authenticated"
import { generateInviteCode } from "@/app/utils/generate_invitecode"
import { CreateWorkspaceDataType } from "@/components/workspace/create-worksapce-form"
import db from "@/lib/db"
import { workspaceSchmea } from "@/lib/schema"

export const createNewWorkspace = async (
  data: CreateWorkspaceDataType
) => {
  try {
    const { user } = await userRequired()

    if (!user?.id) {
      throw new Error("User not authenticated")
    }

    const validateData = workspaceSchmea.parse(data)

    const workspace = await db.workspace.create({
      data: {
        name: validateData.name,
        description: validateData.description,
        ownerId: user.id,
        inviteCode: generateInviteCode(),
        members: {
          create: {
            userId: user.id,
            accessLevel: "OWNER",
          },
        },
      },
    })

    return {
      success: true,
      data: workspace,
    }
  } catch (error) {
    console.error("Create workspace error:", error)

    return {
      success: false,
      message: "Failed to create workspace",
    }
  }
}
