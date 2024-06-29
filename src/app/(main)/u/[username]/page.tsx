import { FC } from 'react';

import { Header } from '@/components/Header';
import { MainPosts } from '@/components/MainPosts';
import { Profile } from '@/components/profile/Profile';
import { api } from '@/config/api';
import { auth } from '@/lib/auth';
import { IPost } from '@/models/posts';
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
  const profile: IProfile = response.data.user;
  const posts: IPost[] = response.data.posts;
  console.log("A response foi ");
  console.log(response);
  return (
    <div className="flex flex-col h-full max-xl:border-0 gap-2 pl-3 pr-3 border-rebeccapurple2 border-r-2 border-l-2">
      <div className="flex flex-col gap-1">
        <Header title={profile.username} />
        <Profile profile={profile!} email={session?.user?.email!} />
      </div>
      <MainPosts textbox={false} posts={posts} />
    </div>
  );
};
export default UserPage;
