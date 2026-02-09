import { Activities, Task } from '@/lib/generated/prisma/client'
import { CommentProps, ProjectProps } from '@/types'
import React from 'react'
import ProjectHeader from './project-header'

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
    <div className='flex flex-col gap-6 px-2 md:px-4 2xl:px-6 py-0'>
<ProjectHeader
 project={project}

/>



        
    </div>
  )
}

export default ProjectDashboard