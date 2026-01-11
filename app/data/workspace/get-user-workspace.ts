import db from "@/lib/db";
import { userRequired } from "../user/is-authenticated";



export const getUserWorkSpace = async () => {
  try {
    const { user } = await userRequired();

    if (!user) return null;

    const workspaces = await db.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        workspaces: {
          select: {
            id: true,
            userId: true,
            workspaceId: true,
            accessLevel: true,
            createdAt: true,
            workspace: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return { data: workspaces };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: true,
      message: "Failed to fetch workspaces",
      status: 500,
    };
  }
};