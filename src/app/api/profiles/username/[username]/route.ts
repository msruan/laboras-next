import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import cors from '@/lib/cors';
import { connectToDb, OPTIONS } from '@/lib/utils';
import { IPost, Post } from '@/models/posts';
import { IProfile, Profile } from '@/models/profiles';

export const GET = async (request: Request, { params }: any) => {
  try {
    await connectToDb();
    const { username } = params;
    console.log("o username eh", username);

    const user: IProfile | null = await (
      await Profile()
    ).findOne({ username: username });
    if (!user) throw new Error("User not found!");
    const posts: IPost[] = await (await Post()).find({ user_id: user._id });
    return cors(
      request,
      new Response(JSON.stringify({ user: user, posts: posts }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};

export { OPTIONS };
