"use client";
import { useState } from 'react';

import { updatePost as handleUpdate } from '@/actions/PostActions';
import { IPost } from '@/models/posts';
import { FaceFrownIcon, StarIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';

type IconsProps = {
  post: IPost;
  fullPage: boolean;
};

export const Icons = ({ post, fullPage }: IconsProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDesliked, setIsDesliked] = useState<boolean>(false);
  const router = useRouter();
  async function handleLike() {
    if (isLiked) post.likes--;
    else {
      post.likes++;
      if (isDesliked) {
        post.deslikes--;
        setIsDesliked(false);
        handleUpdate({
          _id: post._id!,
          data: {
            likes: post.likes,
            deslikes: post.deslikes,
          },
        });
      }
    }
    setIsLiked(!isLiked);
    await handleUpdate({ _id: post._id!, data: { likes: post.likes } });
  }

  function handleDeslike() {
    if (isDesliked) post.deslikes--;
    else {
      post.deslikes++;
      if (isLiked) {
        post.likes--;
        setIsLiked(false);
        handleUpdate({
          _id: post._id!,
          data: {
            likes: post.likes,
            deslikes: post.deslikes,
          },
        });
      }
    }
    setIsDesliked(!isDesliked);
    handleUpdate({ _id: post._id!, data: { deslikes: post.deslikes } });
  }
  return (
    <>
      <div className="flex justify-between items-center text-sm">
        <span>{post.likes > 0 && post.likes}</span>
        <StarIcon
          className={
            `h-4 w-4 ` + (isLiked ? " text-yellow-500" : "text-gray-500")
          }
          onClick={handleLike}
          cursor="pointer"
        />
      </div>

      <div className="flex justify-between items-center text-sm">
        <span>{post.deslikes > 0 && post.deslikes}</span>
        <FaceFrownIcon
          className={
            `h-4 w-4 ` + (isDesliked ? "text-red-500" : " text-gray-500")
          }
          onClick={handleDeslike}
          cursor="pointer"
        />
      </div>
    </>
  );
};
