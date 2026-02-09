"use server";

import { userRequired } from "@/app/data/user/is-authenticated";
import { TaskDataValues } from "@/components/task/create-task-dilog";
import db from "@/lib/db";
import { taskSchema } from "@/lib/schema";

export const createTask = async (
  data: TaskDataValues,
  projectId: string,
  workspaceId: string,
) => {
  try {
    const { user } = await userRequired();

    const validateData = taskSchema.parse(data);

    console.log(validateData , "validateData")

    const isUserMember = await db.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId: user?.id || "",
          workspaceId: workspaceId,
        },
      },
    });

    if (!isUserMember) {
      throw new Error("Unauthorized to create task in the worksapce");
    }
 

    const tasks  = await db.task.findMany({
        where : {
             projectId
        },

    })

    const lastTask  =   tasks?.filter((tas)=>tas?.status === data?.status).sort((a,b)=>b.position = a.position)[0]


    const position = lastTask ? lastTask.position + 1000 : 1000





    const task = await db.task.create({
      data: {
        title: validateData?.title,
        dueDate: new Date(validateData?.dueDate),
        description: validateData?.description,
        projectId,
        startDate: new Date(validateData?.startDate),
        assignedId : validateData?.assignedId,
        status : validateData?.status,
        priority  : validateData?.priority,
        position
      },
      include: {
        project: true,
      },
    });


    await db.activities.create({
       data : {
          type : "TASK_CREATED",
          description : `created task ${validateData?.title}`,
          projectId : projectId || "", 
          userId : user?.id  || "",
       }
    })


    return {
         success : true
    }
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        error?.message ||
        "Something went wrong when creating task " ||
        "Internal Server Error 500",
    };
  }
};
