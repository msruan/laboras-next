import { NextResponse } from "next/server";

import { connectToDb } from "@/lib/utils";
import { IPost, PostDB } from "@/models/post.model";
import { logger } from "@/lib/logger";

export const GET = async () => {
  try {
    await connectToDb();

    const posts: IPost[] = await PostDB.find();

    return NextResponse.json(
      posts.filter((post) => post.linked_to === null).reverse()
    );
  } catch (err) {
    logger.error(String(err));
    return NextResponse.error();
  }
};
