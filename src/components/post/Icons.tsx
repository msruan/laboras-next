"use client";

import { FaceFrownIcon, StarIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { updatePost as handleUpdate } from "@/api/post.actions";
import { logger } from "@/lib/logger";
import { cn } from "@/lib/utils";
import type { Post } from "@/models/post.model";

export const Icons = ({ post, userId }: { post: Post; userId: string }) => {
  logger.trace(`The user id received was ${userId}`);

  const [isLiked, setIsLiked] = useState<boolean>(
    post.likedBy.includes(userId),
  );
  const [isDesliked, setIsDesliked] = useState<boolean>(
    post.dislikedBy.includes(userId),
  );

  function handleLike() {
    if (isLiked) {
      post.likes--;
      post.likedBy = post.likedBy.filter((id) => id !== userId);
    } else {
      post.likedBy.push(userId);
      post.likes++;
      if (isDesliked) {
        post.dislikes--;
        post.dislikedBy = post.dislikedBy.filter((id) => id !== userId);
        setIsDesliked(false);
      }
    }
    setIsLiked(!isLiked);
    handleUpdate({
      _id: post.id,
      likes: post.likes,
      dislikes: post.dislikes,
      likedBy: post.likedBy,
      dislikedBy: post.dislikedBy,
    });
  }

  function handleDislike() {
    if (isDesliked) {
      post.dislikes--;
      post.dislikedBy = post.dislikedBy.filter((id) => id !== userId);
    } else {
      post.dislikes++;
      post.dislikedBy.push(userId);
      if (isLiked) {
        post.likes--;
        post.likedBy = post.likedBy.filter((id) => id !== userId);
        setIsLiked(false);
      }
    }
    setIsDesliked(!isDesliked);
    handleUpdate({
      _id: post.id,
      likes: post.likes,
      dislikes: post.dislikes,
      likedBy: post.likedBy,
      dislikedBy: post.dislikedBy,
    });
  }

  return (
    <>
      <div className="flex h-5 items-center justify-between text-sm">
        <span>{post.likes > 0 && post.likes}</span>
        <button type="button" className="cursor-pointer" onClick={handleLike}>
          <StarIcon
            className={cn(
              "h-4 w-4",
              isLiked ? "text-yellow-500" : "text-gray-500",
            )}
          />
        </button>
      </div>

      <div className="flex h-5 items-center justify-between text-sm">
        <span>{post.dislikes > 0 && post.dislikes}</span>
        <button
          type="button"
          className="cursor-pointer"
          onClick={handleDislike}
        >
          <FaceFrownIcon
            className={cn(
              "h-4 w-4",
              isDesliked ? "text-red-500" : "text-gray-500",
            )}
          />
        </button>
      </div>
    </>
  );
};
