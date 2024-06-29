import { FC } from 'react';

import { MainPosts } from '@/components/MainPosts';
import { Navbar } from '@/components/profile/Navbar';
import { Profile } from '@/components/profile/Profile';
import { api } from '@/config/api';
import { auth } from '@/lib/auth';
import { IProfile } from '@/models/profiles';

type Props = {
  params: {
    username: string;
  };
};

const UserPage: FC<Props> = async ({ params }) => {
  const { username } = params;
  const session = await auth();
  const response = await api.get("/profiles/username/" + username);
  const profile: IProfile = response.data;
  const posts = (await api.get("/posts/profile/" + profile._id)).data;
  return (
    <div className="flex flex-col h-full max-xl:border-0 gap-2 pl-3 pr-3 border-rebeccapurple2 border-r-2 border-l-2">
      <div className="flex flex-col gap-1">
        <Navbar username={profile.username} />
        <Profile profile={profile!} email={session?.user?.email!} />
      </div>
      <MainPosts textbox={false} posts={posts} />
    </div>
  );
};
export default UserPage;
