import { env } from "@/env/server";
import { logger } from "@/lib/logger";
import { connectToDb } from "@/lib/utils";
import { IPost, PostDB } from "@/models/post.model";
import { IProfile, ProfileDB } from "@/models/profile.model";

const apiURL = env.SERVER_URL + "/api";

export async function getPosts(): Promise<IPost[]> {
  const response = await fetch(`${apiURL}/posts`, {
    cache: "no-store",
    method: "GET",
    next: { tags: ["all-posts"] },
  });

  const data: IPost[] = await response.json();
  return data;
}

export async function getPostById(postId: string): Promise<{ post: IPost; postProfile: IProfile; children: IPost[] }> {
  try {
    await connectToDb();

    const post = await PostDB.findById(postId);
    if (!post) {
      throw new Error("Post not found")
    }

    const postProfile = await ProfileDB.findById(post.user_id)
    if (!postProfile) {
      throw new Error("Post profile not found")
    }

    const children = await PostDB.find({ linked_to: postId });
    return JSON.parse(JSON.stringify({ post, postProfile, children }))
  } catch (err) {
    logger.error(String(err));
    throw err;
  }
}
