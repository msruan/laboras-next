import Link from "next/link";
import { Assets } from "@/assets";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/models/user.model";
import { Card, CardContent } from "../ui/card";

export const UserProfileTag = ({ user }: { user: User }) => {
	return (
		<Link className="w-full max-xl:hidden" href={`/u/${user.username}`}>
			<Card className="flex w-full gap-4 rounded-full border-0 bg-rebeccapurple2 p-2 transition-all duration-150 hover:bg-rebeccapurple">
				<Avatar className="h-12 w-12 cursor-pointer rounded-full">
					<AvatarImage src={user.avatarUrl ?? Assets.images.shyDog} />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<CardContent className="flex items-center justify-center gap-5 break-all p-0">
					<div className="flex flex-col items-start gap-0.5 text-aliceblue text-sm">
						<h3>
							<strong>{user?.name}</strong>
						</h3>
						<h4 className="opacity-70">@{user?.username}</h4>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};
