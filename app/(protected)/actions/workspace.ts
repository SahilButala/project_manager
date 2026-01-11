"use server"

import { userRequired } from "@/app/data/user/is-authenticated";
import { generateInviteCode } from "@/app/utils/generate_invitecode";
import { CreateWorkspaceDataType } from "@/components/workspace/create-worksapce-form";
import db from "@/lib/db";
import { workspaceSchmea } from "@/lib/schema";
import { success } from "zod";


export const createNewWorkspace  = async (data : CreateWorkspaceDataType)=>{
  try { 
    const {user}  = await userRequired()


    const validateData =  workspaceSchmea.parse(data)


    const res = await db.workspace.create({
         data : {
            name : validateData?.name,
            description : validateData?.description,
            ownerId : user?.id,
            inviteCode : generateInviteCode(),
            members : {
                create : {
                    userId : user?.id  || "",
                    accessLevel : "OWNER",  
                }
            }
         }
    })

    return {data : res}
    
  } catch (error) {
    console.log(error)
    return {
        success : false,
        message : "Something went wrong or error occur creating workspace"
    }
  }
}