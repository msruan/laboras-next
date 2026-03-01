import { FC } from 'react';

import { auth } from '@/lib/auth';
import { IPost } from '@/models/post.model';
import { IProfile } from '@/models/profile.model';
import UserPage from '@/components/pages/user-page';
import { getProfileByUsername, getUserByEmail } from '@/api/user.queries';
import { EntityNotFoundException } from '@/exceptions';
import { redirect } from 'next/navigation';

type Props = {
  params: {
    username: string;
  };
};

const User: FC<Props> = async ({ params }) => {
  const { username } = params;

  let data;

  try {
    data = await getProfileByUsername(username)
  } catch (err) {
    if (err instanceof EntityNotFoundException) {
      redirect(`/404`)
    }
    throw err;
  }

  const userProfile: IProfile = data.user;
  const userPosts: IPost[] = data.posts;

  const session = await auth();
  const user: IProfile = await getUserByEmail(session?.user?.email ?? "")

  return (
    <UserPage currentUser={user} profile={userProfile} profilePosts={userPosts} isProfileOfLoggerUser={session?.user?.email === userProfile.email} />
  );
};

export default User;
