import { FC } from 'react';

import { auth } from '@/lib/auth';
import { IPost } from '@/models/post.model';
import { PostPage } from '@/components/pages/post-page';
import { getUserByEmail, getUsers } from '@/api/user.queries';
import { getPostById } from '@/api/post.queries';
import { EntityNotFoundException } from '@/exceptions';
import { notFound } from 'next/navigation';
import { logger } from '@/lib/logger';

type Props = {
  params: {
    id: string;
  };
};

const Post: FC<Props> = async ({ params }) => {
  const { id } = params;

  let response;

  try {
    response = await getPostById(id);
  } catch (err) {
    logger.error(String(err));

    if (err instanceof EntityNotFoundException) {
      notFound();
    }
    throw err;
  }


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
