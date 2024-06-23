import { NextResponse } from 'next/server';

import { connectToDb, DefaultResponse, OPTIONS } from '@/lib/utils';
import { IPost, Post } from '@/models/posts';

export const GET = async () => {
  try {
    await connectToDb();

    const post : IPost[] = await  (await Post()).find();
    return NextResponse.json(post);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};

export const POST = async (request: Request) => {
  try {
    await connectToDb();
    const postSchema: IPost = await request.json();
    const post = await Post();
    const newPost = await new post(postSchema);
    await newPost.save();
    return DefaultResponse(request, post);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};

export { OPTIONS };
