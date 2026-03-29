import { Header } from "@/components/Header";
import { PostsContainer } from "@/components/PostsContainer";
import { UserProfile } from "@/components/user/UserProfile";
import type { Post } from "@/models/post.model";
import type { User } from "@/models/user.model";

type Props = {
	currentUser: User;
	profile: User;
	profilePosts: Post[];
	isProfileOfLoggerUser: boolean;
};

export function UserDetailPage(props: Props) {
	return (
		<div className="flex h-full flex-col gap-2 border-rebeccapurple2 border-r-2 border-l-2 pr-3 pl-3 max-xl:border-0">
			<Header
				title={props.profile.username}
				showConfigLink={props.isProfileOfLoggerUser}
			/>
			<div className="max-sm:mt-12">
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
