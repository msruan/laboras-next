import { NextResponse } from 'next/server';

import { connectToDb, DefaultResponse, OPTIONS } from '@/lib/utils';
import { IPost, PostCreate, Post } from '@/models/posts';
import {revalidatePath, revalidateTag} from "next/cache";

export const GET = async () => {
  try {
    await connectToDb();

    const posts : IPost[] = await  (await Post()).find();
    return NextResponse.json(posts.reverse());
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};

export const POST = async (request: Request) => {
  try {
    await connectToDb();
    console.log("conectei baby")
    const postSchema: PostCreate = await request.json();
    const post = await Post();
    const newPost = await new post(postSchema);
    console.log("supostamente criei o troço")
    await newPost.save();
    console.log("salvei divo")
    revalidatePath("/")
    revalidateTag("all-posts");
    return DefaultResponse(request, post);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};

export { OPTIONS };
