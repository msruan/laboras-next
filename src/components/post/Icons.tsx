"use client";

import { FaceFrownIcon, StarIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { updatePost as handleUpdate } from "@/api/post.actions";
import { logger } from "@/lib/logger";
import { cn } from "@/lib/utils";
import type { Post } from "@/models/post.model";

type IconsProps = {
	post: Post;
	userId: string;
};

export const Icons = ({ post, userId }: IconsProps) => {
	logger.trace(`The user id received was ${userId}`);

	const [isLiked, setIsLiked] = useState<boolean>(
		post.likedBy.includes(userId),
	);
	const [isDesliked, setIsDesliked] = useState<boolean>(
		post.dislikedBy.includes(userId),
	);

	async function handleLike() {
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
		await handleUpdate({
			_id: post.id,
			likes: post.likes,
			dislikes: post.dislikes,
			likedBy: post.likedBy,
			dislikedBy: post.dislikedBy,
		});
	}

	function handleDeslike() {
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
			<div className="flex items-center justify-between text-sm">
				<span>{post.likes > 0 && post.likes}</span>
				<StarIcon
					className={cn(
						"h-4 w-4",
						isLiked ? "text-yellow-500" : "text-gray-500",
					)}
					onClick={handleLike}
					cursor="pointer"
				/>
			</div>

			<div className="flex items-center justify-between text-sm">
				<span>{post.dislikes > 0 && post.dislikes}</span>
				<FaceFrownIcon
					className={cn(
						"h-4 w-4",
						isDesliked ? "text-red-500" : "text-gray-500",
					)}
					onClick={handleDeslike}
					cursor="pointer"
				/>
			</div>
		</>
	);
};
