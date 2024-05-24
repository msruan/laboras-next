import { NextResponse } from "next/server";

import { connectToDb } from "@/lib/utils";
import { Post } from "@/models/posts";

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

export const POST = async (request: any, { params }: any) => {
  try {
    await connectToDb();
    const { id } = params;

    const post = await Post.findById(id);
    return NextResponse.json(post);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};
