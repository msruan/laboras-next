"use server";

import { auth } from "@/lib/auth";
import { User } from "@/models/user.model";
import { Links } from "./Links";
import { UserProfileTag } from "../user/UserProfileTag";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { getUserByEmail } from "@/api/user.queries";
import { DesktopLogoutMenu } from "./DesktopLogoutMenu";
import { Assets } from "@/assets";
import { LaborasLogo } from "./LaborasLogo";

export const AsideMyProfile = async () => {
  const session = await auth();
  const currentUserProfile: User = await getUserByEmail(session?.user?.email!);

  return (
    <>
      <div
        className={`flex flex-col max-xl:border-r-[1px] max-xl:border-gray-700 border-rebeccapurple2 xl:p-5 justify-between fixed top-0 left-0 min-h-screen overflow-x-hidden max-xl:w-fit max-md:hidden w-72 z-1`}
      >
        <div className="flex flex-col items-center justify-between w-full  h-screen p-5 text-5xl pb-7">
          <div className="flex flex-col items-center h-full gap-8">
            <div className="flex flex-col items-center gap-4">
              <LaborasLogo/>
              <Separator />
            </div>

            <div className="flex flex-col w-full gap-4 text-5xl ">
              <Links
                username={currentUserProfile.username}
                avatarLink={currentUserProfile.profile_image_link ?? Assets.images.shyDog}
              />
            </div>
          </div>
          <DesktopLogoutMenu>
            <UserProfileTag user={currentUserProfile} />
          </DesktopLogoutMenu>

        </div>
        <Avatar className="w-12 xl:hidden h-12 rounded-full cursor-pointer">
          <AvatarImage
            src={currentUserProfile?.profile_image_link ?? Assets.images.shyDog}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <Links
        footer
        username={currentUserProfile.username}
        avatarLink={currentUserProfile.profile_image_link ?? Assets.images.shyDog}
      />
    </>
  );
};
