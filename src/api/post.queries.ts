import mongoose from "mongoose";
import { apiURL } from "@/constants";
import { EntityNotFoundException } from "@/exceptions";
import { logger } from "@/lib/logger";
import { connectToDb } from "@/lib/utils";
import { type Post, PostDB } from "@/models/post.model";
import { type User, UserDB } from "@/models/user.model";

export async function getPosts(): Promise<Post[]> {
	const response = await fetch(`${apiURL}/posts`, {
		cache: "no-store",
		method: "GET",
		next: { tags: ["all-posts"] },
	});

	const data: Post[] = await response.json();
	return data;
}

export async function getPostById(
	postId: string,
): Promise<{ post: Post; postProfile: User; children: Post[] }> {
	try {
		const isIdValid = mongoose.Types.ObjectId.isValid(postId);
		if (!isIdValid) {
			throw new EntityNotFoundException("Post not found");
		}

		await connectToDb();

		const post = await PostDB.findById(postId);
		if (!post) {
			throw new EntityNotFoundException("Post not found");
		}

		const postProfile = await UserDB.findById(post.user_id);
		if (!postProfile) {
			throw new EntityNotFoundException("Post profile not found");
		}

		const children = await PostDB.find({ linked_to: postId });
		return JSON.parse(JSON.stringify({ post, postProfile, children }));
	} catch (err) {
		logger.error(String(err));
		throw err;
	}
}
