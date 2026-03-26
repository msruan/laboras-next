"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { logger } from "@/lib/logger";
import { connectToDb } from "@/lib/utils";
import { type CreatePostDTO, PostDB } from "@/models/post.model";

export async function addPost(payload: CreatePostDTO): Promise<void> {
	try {
		await connectToDb();

		const newPost = new PostDB(payload);

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

export async function updatePost(payload: {
	data: any;
	_id: string;
}): Promise<void> {
	try {
		await connectToDb();
		const post = await PostDB.findByIdAndUpdate(payload._id, payload.data);
		if (!post) {
			throw new Error("Post not found");
		}
		logger.info("Post atualizado!");
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
