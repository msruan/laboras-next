import { Toaster } from "sonner";

import type { IPost } from "@/models/post.model";
import type { User } from "@/models/user.model";

import { PostCard } from "./post/PostCard";
import { TextBox } from "./TextBox";

interface Props {
	currentUser: User;
	users: User[];
	posts: IPost[];
	textbox?: boolean;
	linkedTo?: string | null;
}

export function PostsContainer({
	currentUser,
	posts,
	users,
	linkedTo = null,
	textbox = true,
}: Props) {
	return (
		<div className="flex h-full flex-col gap-2 border-rebeccapurple2 border-r-2 border-l-2 pr-3 pl-3 max-xl:border-0">
			<Toaster richColors />

			{textbox && <TextBox profile={currentUser} linkedTo={linkedTo} />}

			{posts.map((post) => (
				<PostCard
					userId={currentUser.id}
					key={post._id}
					postContent={post}
					fullPage={false}
					fullBorder={true}
					owner={users.find((profile) => profile.id === post.user_id)!}
				/>
			))}
		</div>
	);
}
