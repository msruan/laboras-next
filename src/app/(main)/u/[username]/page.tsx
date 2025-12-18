import { FC } from 'react';

import { api } from '@/config/api';
import { auth } from '@/lib/auth';
import { IPost } from '@/models/posts';
import { IProfile } from '@/models/profiles';
import UserPage from '@/components/pages/user-page';

type Props = {
  params: {
    username: string;
  };
};

const User: FC<Props> = async ({ params }) => {
  const { username } = params;
  
  const session = await auth();
  
  const data = await api.get(`/profiles/username/${username}`);
  const profile: IProfile = data.data.user;
  const posts: IPost[] = data.data.posts;

  return (
    <UserPage profile={profile} profilePosts={posts} isProfileOfLoggerUser={session?.user?.email === profile.email}/>
  );
};

export default User;
