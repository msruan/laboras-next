import { NextResponse } from "next/server";

import { connectToDb, DefaultResponse, OPTIONS } from "@/lib/utils";
import { Post, IPost } from "@/models/posts";

export const GET = async () => {
  try {
    await connectToDb();

    const post: IPost[] = await Post.find();
    return NextResponse.json(post.reverse());
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};

export const POST = async (request: Request) => {
  try {
    await connectToDb();
    const postSchema: IPost = await request.json();
    const post = new Post(postSchema);
    post.save();
    return DefaultResponse(request, post);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};

export { OPTIONS };
