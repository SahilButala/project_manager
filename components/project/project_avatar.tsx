import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "../ui/avatar";

export const ProjectAvatar = ({ name , className  }: { name: string  , className? :string}) => {
  return (
    <Avatar className={cn("size-6 2xl:size-8 rounded-md  items-center" , className)}>
      <AvatarFallback className="w-full h-full bg-blue-600 text-base text-white rounded-md">
        {name.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};
