import db from "@/lib/db";
import { userRequired } from "../user/is-authenticated";

export const getProjectById = async (projectid: string) => {
   try {
      await userRequired();

  const tasks = await db.task.findMany({
    where: {
      projectId: projectid,
    },
    include: {
      assignedTo: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      project: {
        select: {
          id: true,
          name: true,
          workspaceId: true,
        },
      },
      attachments: true,
    },
  });


  return {tasks}
   } catch (error : any) {
       console.log(error)

       return {
          success : false,
          message : error?.message || "Something went wrong to get project details"
       }
   }
};
