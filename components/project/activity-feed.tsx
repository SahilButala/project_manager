import React from "react";
import { ProfileAvatar } from "./profile-avatar";
import { formatDistanceToNow } from "date-fns";
export interface Activity {
  id: string;
  type: string;
  description: string;
  createdAt: Date;
  user: {
    name: string;
    image: string | null;
  };
}

interface ActivityFeedProps {
  activities: Activity[];
}
const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  return (
    <div className="space-y-4  ">
      {activities && activities?.length > 0 ? (
        activities?.map((act) => (
          <div key={act?.id} className="flex items-center gap-3">
            <ProfileAvatar
              url={act?.user?.image as string}
              name={act?.user?.name as string}
              numOfChars={2}
              size="lg"
            />

            <div className="flex flex-col">
            <p className="font-semibold text-black text-sm">
                <span className="text">{act?.user?.name}</span><span className="mr-2"></span>
                {act?.description.charAt(0).toUpperCase() + act?.description.slice(1)}
              </p>

              <span className="text-sm text-gray-400">
                {formatDistanceToNow(new Date(act?.createdAt) , {
                  addSuffix  : true
                })}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div>No Activity </div>
      )}
    </div>
  );
};

export default ActivityFeed;
