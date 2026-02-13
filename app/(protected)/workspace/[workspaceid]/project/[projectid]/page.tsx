import { getProjectDetails } from "@/app/data/project/get-project-details";
import ProjectTableContainer from "@/components/project/project-table-container";
import ProjectDashboard from "@/components/project/ProjectDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommentProps, ProjectProps } from "@/types";
import Link from "next/link";
import React from "react";

interface ProjectPageProps {
  params: Promise<{ workspaceid: string; projectid: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ProjectPage = async (props: ProjectPageProps) => {
  const { projectid, workspaceid } = await props.params;
  const searchParams = await props.searchParams;

  // api

  const { project, tasks, comments, activities, totalWorkspaceMembers } =
    await getProjectDetails(workspaceid, projectid);

  // api

  return (
    <div className="flex flex-col gap-6 pb-3 px-3">
      <Tabs defaultValue={(searchParams.view as string) || "dashboard"}>
        <TabsList className="mb-4">
          <Link href={"?view=dashboard"}>
            <TabsTrigger value="dashboard" className="px-1.5 md:px-3">
              Dashboard
            </TabsTrigger>
          </Link>
          <Link href={"?view=table"}>
            <TabsTrigger value="table" className="px-1.5 md:px-3">
              Tables
            </TabsTrigger>
          </Link>
          <Link href={"?view=kanban"}>
            <TabsTrigger value="kanban" className="px-1.5 md:px-3">
              Kanban
            </TabsTrigger>
          </Link>
        </TabsList>

        {/* Tabs Content */}
        <TabsContent value="dashboard">
          <ProjectDashboard
            project={project as unknown as ProjectProps}
            task={tasks as unknown as any}
            comments={comments as CommentProps[]}
            totalWorkspaceMembers={totalWorkspaceMembers!}
            activities={activities!}
          />
        </TabsContent>
        <TabsContent value="table">
          <ProjectTableContainer projectId={projectid as string} />
        </TabsContent>
        <TabsContent value="kanban">kanban</TabsContent>
        {/* Tabs Content */}
      </Tabs>
    </div>
  );
};

export default ProjectPage;
