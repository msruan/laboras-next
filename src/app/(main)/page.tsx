import { getPosts } from "@/api/post.queries";
import { getUserByEmail, getUsers } from '@/api/user.queries';
import { PostsContainer } from '@/components/PostsContainer';
import { auth } from '@/lib/auth';
import { IProfile } from '@/models/profile.model';

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Laboras",
  description: "The worst social network :)",
};

const Home = async () => {
  const [posts, profiles, session] = await Promise.all([getPosts(), getUsers(), auth()]);

  const user: IProfile = await getUserByEmail(session?.user?.email ?? "")

  return <PostsContainer currentUser={user} posts={posts} profiles={profiles} />;
}

export default Home