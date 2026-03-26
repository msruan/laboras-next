import { Header } from '@/components/Header';
import { PostCard } from '@/components/post/Post';
import { PostsContainer } from '@/components/PostsContainer';
import { IPost } from '@/models/post.model';
import { User } from '@/models/user.model';

type Props = {
  userId: string;
  owner: User;
  post: IPost;
  postChildren: IPost[]
  currentUser: User;
  users: User[]
};

export function PostPage({ postChildren, post, owner, userId, currentUser, users }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <Header title="Post" />
      <div className="max-sm:mt-8">
        <PostCard
          userId={userId}
          owner={owner}
          postContent={post}
          fullPage={true}
          fullBorder={false}
        />
        <PostsContainer currentUser={currentUser} users={users} linkedTo={post._id} posts={postChildren} />
      </div>
    </div>
  );
};
