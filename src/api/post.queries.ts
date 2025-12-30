import { apiURL } from "@/config/api";
import { IPost } from "@/models/post.model";


export async function getPosts(): Promise<IPost[]> {
  const response = await fetch(`${apiURL}/posts`, {
    cache: "no-store",
    method: "GET",
    next: { tags: ["all-posts"] },
  });

  const data: IPost[] = await response.json();
  return data;
}
