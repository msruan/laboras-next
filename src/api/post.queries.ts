import { apiURL } from "@/constants";
import { EntityNotFoundException } from "@/exceptions";
import { logger } from "@/lib/logger";
import { connectToDb, parseObjToJson } from "@/lib/utils";
import {
	type Post,
	PostDB,
	type PostDTO,
	parsePost,
} from "@/models/post.model";

export async function getPosts(): Promise<Post[]> {
	const response = await fetch(`${apiURL}/posts`, {
		cache: "no-store",
		method: "GET",
		next: { tags: ["all-posts"] },
	});

	return await response.json();
}

export async function getPostById(
	postId: string,
): Promise<{ post: Post; replies: Post[] }> {
	try {
		await connectToDb();

		const rawPost = await PostDB.findById(postId).populate("owner");
		if (!rawPost) {
			throw new EntityNotFoundException("Post not found");
		}
		const post = parseObjToJson<PostDTO>(rawPost);

		const rawReplies = await PostDB.find({ linkedTo: postId }).populate(
			"owner",
		);
		const replies = parseObjToJson<PostDTO[]>(rawReplies);

		return {
			post: parsePost(post),
			replies: replies.map(parsePost),
		};
	} catch (err) {
		logger.error(String(err));
		throw err;
	}
}
