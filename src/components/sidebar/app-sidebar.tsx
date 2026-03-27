"use server";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { getUserByEmail } from "@/api/user.queries";
import { Assets } from "@/assets";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import type { User } from "@/models/user.model";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { LaborasLogo } from "./laboras-logo";
import { LogoutMenu } from "./logout-menu";
import { SidebarLinks } from "./sidebar-links";

export const AppSidebar = async () => {
	const session = await auth();
	const currentUserProfile: User = await getUserByEmail(
		session?.user?.email ?? "",
	);

	return (
		<div
			className={cn(
				"fixed bottom-0 flex w-full items-center justify-between border-rebeccapurple2 border-r-[1px] bg-black px-10 py-5",
				"sm:top-0 sm:left-0 sm:z-1 sm:min-h-screen sm:w-28 sm:flex-col sm:bg-transparent xl:w-72",
			)}
		>
			<div className="flex w-full flex-col gap-12">
				<div className="space-y-4 max-sm:hidden">
					<LaborasLogo />
					<Separator />
				</div>
				<SidebarLinks
					username={currentUserProfile.username}
					avatarLink={
						currentUserProfile.profile_image_link ?? Assets.images.shyDog
					}
				/>
			</div>
			<div className="hidden w-full sm:block">
				<LogoutMenu>
					<Button className="flex w-full items-center justify-start rounded-full bg-transparent font-bold">
						<HamburgerMenuIcon className="h-8 w-8" />
						<span className="ml-6 hidden xl:inline-block">Mais</span>
					</Button>
				</LogoutMenu>
			</div>
		</div>
	);
};
