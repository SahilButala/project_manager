import { getProjectById } from "@/app/data/project/get-project-id";
import React from "react";
import ProjectTable from "./project-table";

const ProjectTableContainer = async ({ projectId }: { projectId: string }) => {
  const { tasks } = await getProjectById(projectId);

  console.log(tasks, "tasks");
  return (
    <div className="p-4">
      <ProjectTable tasks={tasks as any} />
    </div>
  );
};

export default ProjectTableContainer;
