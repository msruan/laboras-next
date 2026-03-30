import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";

import useClient from "@/hooks/use-client";
import { cn } from "@/lib/utils";
import type { Post } from "@/models/post.model";
import { CardContent } from "../ui/card";
import { Icons } from "./Icons";
import { PostMenu } from "./PostMenu";

interface Props {
	userId: string;
	post: Post;
	fullPage: boolean;
	onClick: () => void;
	handleEdit: (value: boolean) => void;
}

export function PostContent({
	userId,
	post,
	fullPage,
	handleEdit,
	onClick,
}: Props) {
	const isClient = useClient();
	return (
		<CardContent
			onClick={onClick}
			className="flex w-full flex-col justify-between break-all"
		>
			<div className="flex flex-col gap-4">
				<div className="flex items-center justify-between max-sm:flex-col max-sm:items-start">
					<Link
						href={post.owner ? `/u/${post.owner?.username}` : "#"}
						className={cn(
							"flex items-start gap-2 text-aliceblue text-sm",
							fullPage && "flex-col gap-0",
						)}
					>
						<h3>{post.owner?.name}</h3>
						<h4 className="opacity-70">@{post.owner?.username}</h4>
					</Link>
					{!fullPage && (
						<span className={"text-xs opacity-50"}>
							há{" "}
							{isClient &&
								formatDistanceToNow(post?.createdAt, { locale: ptBR })}
						</span>
					)}
				</div>
				<div className="w-full font-sans text-aliceblue text-base">
					<p>{post?.content}</p>
				</div>
			</div>
			{fullPage && (
				<footer className="mt-10 flex items-center border-t-purple-50 text-white text-xs opacity-70">
					<p className="w-3/4">
						Data de publicação: {new Date(post.createdAt).toLocaleString()}
					</p>
					<div className="flex h-fit w-1/4 flex-row justify-between pr-7 pb-1">
						<Icons userId={userId} post={post} />
						{post.owner && userId && userId === post.owner.id && (
							<PostMenu handleEdit={handleEdit} postId={post.id} />
						)}
					</div>
				</footer>
			)}
		</CardContent>
	);
}
