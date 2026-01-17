"user server";

import { userRequired } from "@/app/data/user/is-authenticated";
import { ProjectData } from "@/components/project/create-project";
import db from "@/lib/db";
import { ProjectSchema } from "@/lib/schema";

export const createNewProject = async (data: ProjectData) => {
  try {
    const { user } = await userRequired();

    if (!user?.id) {
      throw new Error("user id is required");
    }

    const workspace = await db.workspace.findUnique({
      where: { id: data?.workspaceId },
      include: {
        projects: {
          select: {
            id: true,
          },
        },
      },
    });

    const validateData = ProjectSchema.parse(data);

    const isValidMember = await db.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId: user?.id || "",
          workspaceId: data?.workspaceId,
        },
      },
    });

    if (!isValidMember) {
      throw new Error("Unauthorized to create project in  this workspace");
    }

    if (validateData?.memberAccess?.length === 0) {
      validateData.memberAccess = [user?.id];
    } else if (!validateData?.memberAccess?.includes(user?.id)) {
          validateData.memberAccess?.push(user?.id)
    }

    await db.project.create({
        data : {
            name : validateData?.name,
            description : validateData?.description || "",
            workspaceId : validateData?.workspaceId,
            projectAccess : {
                create  : validateData?.memberAccess?.map((userId )=>({userId : userId}))
            }
             
        }
    })
  } catch (error) {}
};
