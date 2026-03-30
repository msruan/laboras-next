import { Toaster } from "sonner";

import type { Post } from "@/models/post.model";
import type { User } from "@/models/user.model";

import { PostCard } from "./post/PostCard";
import { TextBox } from "./TextBox";

interface Props {
	currentUser: User;
	posts: Post[];
	textbox?: boolean;
	linkedTo?: string | null;
}

export function PostsContainer({
	currentUser,
	posts,
	linkedTo = null,
	textbox = true,
}: Props) {
	return (
		<div className="flex h-full flex-col gap-2 border-rebeccapurple2 border-r-2 border-l-2 pr-3 pl-3 max-xl:border-0">
			<Toaster richColors />

			{textbox && <TextBox currentUser={currentUser} linkedTo={linkedTo} />}

			{posts.map((post) => (
				<PostCard
					currentUserId={currentUser.id}
					key={post.id}
					post={post}
					fullPage={false}
					fullBorder={true}
				/>
			))}
		</div>
	);
}
