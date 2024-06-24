import { getPosts } from '@/actions/PostActions';
import {getUserByEmail, getUsers} from '@/actions/UsersActions';
import { IPost } from '@/models/posts';
import { IProfile } from '@/models/profiles';

import { Post } from './post/Post';
import { TextBox } from './TextBox';
import {auth} from "@/lib/auth";

export const MainPosts = async () => {
  const posts: IPost[] = JSON.parse(JSON.stringify(await getPosts()));
  const profiles: IProfile[] = JSON.parse(JSON.stringify(await (await getUsers()).json()));
  const session = await auth();
  const perfil: IProfile = JSON.parse(JSON.stringify(await (await getUserByEmail(session?.user?.email ?? "")).json()));
  return (
    <div className="flex flex-col h-full max-xl:border-0 gap-2 pl-3 pr-3 border-rebeccapurple2 border-r-2 border-l-2">
      <TextBox profile={perfil} linkedTo={null} />
      {posts!.map((post) => (
        <Post
          key={post._id}
          post={post}
          fullPage={false}
          fullBorder={true}
          perfil={profiles.find((profile) => profile._id === post.user_id)!}
        />
      ))}
    </div>
  );
};