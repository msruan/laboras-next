import { Header } from '@/components/Header';
import { PostsContainer } from '@/components/PostsContainer';
import { Profile } from '@/components/profile/Profile';
import { IPost } from '@/models/posts';
import { IProfile } from '@/models/profiles';

type Props = {
  profile: IProfile;
  profilePosts: IPost[];
  isProfileOfLoggerUser: boolean;
};

function UserPage(props: Props) {
  return (
    <div className="flex flex-col h-full max-xl:border-0 gap-2 pl-3 pr-3 border-rebeccapurple2 border-r-2 border-l-2">
      <Header title={props.profile.username} />
      <div className="max-sm:mt-12 ">
        <Profile
          postsCount={props.profilePosts.length}
          profile={props.profile}
          isProfileOfLoggerUser={props.isProfileOfLoggerUser}
        />
        <PostsContainer textbox={false} posts={props.profilePosts} />
      </div>
    </div>
  );
};
export default UserPage;
