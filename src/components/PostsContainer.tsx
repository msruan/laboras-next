import { Toaster } from 'sonner';

import { IPost } from '@/models/post.model';
import { IProfile } from '@/models/profile.model';

import { PostCard } from './post/Post';
import { TextBox } from './TextBox';

interface Props {
  currentUser: IProfile;
  profiles: IProfile[];
  posts: IPost[];
  textbox?: boolean;
  linkedTo?: string | null;
}

export function PostsContainer({
  currentUser, posts, profiles, linkedTo = null, textbox = true
}: Props) {
  return (
    <div className="flex flex-col h-full max-xl:border-0 gap-2 pl-3 pr-3 border-rebeccapurple2 border-r-2 border-l-2">
      <Toaster richColors />

      {textbox && <TextBox profile={currentUser} linkedTo={linkedTo} />}

      {posts!.map((post) => (
        <PostCard
          userId={currentUser._id}
          key={post._id}
          postContent={post}
          fullPage={false}
          fullBorder={true}
          ownerProfile={profiles.find((profile) => profile._id === post.user_id)!} />
      ))}
    </div>
  );
}
