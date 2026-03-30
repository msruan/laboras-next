"use client";

import { HomeIcon as HomeIconFilled } from "@heroicons/react/16/solid";
import { HomeIcon as HomeIconEmpty } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export function SidebarLinks({
	username,
	avatarLink,
}: {
	username: string;
	avatarLink: string;
}) {
	const pathname = usePathname();

	const HomeIcon = pathname === "/" ? HomeIconFilled : HomeIconEmpty;

	return (
		<div
			className={cn(
				"flex w-full justify-between",
				"sm:static sm:flex-col sm:items-start sm:bg-transparent sm:px-0",
			)}
		>
			<Link href={"/"} className="w-full">
				<Button className="flex w-full items-center justify-start gap-4 rounded-full bg-transparent font-bold text-lg text-white transition-all duration-200 hover:bg-rebeccapurple max-xl:justify-center max-xl:p-0 max-xl:pb-2">
					<HomeIcon className="mr-1 h-8 w-8 text-biancapurple max-xl:mr-0" />
					<span className="text-biancapurple max-xl:hidden">Home</span>
				</Button>
			</Link>

			<Link href={`/u/${username}`} className="w-full">
				<Button className="flex h-fit w-full items-center justify-start gap-4 rounded-full bg-transparent p-1 pr-7 font-bold text-lg text-white transition-all duration-200 hover:bg-rebeccapurple max-xl:justify-center max-xl:p-0 max-xl:pb-2 xl:pl-3">
					<Avatar className="mr-1 h-8 w-8 max-xl:mr-0">
						<AvatarImage src={avatarLink} />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<span className="ml-1 text-biancapurple max-xl:hidden">Perfil</span>
				</Button>
			</Link>
		</div>
	);
}
