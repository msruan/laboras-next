import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { connectToDb } from "@/lib/utils";
import { IPost, PostDB, CreatePostDTO } from "@/models/post.model";
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

export const POST = async (request: Request) => {
  try {
    await connectToDb();

    const postSchema: CreatePostDTO = await request.json();
    const newPost = new PostDB(postSchema);
    
    await newPost.save();
    logger.info("New post created!");
    
    revalidatePath("/");
    revalidateTag("all-posts");

    return NextResponse.json(newPost);
  } catch (err) {
    logger.error(String(err));
    return NextResponse.error();
  }
};
