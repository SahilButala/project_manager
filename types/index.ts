import { $Enums, Workspace, WorkspaceMember } from "@/lib/generated/prisma/client";

export interface WorkspaceMemberProps extends WorkspaceMember{
  user : {
    id : string,
    name : string,
    email : string,
    image ?:string
  },
  projectAccess :{
    id : string,
    hasAccess : boolean,
    projectId :string
  }[]
}


export interface ProjectProps{
    id : string,
    name : string,
    description : string,
    workspaceId : string,
    members : {
        id : string,
        userId  : string,
        workspaceId : string,
        accessLevel : string,
        createdAt :Date,
        user : {
            id :string,
            name : string,
            email : string,
            image : string
        }
    }[]
} 



export interface WorkspaceProps{
    id :string,
    createdAt : Date,
    userId : string,
    workspaceId : string,
    accessLevel : $Enums.AccessLevel,
    workspace : {
      name : string
    }
}