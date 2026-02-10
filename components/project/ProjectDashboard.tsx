import { Activities, Task } from "@/lib/generated/prisma/client";
import { CommentProps, ProjectProps } from "@/types";
import React from "react";
import ProjectHeader from "./project-header";
import { Card } from "../ui/card";
import TaskDistrubutionChart from "./task-distrubution-chart";
import ActivityFeed from "./activity-feed";

interface ProjectDashboardProps {
  project: ProjectProps;
  task: {
    completed: number;
    inProgress: number;
    overdue: number;
    total: number;
    items: Task[];
  };
  activities: Activities[];
  totalWorkspaceMembers: number;
  comments: CommentProps[];
}

const ProjectDashboard = ({
  task,
  activities,
  project,
  totalWorkspaceMembers,
  comments,
}: ProjectDashboardProps) => {
  return (
    <div className="flex flex-col gap-6 px-2 md:px-4 2xl:px-6 py-0">
      <ProjectHeader project={project} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Circle Progress : - - -- -- -- - */}
        <Card></Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TaskDistrubutionChart tasks={task} />

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-3">Recent Activities</h3>
          <ActivityFeed activities={activities?.slice(0,5) as unknown as any}/>
        </Card>

       
        {/* <Card>
          <h3 className="text-lg font-semibold mb-3">Recent Comments</h3>
          <CommentFeed/>
        </Card> */}
      </div>
    </div>
  );
};

export default ProjectDashboard;
