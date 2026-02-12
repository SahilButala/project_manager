import { Comment } from "@/lib/generated/prisma/client";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { ProfileAvatar } from "./profile-avatar";

interface CommentProps extends Comment {
  user: { id: string; name: string; image: string };
}

const CommentFeed = ({ comments }: { comments: CommentProps[] }) => {
  return (
    <div className="space-y-4">
      {comments && comments?.length > 0 ? (
        comments?.map((act) => (
          <div key={act?.id} className="flex items-center gap-3">
            <ProfileAvatar
              url={act?.user?.image as string}
              name={act?.user?.name as string}
              numOfChars={2}
              size="lg"
            />

            <div className="flex flex-1">
              <div className="flex items-center gap-2">
                <span className="text">{act?.user?.name}</span>

                <span className="text-sm text-gray-400">
                  {formatDistanceToNow(new Date(act?.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              <p className="text-sm">{act?.content}</p>
            </div>
          </div>
        ))
      ) : (
        <div>No Comments </div>
      )}
    </div>
  );
};

export default CommentFeed;
