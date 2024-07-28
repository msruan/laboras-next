import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

import { connectToDb } from "@/lib/utils";
import { Post } from "@/models/posts";

export const GET = async (request: NextApiRequest, { params }: any) => {
  try {
    await connectToDb();
    const { id } = params;

    const posts = await (await Post()).find({ user_id: id });
    return NextResponse.json(posts);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};
