import { Header } from "@/components/Header";
import { PostsContainer } from "@/components/PostsContainer";
import { PostCard } from "@/components/post/PostCard";
import type { Post } from "@/models/post.model";
import type { User } from "@/models/user.model";

type Props = {
	userId: string;
	post: Post;
	replies: Post[];
	currentUser: User;
};

export function PostDetailPage({ replies, post, userId, currentUser }: Props) {
	return (
		<div className="flex flex-col gap-2">
			<Header title="Post" />
			<div className="max-sm:mt-8">
				<PostCard
					currentUserId={userId}
					post={post}
					fullPage={true}
					fullBorder={false}
				/>
				<PostsContainer
					currentUser={currentUser}
					linkedTo={post.id}
					posts={replies}
				/>
			</div>
		</div>
	);
}
