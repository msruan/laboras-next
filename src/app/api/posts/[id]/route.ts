import { NextApiRequest } from 'next';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

import { connectToDb, DefaultResponse, OPTIONS } from '@/lib/utils';
import { IPost, Post } from '@/models/posts';

export const GET = async (request: NextApiRequest, { params }: any) => {
  try {
    await connectToDb();
    const { id } = params;

    const post = await (await Post()).findById(id);
    return NextResponse.json(post);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};

export const DELETE = async (request: NextApiRequest, { params }: any) => {
  try {
    await connectToDb();
    const { id } = params;

    const post = await (await Post()).findByIdAndDelete(id);
    if (post) {
      revalidateTag("all-posts");
      return NextResponse.json({ sucess: true });
    } else return NextResponse.json({ sucess: false });
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};

export const PATCH = async (request: any, { params }: any) => {
  try {
    await connectToDb();
    const { id } = params;
    const postAtualizado: IPost = await request.json();
    const post = await (
      await Post()
    ).findByIdAndUpdate(id, { $set: postAtualizado });
    revalidateTag("all-posts");
    return DefaultResponse(request, post);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};

export { OPTIONS };
