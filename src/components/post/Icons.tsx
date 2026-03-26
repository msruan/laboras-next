"use client";

import { useState } from "react";

import { updatePost as handleUpdate } from "@/api/post.actions";
import { IPost } from "@/models/post.model";
import { FaceFrownIcon, StarIcon } from "@heroicons/react/16/solid";
import { logger } from "@/lib/logger";
import { cn } from "@/lib/utils";

type IconsProps = {
  post: IPost;
  fullPage: boolean;
  userId: string;
};

export const Icons = ({ post: postParam, fullPage: _, userId }: IconsProps) => {
  logger.trace(`The user id received was ${userId}`);
  const post = {...postParam};

  const [isLiked, setIsLiked] = useState<boolean>(post.liked_by.includes(userId));
  const [isDesliked, setIsDesliked] = useState<boolean>(post.desliked_by.includes(userId));

  async function handleLike() {
    if (isLiked) {
      post.likes--
      post.liked_by = post.liked_by.filter((id) => id !== userId);
    } else {
      post.liked_by.push(userId);
      post.likes++;
      if (isDesliked) {
        post.deslikes--;
        post.desliked_by = post.desliked_by.filter((id) => id !== userId);
        setIsDesliked(false);
      }
    }
    setIsLiked(!isLiked);
    await handleUpdate({
      _id: post._id!,
      data: { likes: post.likes, deslikes: post.deslikes, liked_by: post.liked_by, desliked_by: post.desliked_by },
    });
  }

  function handleDeslike() {
    if (isDesliked) {
      post.deslikes--;
      post.desliked_by = post.desliked_by.filter((id) => id !== userId);
    }
    else {
      post.deslikes++;
      post.desliked_by.push(userId);
      if (isLiked) {
        post.likes--;
        post.liked_by = post.liked_by.filter((id) => id !== userId);
        setIsLiked(false);
      }
    }
    setIsDesliked(!isDesliked);
    handleUpdate({
      _id: post._id!,
      data: { likes: post.likes, deslikes: post.deslikes, liked_by: post.liked_by, desliked_by: post.desliked_by },
    });
  }

  return (
    <>
      <div className="flex justify-between items-center text-sm">
        <span>{post.likes > 0 && post.likes}</span>
        <StarIcon
          className={cn("h-4 w-4", isLiked ? " text-yellow-500" : "text-gray-500")}
          onClick={handleLike}
          cursor="pointer"
        />
      </div>

      <div className="flex justify-between items-center text-sm">
        <span>{post.deslikes > 0 && post.deslikes}</span>
        <FaceFrownIcon
          className={cn("h-4 w-4", isDesliked ? " text-red-500" : "text-gray-500")}
          onClick={handleDeslike}
          cursor="pointer"
        />
      </div>
    </>
  );
};
