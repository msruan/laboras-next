import { FC } from 'react';

import { Header } from '@/components/Header';
import Post from '@/components/post/Post';
import { PostsContainer } from '@/components/PostsContainer';
import { api } from '@/config/api';
import { auth } from '@/lib/auth';
import { IPost } from '@/models/posts';
import { IProfile } from '@/models/profiles';

type Props = {
  params: {
    id: string;
  };
};

const PostPage: FC<Props> = async ({ params }) => {
  const session = await auth();
  const { id } = params;
  const response = await api.get("/posts/" + id);
  const post: IPost = response.data.post;
  const profile: IProfile = (await api.get("/profiles/id/" + post.user_id))
    .data;
  const children: IPost[] = response.data.children;
  // console.log("perfil : : : : : : :     : : : : : :: : : : : : : : ");
  // console.log(profile);
  // console.log("post : : : : : : :     : : : : : :: : : : : : : : ");
  // console.log(post);

  //   let relationedPosts: IPost[] | undefined;

  return (
    <div className="flex flex-col gap-2">
      <Header title="Post" />
      <div className="max-sm:mt-8">
        <Post
          userId={session?.user?.id!}
          perfil={profile}
          post={post}
          fullPage={true}
          fullBorder={false}
        />
        <PostsContainer linkedTo={post._id} posts={children} />
      </div>
    </div>
  );
};
//Todo: fazer fetchs separados, para deixar a pagina carregar sem esperar pelos comentarios
export default PostPage;
