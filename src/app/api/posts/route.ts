import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { connectToDb } from "@/lib/utils";
import { type Post, PostDB, parsePost } from "@/models/post.model";

export const GET = async () => {
	try {
		await connectToDb();

		const rawPosts = await PostDB.find({ linked_to: null }, null, {
			sort: "-createdAt",
		}).populate("owner");

		const posts: Post[] = rawPosts.map(parsePost);

		return NextResponse.json(posts);
	} catch (err) {
		logger.error(String(err));
		return NextResponse.error();
	}
};
