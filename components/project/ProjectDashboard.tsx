import { Activities, Task } from '@/lib/generated/prisma/client'
import { CommentProps, ProjectProps } from '@/types'
import React from 'react'

interface ProjectDashboardProps{
     project : ProjectProps
     task : {
        completed : number,
        inProgress : number,
        overdue : number,
        total : number,
        items : Task[] 
     },
     activities : Activities[],
     totalWorkspaceMembers : number,
    comments :CommentProps[] 
}


const ProjectDashboard = ({task , activities , project , totalWorkspaceMembers , comments } : ProjectDashboardProps) => {


    
  return (
    <div>




        
    </div>
  )
}

export default ProjectDashboard