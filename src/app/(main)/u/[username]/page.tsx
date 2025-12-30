import { FC } from 'react';

import { api } from '@/config/api';
import { auth } from '@/lib/auth';
import { IPost } from '@/models/post.model';
import { IProfile } from '@/models/profile.model';
import UserPage from '@/components/pages/user-page';
import { getUserByEmail } from '@/api/user.queries';

type Props = {
  params: {
    username: string;
  };
};

const User: FC<Props> = async ({ params }) => {
  const { username } = params;

  const data = await api.get(`/profiles/username/${username}`);

  const userProfile: IProfile = data.data.user;
  const userPosts: IPost[] = data.data.posts;

  const session = await auth();
  const user: IProfile = await getUserByEmail(session?.user?.email ?? "")

  return (
    <UserPage currentUser={user} profile={userProfile} profilePosts={userPosts} isProfileOfLoggerUser={session?.user?.email === userProfile.email} />
  );
};

export default User;
