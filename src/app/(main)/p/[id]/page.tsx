import { auth } from '@/lib/auth';
import { IPost } from '@/models/post.model';
import { PostPage } from '@/components/pages/post-page';
import { getUserByEmail, getUsers } from '@/api/user.queries';
import { getPostById } from '@/api/post.queries';
import { EntityNotFoundException } from '@/exceptions';
import { notFound } from 'next/navigation';
import { logger } from '@/lib/logger';

interface Props {
  params: Promise<{
    id: string;
  }>;
};

const Post = async ({params}: Props) => {
  const { id } = await params;

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

  const users = await getUsers()

  return (
    <PostPage
      users={users}
      currentUser={user}
      post={post}
      postChildren={children}
      owner={user}
      userId={session?.user?.id!}
    />
  );
};

//Todo: fazer fetchs separados, para deixar a pagina carregar sem esperar pelos comentarios
export default Post;
