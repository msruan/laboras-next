import { FC } from 'react';

import { api } from '@/config/api';
import { auth } from '@/lib/auth';
import { IPost } from '@/models/post.model';
import { IProfile } from '@/models/profile.model';
import { PostPage } from '@/components/pages/post-page';
import { getUserByEmail, getUsers } from '@/api/user.queries';

type Props = {
  params: {
    id: string;
  };
};

const Post: FC<Props> = async ({ params }) => {
  const { id } = params;

  const response = await api.get("/posts/" + id);

  const post: IPost = response.data.post;
  const profile: IProfile = (await api.get("/profiles/id/" + post.user_id))
    .data;
  const children: IPost[] = response.data.children;

  const session = await auth();
  const user = await getUserByEmail(session?.user?.email!)

  const profiles = await getUsers()

  return (
    <PostPage
      profiles={profiles}
      currentUser={user}
      post={post}
      postChildren={children}
      profile={profile}
      userId={session?.user?.id!}
    />
  );
};
//Todo: fazer fetchs separados, para deixar a pagina carregar sem esperar pelos comentarios
export default Post;
