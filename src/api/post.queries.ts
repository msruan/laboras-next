import { apiURL } from "@/constants";
import { EntityNotFoundException } from "@/exceptions";
import { logger } from "@/lib/logger";
import { connectToDb } from "@/lib/utils";
import { IPost, PostDB } from "@/models/post.model";
import { User, UserDB } from "@/models/user.model";
import mongoose from "mongoose";

export async function getPosts(): Promise<IPost[]> {
  const response = await fetch(`${apiURL}/posts`, {
    cache: "no-store",
    method: "GET",
    next: { tags: ["all-posts"] },
  });

  const data: IPost[] = await response.json();
  return data;
}

export async function getPostById(postId: string): Promise<{ post: IPost; postProfile: User; children: IPost[] }> {
  try {
    const isIdValid = mongoose.Types.ObjectId.isValid(postId);
    if (!isIdValid) {
      throw new EntityNotFoundException("Post not found")
    }

    await connectToDb();

    const post = await PostDB.findById(postId);
    if (!post) {
      throw new EntityNotFoundException("Post not found")
    }

    const postProfile = await UserDB.findById(post.user_id)
    if (!postProfile) {
      throw new EntityNotFoundException("Post profile not found")
    }

    const children = await PostDB.find({ linked_to: postId });
    return JSON.parse(JSON.stringify({ post, postProfile, children }))
  } catch (err) {
    logger.error(String(err));
    throw err;
  }
}
