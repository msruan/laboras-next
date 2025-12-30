import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { connectToDb } from "@/lib/utils";
import { IPost, PostDB } from "@/models/post.model";

export const GET = async (_request: Request, { params }: any) => {
  try {
    await connectToDb();
    const { id } = params;

    const post = await PostDB.findById(id);
    const children = await PostDB.find({ linked_to: id });
    return NextResponse.json({ post: post, children: children });
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};

export const DELETE = async (_request: Request, { params }: any) => {
  try {
    await connectToDb();
    const { id } = params;

    const post = await PostDB.findByIdAndDelete(id);
    if (post) {
      revalidateTag("all-posts");
      return NextResponse.json({ sucess: true });
    } else return NextResponse.json({ sucess: false });
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};

export const PATCH = async (request: Request, { params }: any) => {
  try {
    await connectToDb();
    const { id } = params;
    const postAtualizado: IPost = await request.json();
    const post = await PostDB.findByIdAndUpdate(id, postAtualizado);
    console.log("mana eu atualizei");
    revalidateTag("all-posts");
    return NextResponse.json(post);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};
