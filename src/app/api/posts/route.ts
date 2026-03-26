import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { connectToDb } from "@/lib/utils";
import { type IPost, PostDB } from "@/models/post.model";

export const GET = async () => {
	try {
		await connectToDb();

		const posts: IPost[] = await PostDB.find();

		return NextResponse.json(
			posts.filter((post) => post.linked_to === null).reverse(),
		);
	} catch (err) {
		logger.error(String(err));
		return NextResponse.error();
	}
};
