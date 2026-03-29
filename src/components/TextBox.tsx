"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { addPost } from "@/api/post.actions";
import { Assets } from "@/assets";
import type { CreatePostDTO } from "@/models/post.model";
import type { User } from "@/models/user.model";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

interface Props {
	linkedTo: string | null;
	profile: User;
}

export const TextBox = ({ linkedTo = null, profile }: Props) => {
	const router = useRouter();
	const input = useRef<HTMLTextAreaElement>(null);

	async function handleClick() {
		if (input.current == null || input.current.value.trim() === "") {
			return;
		}

		const newPost: CreatePostDTO = {
			user_id: profile.id,
			content: input.current.value,
			linked_to: linkedTo,
		};
		input.current.value = "";
		await addPost(newPost);
		router.refresh();
	}

	return (
		<div className="flex w-full flex-col border-rebeccapurple2 border-b-2 pr-3 pb-10 pl-3 align-middle">
			<div className="flex w-full flex-row items-center gap-8">
				<Avatar className="h-12 w-12 rounded-full">
					<AvatarImage src={profile?.avatarUrl ?? Assets.images.shyDog} />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>

				<textarea
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							handleClick();
						}
					}}
					ref={input}
					className="w-full resize-none content-center border-none bg-transparent py-5 text-white outline-none"
					name="text"
					maxLength={400}
					placeholder={`${
						linkedTo ? "O que acha disso" : "No que voce está pensando"
					} ${profile.name}?`}
				></textarea>
			</div>
			<div className="h-fit w-fit self-end justify-self-end">
				<Button
					onClick={handleClick}
					className="h-full w-full rounded-full bg-rebeccapurple2 font-bold hover:bg-rebeccapurple"
				>
					POST
				</Button>
			</div>
		</div>
	);
};
