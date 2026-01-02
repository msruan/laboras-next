import { NextResponse } from "next/server";

import { connectToDb } from "@/lib/utils";
import { PostDB } from "@/models/post.model";
import { logger } from "@/lib/logger";

export const GET = async (_request: Request, { params }: any) => {
  try {
    await connectToDb();
    const { id } = params;

    const posts = await PostDB.find({ user_id: id });
    return NextResponse.json(posts);
  } catch (err) {
    logger.error(String(err));
    return NextResponse.error();
  }
};
