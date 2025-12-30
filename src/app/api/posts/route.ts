import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { connectToDb } from "@/lib/utils";
import { IPost, PostDB, CreatePostDTO } from "@/models/post.model";

export const GET = async () => {
  try {
    await connectToDb();

    const posts: IPost[] = await PostDB.find();

    return NextResponse.json(
      posts.filter((post) => post.linked_to === null).reverse()
    );
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};

export const POST = async (request: Request) => {
  try {
    await connectToDb();
    console.log("Conectei baby");

    const postSchema: CreatePostDTO = await request.json();
    const newPost = new PostDB(postSchema);
    console.log("Supostamente criei o troço");
    await newPost.save();
    console.log("Salvei divo");
    revalidatePath("/");
    revalidateTag("all-posts");

    return NextResponse.json(newPost);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};
