import { Toaster } from 'sonner';

import { getUserByEmail, getUsers } from '@/actions/UsersActions';
import { auth } from '@/lib/auth';
import { IPost } from '@/models/posts';
import { IProfile } from '@/models/profiles';

import { Post } from './post/Post';
import { TextBox } from './TextBox';

export const PostsContainer = async ({
  posts,
  textbox = true,
    linkedTo = null
}: {
  posts: IPost[];
  textbox?: boolean;
  linkedTo?: string | null;
}) => {
  const profiles: IProfile[] = JSON.parse(
    JSON.stringify(await (await getUsers()).json())
  );
  const session = await auth();
  const user: IProfile = JSON.parse(
    JSON.stringify(
      await (await getUserByEmail(session?.user?.email ?? "")).json()
    )
  );
  console.log()
  console.log("mano o perfil logado eh ",user)
  console.log()
  return (
    <div className="flex flex-col h-full max-xl:border-0 gap-2 pl-3 pr-3 border-rebeccapurple2 border-r-2 border-l-2">
      {textbox && <TextBox profile={user} linkedTo={linkedTo} />}
      <Toaster richColors />
      {posts!.map((post) => (
        <Post
            userId={user._id}
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
