import { Header } from "@/components/Header";
import { PostsContainer } from "@/components/PostsContainer";
import { UserProfile } from "@/components/user/UserProfile";
import type { IPost } from "@/models/post.model";
import type { User } from "@/models/user.model";

type Props = {
	currentUser: User;
	profile: User;
	profilePosts: IPost[];
	isProfileOfLoggerUser: boolean;
};

export function UserDetailPage(props: Props) {
	return (
		<div className="flex flex-col h-full max-xl:border-0 gap-2 pl-3 pr-3 border-rebeccapurple2 border-r-2 border-l-2">
			<Header title={props.profile.username} />
			<div className="max-sm:mt-12 ">
				<UserProfile
					postsCount={props.profilePosts.length}
					user={props.profile}
					isTheLoggedUser={props.isProfileOfLoggerUser}
				/>
				<PostsContainer
					currentUser={props.currentUser}
					textbox={false}
					posts={props.profilePosts}
					users={[props.profile]}
				/>
			</div>
		</div>
	);
}
