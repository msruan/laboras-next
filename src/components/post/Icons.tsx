"use client";

import { FaceFrownIcon, StarIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { updatePost as handleUpdate } from "@/api/post.actions";
import { logger } from "@/lib/logger";
import { cn } from "@/lib/utils";
import type { Post } from "@/models/post.model";

type IconsProps = {
	post: Post;
	fullPage: boolean;
	userId: string;
};

export const Icons = ({ post: postParam, fullPage: _, userId }: IconsProps) => {
	logger.trace(`The user id received was ${userId}`);
	const post = { ...postParam };

	const [isLiked, setIsLiked] = useState<boolean>(
		post.likedBy.includes(userId),
	);
	const [isDesliked, setIsDesliked] = useState<boolean>(
		post.deslikedBy.includes(userId),
	);

	async function handleLike() {
		if (isLiked) {
			post.likes--;
			post.likedBy = post.likedBy.filter((id) => id !== userId);
		} else {
			post.likedBy.push(userId);
			post.likes++;
			if (isDesliked) {
				post.deslikes--;
				post.deslikedBy = post.deslikedBy.filter((id) => id !== userId);
				setIsDesliked(false);
			}
		}
		setIsLiked(!isLiked);
		await handleUpdate({
			_id: post.id,
			likes: post.likes,
			deslikes: post.deslikes,
			liked_by: post.likedBy,
			desliked_by: post.deslikedBy,
		});
	}

	function handleDeslike() {
		if (isDesliked) {
			post.deslikes--;
			post.deslikedBy = post.deslikedBy.filter((id) => id !== userId);
		} else {
			post.deslikes++;
			post.deslikedBy.push(userId);
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
			deslikes: post.deslikes,
			liked_by: post.likedBy,
			desliked_by: post.deslikedBy,
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
				<span>{post.deslikes > 0 && post.deslikes}</span>
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
