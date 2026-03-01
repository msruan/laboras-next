import { FC } from 'react';

import { auth } from '@/lib/auth';
import { IPost } from '@/models/post.model';
import { PostPage } from '@/components/pages/post-page';
import { getUserByEmail, getUsers } from '@/api/user.queries';
import { getPostById } from '@/api/post.queries';

type Props = {
  params: {
    id: string;
  };
};

const Post: FC<Props> = async ({ params }) => {
  const { id } = params;

  const response = await getPostById(id);

  const post: IPost = response.post;
  const children: IPost[] = response.children;

  const session = await auth();
  const user = await getUserByEmail(session?.user?.email!)

  const profiles = await getUsers()

  return (
    <PostPage
      profiles={profiles}
      currentUser={user}
      post={post}
      postChildren={children}
      profile={user}
      userId={session?.user?.id!}
    />
  );
};
//Todo: fazer fetchs separados, para deixar a pagina carregar sem esperar pelos comentarios
export default Post;
