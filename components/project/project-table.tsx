import { File, Project, Task, User } from '@/lib/generated/prisma/client'
import React from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'






export interface TaksProps extends Task{
    assignedTo : User,
    project : Project,
    attachments  : File[]
}

const ProjectTable = ({tasks} : {tasks : TaksProps[]}) => (
     <DataTable 
      columns={columns}
      data={tasks as any}
     />
)

export default ProjectTable