"use server";

import { apiURL } from "@/config/api";
import { CreatePostDTO } from "@/models/post.model";

export async function addPost(post: CreatePostDTO): Promise<boolean> {
  const response = await fetch(`${apiURL}/posts`, {
    method: "POST",
    body: JSON.stringify(post),
  });

  return response.ok;
}

export async function updatePost(post: { data: any; _id: string }): Promise<boolean> {
  const response = await fetch(`${apiURL}/posts/${post._id}`, {
    method: "PATCH",
    body: JSON.stringify(post.data),
  });

  return response.ok;
}

export async function deletePost(postId: string): Promise<boolean> {
  const response = await fetch(`${apiURL}/posts/${postId}`, {
    method: "DELETE",
  });

  return response.ok;
}


