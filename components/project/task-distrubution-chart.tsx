"use client";

import React from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label, Pie, PieChart } from "recharts";

export interface TaskDistrubutionProps {
  tasks: {
    total: number;
    completed: number;
    inProgress: number;
    overdue: number;
  };
}

const chartConfig = {
  tasks: {
    label: "Tasks",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-1))",
  },
  inProgress: {
    label: "In Progress",
  },
  overdue: {
    label: "Overdue",
  },
  todo: {
    label: "Todo",
  },
} satisfies ChartConfig;

const TaskDistrubutionChart = ({ tasks }: TaskDistrubutionProps) => {
  const data = [
    {
      name: "Completed",
      value: tasks?.completed,
      fill: "#22c55e",
    },
    {
      name: "In Progress",
      value: tasks?.inProgress,
      fill: "#f59e0b",
    },
    {
      name: "Overdue",
      value: tasks?.overdue,
      fill: "red",
    },
    {
      name: "Todo",
      value:
        tasks?.total - (tasks.completed + tasks.inProgress + tasks.overdue),
      fill: "#FFF19B",
    },
  ].filter((item) => item.value > 0);
return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Task Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {tasks?.total?.toLocaleString()}
                        </tspan>
                        {/* 2. Added dy="24" to move "Tasks" below the number */}
                        <tspan x={viewBox.cx} y={viewBox.cy} dy="24" className="fill-muted-foreground">
                          Tasks
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total tasks for the project
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskDistrubutionChart;
