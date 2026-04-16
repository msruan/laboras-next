"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Assets } from "@/assets";
import { cn } from "@/lib/utils";
import type { Post } from "@/models/post.model";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardFooter } from "../ui/card";
import { Icons } from "./Icons";
import { PostContent } from "./PostContent";
import { PostMenu } from "./PostMenu";

interface PostProps {
	currentUserId: string;
	post: Post;
	fullPage: boolean;
	fullBorder: boolean;
}

export const PostCard = ({
	post,
	fullPage = false,
	currentUserId,
	fullBorder = false,
}: PostProps) => {
	const local = usePathname();
	const router = useRouter();

	const onClick = () => {
		const link = `/p/${post.id}` as const;
		if (local !== link) {
			router.push(link);
		}
	};

	return (
		<Card
			className={cn("flex flex-col", {
				"cursor-pointer": fullPage,
				"bg-transparent": fullPage,
				"h-full bg-rebeccapurple": !fullPage,
				"border-purple-400": fullBorder,
				"rounded-none border-t-0 border-r-0 border-b-purple-400 border-l-0":
					!fullBorder,
			})}
		>
			<div className="flex h-fit w-full pt-3 pr-3 pl-5">
				<Link tabIndex={-1} href={`/u/${post.owner?.username}`}>
					<Avatar className="h-12 w-12 rounded-full">
						<AvatarImage
							src={post.owner?.avatarUrl ?? Assets.images.soccerPlayer}
						/>
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</Link>

				<PostContent
					onClick={onClick}
					userId={currentUserId}
					post={post}
					fullPage={fullPage}
				/>
			</div>
			{!fullPage && (
				<CardFooter className="flex h-fit items-center justify-end">
					<div className="flex h-fit w-1/4 flex-row justify-between pr-7 pb-1 max-md:w-full">
						<Icons userId={currentUserId} post={post} />
						{currentUserId === post.owner?.id && <PostMenu postId={post.id} />}
					</div>
				</CardFooter>
			)}
		</Card>
	);
};
