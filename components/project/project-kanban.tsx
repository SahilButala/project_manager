"use client";

import React, { useEffect, useState } from "react";

import { $Enums, TaskStatus } from "@/lib/generated/prisma/client";
import { Column, ProjectTaskProps } from "@/types";
import { useRouter } from "next/navigation";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { taskStatusVariant } from "@/app/utils";
import { Separator } from "../ui/separator";
import ProjectCard from "./project-card";

const COLUMN_TITLES: Record<$Enums.TaskStatus, string> = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  BLOCKED: "Blocked",
  BACKLOG: "BackLog",
  IN_REVIEW: "In Review",
  COMPLETED: "Completed",
};

function ProjectKanban({ initialTasks }: { initialTasks: ProjectTaskProps[] }) {
  const router = useRouter();

  if (initialTasks?.length === 0) return null;

  const [column, setcolumn] = useState<Column[]>([]);

  useEffect(() => {
    const initialColumns: Column[] = Object.entries(COLUMN_TITLES).map(
      ([status, title]) => ({
        id: status as TaskStatus,
        title,
        tasks: initialTasks
          .filter((task) => task?.status === status)
          .sort((a, b) => a.position - b.position),
      }),
    );

    setcolumn(initialColumns);
  }, [initialTasks]);

  const onDragEnd = () => {};

  return (
    <div className="flex gap-4 h-full md:px-4 overflow-x-auto ">
      <DragDropContext onDragEnd={onDragEnd} >
        {column?.map((col) => (
          <div
            className="flex flex-col min-w-40 w-80 bg-gray-50 dark:bg-gray-900 py-4"
            key={col?.id}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 mb-4 pl-3">
                <div
                  className={cn("size-4 rounded")}
                  style={{
                    backgroundColor: taskStatusVariant[col?.id as TaskStatus],
                  }}
                />

                <span className="font-medium text-sm">{col?.title}</span>
              </div>
            </div>

            <Separator />

            <Droppable droppableId={col?.id}>
              {(provided) => (
                <div
                  {...provided?.droppableProps}
                  ref={provided?.innerRef}
                  className="rounded-lg flex-1 p-2"
                >
                  {col?.tasks?.map((task, index) => (
                    <Draggable
                      key={index}
                      draggableId={task?.id as string}
                      index={index}
                    >
                      {(provided) => (
                        <ProjectCard
                          ref={provided?.innerRef}
                          provided={provided as any}
                          task={task}
                        />
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
}

export default ProjectKanban;
