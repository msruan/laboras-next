import { auth } from '@/lib/auth';
import { IPost } from '@/models/post.model';
import type { User } from '@/models/user.model';
import {UserDetailPage} from '@/components/pages/user-page';
import { getProfileByUsername, getUserByEmail } from '@/api/user.queries';
import { EntityNotFoundException } from '@/exceptions';
import { notFound } from 'next/navigation';
import { logger } from '@/lib/logger';
import { Metadata } from 'next';

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const { username } = await params;
 
  return {
    title: username,
  }
}

const UserDetail = async ({ params }: Props) => {
  const { username } = await params;

  let data;

  try {
    data = await getProfileByUsername(username)
  } catch (err) {
    logger.error(String(err));

    if (err instanceof EntityNotFoundException) {
      notFound();
    }
    throw err;
  }

  const userProfile: User = data.user;
  const userPosts: IPost[] = data.posts;

  const session = await auth();
  const user: User = await getUserByEmail(session?.user?.email ?? "")

  return (
    <UserDetailPage currentUser={user} profile={userProfile} profilePosts={userPosts} isProfileOfLoggerUser={session?.user?.email === userProfile.email} />
  );
};

export default UserDetail;
