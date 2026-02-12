import { Activities, Task } from "@/lib/generated/prisma/client";
import { CommentProps, ProjectProps } from "@/types";
import React from "react";
import ProjectHeader from "./project-header";
import { Card } from "../ui/card";
import TaskDistrubutionChart from "./task-distrubution-chart";
import ActivityFeed from "./activity-feed";
import CommentFeed from "./comment-feed";
import CircleProgress from "./circle-progress";

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Circle Progress : - - -- -- -- - */}
        <CircleProgress
          title={"Task Completed" as string}
          value={(task?.completed / task?.total) * 100}
          subTitle={`${task?.completed} / ${task?.total} tasks`}
          variant={"success"}
        />
        <CircleProgress
          title={"Task  InProgress" as string}
          value={(task?.inProgress / task?.total) * 100}
          subTitle={`${task?.inProgress} tasks`}
          variant={"inProgress"}
        />
        <CircleProgress
          title={"Task Overdue  " as string}
          value={(task?.overdue / task?.total) * 100}
          subTitle={`${task?.overdue} tasks`}
          variant={"warning"}
        />
        <CircleProgress
          title={"Team Members"}
          value={project?.members?.length}
          subTitle={`${project?.members?.length} members`}
          variant={"default"}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TaskDistrubutionChart tasks={task} />

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-3">Recent Activities</h3>
          <ActivityFeed
            activities={activities?.slice(0, 5) as unknown as any}
          />
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-3">Recent Comments</h3>
          <CommentFeed comments={comments?.slice(0, 5) as any} />
        </Card>
      </div>
    </div>
  );
};

export default ProjectDashboard;
