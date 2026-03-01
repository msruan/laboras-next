import { Header } from '@/components/Header';
import { PostCard } from '@/components/post/Post';
import { PostsContainer } from '@/components/PostsContainer';
import { IPost } from '@/models/post.model';
import { IProfile } from '@/models/profile.model';

type Props = {
  userId: string;
  profile: IProfile;
  post: IPost;
  postChildren: IPost[]
  currentUser: IProfile;
  profiles: IProfile[]
};

export function PostPage({ postChildren, post, profile, userId, currentUser, profiles }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <Header title="Post" />
      <div className="max-sm:mt-8">
        <PostCard
          userId={userId}
          ownerProfile={profile}
          postContent={post}
          fullPage={true}
          fullBorder={false}
        />
        <PostsContainer currentUser={currentUser} profiles={profiles} linkedTo={post._id} posts={postChildren} />
      </div>
    </div>
  );
};
