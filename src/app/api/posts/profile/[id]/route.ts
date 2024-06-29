import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

import { connectToDb } from '@/lib/utils';
import { Post } from '@/models/posts';

export const GET = async (request: NextApiRequest, { params }: any) => {
  try {
    await connectToDb();
    const { id } = params;

    const post = await (await Post()).find({ user_id: id });
    return NextResponse.json(post);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};
