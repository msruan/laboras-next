import { Header } from "@/components/Header";
import { PostsContainer } from "@/components/PostsContainer";
import { UserProfile } from "@/components/user/UserProfile";
import type { Post } from "@/models/post.model";
import type { User } from "@/models/user.model";

type Props = {
	currentUser: User;
	user: User;
	userPosts: Post[];
};

export function UserDetailPage(props: Props) {
	const isProfileOfLoggerUser = props.currentUser.id === props.user.id;
	return (
		<div className="flex h-full flex-col gap-2 border-rebeccapurple2 border-r-2 border-l-2 pr-3 pl-3 max-xl:border-0">
			<Header
				title={props.user.username}
				showConfigLink={isProfileOfLoggerUser}
			/>
			<div className="max-sm:mt-12">
				<UserProfile
					postsCount={props.userPosts.length}
					user={props.user}
					isTheLoggedUser={isProfileOfLoggerUser}
				/>
				<PostsContainer
					currentUser={props.currentUser}
					textbox={false}
					posts={props.userPosts}
				/>
			</div>
		</div>
	);
}
