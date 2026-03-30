import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { connectToDb, parseObjToJson } from "@/lib/utils";
import {
	type Post,
	PostDB,
	type PostDTO,
	parsePost,
} from "@/models/post.model";

export const GET = async () => {
	try {
		await connectToDb();

		const rawPosts = await PostDB.find({ linkedTo: null }, null, {
			sort: "-createdAt",
		}).populate("owner");

		const posts = parseObjToJson<PostDTO[]>(rawPosts);

		return NextResponse.json(posts.map(parsePost) satisfies Post[]);
	} catch (err) {
		logger.error(String(err));
		return NextResponse.error();
	}
};
