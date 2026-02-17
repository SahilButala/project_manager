import { useProjectId } from "@/hooks/use-project-id";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { ProjectTaskProps } from "@/types";
import { DraggableProps, DraggableProvided } from "@hello-pangea/dnd";
import React from "react";
import { Card } from "../ui/card";
import Link from "next/link";
import { ProjectAvatar } from "./project_avatar";
import { Badge } from "../ui/badge";
import { ProfileAvatar } from "./profile-avatar";

interface Props {
  ref: (element?: HTMLElement | null) => void;
  task: ProjectTaskProps;
  provided: DraggableProvided;
}

const ProjectCard = ({ ref, task, provided }: Props) => {
  const workspaceid = useWorkspaceId();
  const projectid = useProjectId();

  return (
    <Card
      ref={provided.innerRef}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      className="mb-2 p-3 bg-white dark:bg-gray-900 shadow-sm"
    >
      <Link href={`/workspace/${workspaceid}/project/${projectid}/${task?.id}`}>
        <h3 className="font-medium">{task?.title}</h3>
      </Link>

      {task?.description && (
        <p className="text-sm text-muted-foreground mt-1">
          Description : {task?.description}
        </p>
      )}

      <div className="flex items-center gap-2 justify-between mt-2 flex-col">
        <div className="flex items-center gap-2">
          <ProjectAvatar name={task?.project?.name} className="!size-6" />
          <p className="text-sm text-muted-foreground">{task?.project?.name}</p>

          <Badge>{task?.priority}</Badge>
        </div>

        {/* <div className="flex items-center gap-2 mt-2">
          <ProfileAvatar
            url={task?.assignedTo?.image}
            name={task?.assignedTo?.name}
            className="!size-6"
          />
          <p className="text-sm">{task?.assignedTo?.name}</p>
        </div> */}
      </div>
    </Card>
  );
};

export default ProjectCard;
