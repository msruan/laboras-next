import { NextResponse } from "next/server";

import { connectToDb } from "@/lib/utils";
import { IPost, PostDB } from "@/models/post.model";
import { IProfile, ProfileDB } from "@/models/profile.model";
import { logger } from "@/lib/logger";

export const GET = async (_request: Request, { params }: any) => {
  try {
    await connectToDb();
    const { username } = params;
    logger.trace(`The received username is ${username}`);

    const user: IProfile | null = await ProfileDB.findOne({ username: username });
    if (!user) throw new Error("User not found!");
    const posts: IPost[] = await PostDB.find({ user_id: user._id });

    return NextResponse.json({
      user: user,
      posts: posts.filter((post) => post.linked_to === null).reverse(),
    });

  } catch (err) {
    logger.error(String(err));
    return NextResponse.error();
  }
};
