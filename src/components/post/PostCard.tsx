"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { updatePost as handleUpdate } from "@/api/post.actions";
import { Assets } from "@/assets";
import { cn } from "@/lib/utils";
import type { Post } from "@/models/post.model";
import type { User } from "@/models/user.model";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardFooter } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Icons } from "./Icons";
import { PostContent } from "./PostContent";
import { PostMenu } from "./PostMenu";

interface PostProps {
	userId: string;
	postContent: Post;
	owner: User;
	fullPage: boolean;
	fullBorder: boolean;
}

export const PostCard = ({
	postContent: post,
	owner,
	fullPage = false,
	userId,
	fullBorder = false,
}: PostProps) => {
	const [editMode, setEditMode] = useState(false);
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const local = usePathname();
	const router = useRouter();

	async function handleSaveEdit() {
		if (
			textareaRef.current !== null &&
			textareaRef.current.value !== post.content
		) {
			setEditMode(!editMode);
			toast.promise(
				handleUpdate({
					_id: post._id,
					data: { content: textareaRef.current.value },
				}),
				{
					loading: "Atualizando post...",
					success: (_data) => {
						router.refresh();
						return `Post atualizado!`;
					},
					error: "Erro ao atualizar post!",
				},
			);
		} else setEditMode(!editMode);
	}

	const onClick = () => {
		const link = `/p/${post._id}` as const;
		if (local !== link) {
			router.push(link);
		}
	};

	return (
		<Card
			className={cn("flex flex-col", {
				"cursor-pointer": fullPage,
				"bg-transparent": fullPage || editMode,
				"h-full bg-rebeccapurple": !(fullPage || editMode),
				"rounded-none border-t-0 border-r-0 border-b-0 border-l-0": editMode,
				"border-purple-400": !editMode && fullBorder,
				"rounded-none border-t-0 border-r-0 border-b-purple-400 border-l-0":
					!editMode && !fullBorder,
			})}
		>
			{editMode ? (
				<div className="flex h-full w-full flex-col items-center justify-center gap-2 border-t-0 border-r-0 border-b-0 border-l-0">
					<Textarea
						defaultValue={post.content}
						ref={textareaRef}
						autoFocus={true}
						className="w-noavatar bg-rebeccapurple"
						placeholder="Edit your message here."
						id={`post-${post._id}`}
					></Textarea>
					<Button onClick={handleSaveEdit} variant="ghost">
						Salvar
					</Button>
				</div>
			) : (
				<>
					<div className="flex h-fit w-full pt-3 pr-3 pl-5">
						<Link href={`/u/${owner?.username}`}>
							<Avatar className="h-12 w-12 rounded-full">
								<AvatarImage
									src={owner?.avatarUrl ?? Assets.images.soccerPlayer}
								/>
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</Link>

						<PostContent
							onClick={onClick}
							userId={userId}
							owner={owner}
							post={post}
							fullPage={fullPage}
							handleEdit={setEditMode}
						/>
					</div>
					{!fullPage && (
						<CardFooter className="flex h-fit items-center justify-end">
							<div className="flex h-fit w-1/4 flex-row justify-between pr-7 pb-1 max-md:w-full">
								<Icons userId={userId} post={post} fullPage={fullPage}></Icons>
								{userId === post.user_id && (
									<PostMenu handleEdit={setEditMode} postId={post._id} />
								)}
							</div>
						</CardFooter>
					)}
				</>
			)}
		</Card>
	);
};
