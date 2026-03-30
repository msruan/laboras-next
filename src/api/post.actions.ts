"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { logger } from "@/lib/logger";
import { connectToDb } from "@/lib/utils";
import {
	type CreatePostDTO,
	PostDB,
	type UpdatePostDTO,
} from "@/models/post.model";

export async function createPost(payload: CreatePostDTO): Promise<void> {
	try {
		await connectToDb();
		const { ownerId, ...props } = payload;

		const newPost = new PostDB({
			owner: ownerId,
			...props,
		});

		await newPost.save();
		logger.info("New post created!");

		revalidatePath("/");
		revalidateTag("all-posts", "max");

		return;
	} catch (err) {
		logger.error(String(err));
		throw err;
	}
}

export async function updatePost(payload: UpdatePostDTO): Promise<void> {
	try {
		await connectToDb();

		const id = payload._id;
		delete payload._id;

		const post = await PostDB.findByIdAndUpdate(id, payload);
		if (!post) {
			throw new Error("Post not found");
		}
		logger.info("Post was updated!");
		revalidateTag("all-posts", "max");
		return;
	} catch (err) {
		logger.error(String(err));
		throw err;
	}
}

export async function deletePost(postId: string): Promise<void> {
	try {
		await connectToDb();

		const post = await PostDB.findByIdAndDelete(postId);
		if (!post) {
			throw new Error("Post not found");
		}
		revalidateTag("all-posts", "max");
	} catch (err) {
		logger.error(String(err));
		throw err;
	}
}
