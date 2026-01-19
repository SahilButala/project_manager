"use server";

import { userRequired } from "@/app/data/user/is-authenticated";
import { ProjectData } from "@/components/project/create-project";
import db from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma/client";
import { ProjectSchema } from "@/lib/schema";


export const  createNewProjectForm = async (data: ProjectData) => {
  try {
    // 1️⃣ Auth
    const { user } = await userRequired();
    if (!user?.id) {
      return { success: false, message: "Unauthorized" };
    }

    // 2️⃣ Validate
    const validatedData = ProjectSchema.parse(data);

    // 3️⃣ Workspace exists?
    const workspace = await db.workspace.findUnique({
      where: { id: validatedData.workspaceId },
    });

    if (!workspace) {
      return { success: false, message: "Workspace not found" };
    }

    // 4️⃣ Membership check
    const membership = await db.workspaceMember.findFirst({
      where: {
        workspaceId: validatedData.workspaceId,
        userId: user.id,
      },
    });

    if (!membership) {
      return {
        success: false,
        message: "You are not a member of this workspace",
      };
    }

    // 5️⃣ Fetch workspace members
    const workspaceMembers = await db.workspaceMember.findMany({
      where: { workspaceId: validatedData.workspaceId },
    });

    // 6️⃣ Ensure creator has access
    const memberIds = new Set(validatedData.memberAccess ?? []);
    memberIds.add(user.id);

    const validMembers = workspaceMembers.filter((m) =>
      memberIds.has(m.userId)
    );

    // 7️⃣ Create project
    await db.project.create({
      data: {
        name: validatedData.name,
        description: validatedData.description || "",
        workspaceId: validatedData.workspaceId,

        projectAccess: {
          create: validMembers.map((member) => ({
            workspaceMemberId: member.id,
            hasAccess: true,
          })),
        },

        activities: {
          create: {
            type: "PROJECT_CREATED",
            description: `Project created: ${validatedData.name}`,
            userId: user.id,
          },
        },
      },
    });

    return { success: true };

  } catch (error : any) {
    console.error("Create project error:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "Project with this name already exists in the workspace",
      };
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};
