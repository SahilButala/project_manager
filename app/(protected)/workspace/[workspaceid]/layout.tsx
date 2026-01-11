import React from 'react'

interface Props {
    children : React.ReactNode,
    params : {workspaceid : string}
}

const WorkspaceIdLayout = async ({children , params} : Props) => {

    const {workspaceid} = await params

    console.log(workspaceid , "id")
  return (
    <div>WorkspaceIdLayout</div>
  )
}

export default WorkspaceIdLayout