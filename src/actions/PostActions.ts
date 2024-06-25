"use server"
import { apiURL as server} from '@/config/api';
const apiURL = server();
import {IPost, PostCreate, PostUpdate} from '@/models/posts';

export async function addPost(post: PostCreate){
  console.log("entrei aqui mano")
  const response  = await fetch(`${apiURL}/posts`, {
    method: "POST",
    body: JSON.stringify(post),
  });
  return response.ok;
}

export async function updatePost(post: PostUpdate) {
  const response  = await fetch(`${apiURL}/posts/${post._id}`, {
    method: "PATCH",
    body: JSON.stringify(post),
  });
  return response.ok;
}

export async function deletePost(postId: string) {
  const response =  await fetch(`${apiURL}/posts/${postId}`, {
    method: "DELETE",
  });
  return response.ok;
}

export async function getPosts(): Promise<IPost[]> {
  const response = await fetch(`${apiURL}/posts`, {
    cache: "no-store",
    method: "GET",
    next: { tags: ["all-posts"] },
  })
  return await response.json();
}
