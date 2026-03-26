"use server";

import { getUserByEmail } from "@/api/user.queries";
import { Assets } from "@/assets";
import { auth } from "@/lib/auth";
import type { User } from "@/models/user.model";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { UserProfileTag } from "../user/UserProfileTag";
import { DesktopLogoutMenu } from "./DesktopLogoutMenu";
import { LaborasLogo } from "./LaborasLogo";
import { Links } from "./Links";

export const AsideMyProfile = async () => {
	const session = await auth();
	const currentUserProfile: User = await getUserByEmail(session?.user?.email!);

	return (
		<>
			<div
				className="fixed top-0 left-0 z-1 flex min-h-screen w-72 flex-col justify-between overflow-x-hidden border-rebeccapurple2 max-md:hidden max-xl:w-fit max-xl:border-gray-700 max-xl:border-r-[1px] xl:p-5"
			>
				<div className="flex h-screen w-full flex-col items-center justify-between p-5 pb-7 text-5xl">
					<div className="flex h-full flex-col items-center gap-8">
						<div className="flex flex-col items-center gap-4">
							<LaborasLogo />
							<Separator />
						</div>

						<div className="flex w-full flex-col gap-4 text-5xl">
							<Links
								username={currentUserProfile.username}
								avatarLink={
									currentUserProfile.profile_image_link ?? Assets.images.shyDog
								}
							/>
						</div>
					</div>
					<DesktopLogoutMenu>
						<UserProfileTag user={currentUserProfile} />
					</DesktopLogoutMenu>
				</div>
				<Avatar className="h-12 w-12 cursor-pointer rounded-full xl:hidden">
					<AvatarImage
						src={currentUserProfile?.profile_image_link ?? Assets.images.shyDog}
					/>
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</div>
			<Links
				footer
				username={currentUserProfile.username}
				avatarLink={
					currentUserProfile.profile_image_link ?? Assets.images.shyDog
				}
			/>
		</>
	);
};
