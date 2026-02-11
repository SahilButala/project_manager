import React from "react";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";

export type variantTypes = "default" | "success" | "warning" | "inProgress";

interface Props {
  title: string;
  value: number;
  subTitle: string;
  variant: variantTypes;
}

const variantStyles = {
  default: "text-blue-500",
  success: "text-green-500",
  warning: "text-red-500",
  inProgress: "text-yellow-500",
};
const CircleProgress = ({ title, value, subTitle, variant }: Props) => {
  return (
    <div className="flex flex-col items-center p-4 mb-3">
      <h3 className="text-sm font-medium  mb-2 dark:text-white text-black">{title}</h3>

      <div className="relative w-20 h-20 ">
        <Progress
          value={value}
          className={cn(
            "h-20 w-20 rotate-[-90deg]",
            variantStyles[variant as variantTypes],
          )}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span>{`${Math.round(value || 0)}%`}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-3 text-center dark:text-white text-black">{subTitle}</p>
      </div>
    </div>
  );
};

export default CircleProgress;
