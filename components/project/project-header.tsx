import { ProjectProps } from "@/types";
import React from "react";
import { ProjectAvatar } from "./project_avatar";
import CreateTaskDilog from "../task/create-task-dilog";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ProjectHeader = ({ project }: { project: ProjectProps }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div className="flex gap-2">
          <ProjectAvatar name={project?.name} />

          <div className="">
            <h1 className="text-xl 2xl:text-2xl font-semibold">
              {project?.name}
            </h1>

            {project?.description && (
              <p className="text-sm 2xl:text-lg text-muted-foreground">
                {project?.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-3 md:mt-0  gap-3">
          <CreateTaskDilog project={project} />
        </div>
      </div>

      {/* Projects */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row  md:items-center gap-4">
          <h3 className="text-sm font-medium ">Team Members</h3>
          <div className="flex flex-wrap space-x-2">
            {project?.members?.map((mem) => (
              <Avatar
                className=" size-9 2xl:size-10 border-2 border-background shadow"
                key={mem?.id}
              >
                <AvatarImage src={mem?.user?.image || "" || undefined} />

                <AvatarFallback className="text-sm 2xl:text-base">
                  {mem?.user?.name?.substring(0, 2).toLocaleUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProjectHeader;
