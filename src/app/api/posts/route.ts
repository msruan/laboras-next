import { NextResponse } from "next/server";

import { connectToDb, OPTIONS } from "@/lib/utils";
import { Post, IPost } from "@/models/posts";

export const GET = async () => {
  try {
    await connectToDb();

    const post = await Post.find();
    return NextResponse.json(post);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};

export const POST = async (request: Request) => {
  try {
    await connectToDb();
    const postSchema : IPost = await request.json();
    const post = new Post(postSchema);
    post.save();
    return NextResponse.json(post);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};

export {OPTIONS}