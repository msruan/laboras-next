import { getPosts } from '@/actions/PostActions';
import { PostsContainer } from '@/components/PostsContainer';
import { IPost } from '@/models/posts';

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Laboras",
  description: "The worst social network :)",
};
export default async function HomePage() {
  const posts: IPost[] = JSON.parse(JSON.stringify(await getPosts()));
  return <PostsContainer posts={posts} />;
}
