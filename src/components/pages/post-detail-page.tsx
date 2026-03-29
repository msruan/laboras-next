import { Header } from "@/components/Header";
import { PostsContainer } from "@/components/PostsContainer";
import { PostCard } from "@/components/post/PostCard";
import type { Post } from "@/models/post.model";
import type { User } from "@/models/user.model";

type Props = {
	userId: string;
	owner: User;
	post: Post;
	postChildren: Post[];
	currentUser: User;
	users: User[];
};

export function PostDetailPage({
	postChildren,
	post,
	owner,
	userId,
	currentUser,
	users,
}: Props) {
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
				<PostsContainer
					currentUser={currentUser}
					users={users}
					linkedTo={post._id}
					posts={postChildren}
				/>
			</div>
		</div>
	);
}
