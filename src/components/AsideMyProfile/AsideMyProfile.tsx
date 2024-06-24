"use server"
import Link from 'next/link';

import { api } from '@/config/api';
import { IProfile } from '@/models/profiles';
import { CogIcon as CogIconFilled, HomeIcon as HomeIconFilled, UserCircleIcon as UserCircleIconFilled } from '@heroicons/react/16/solid';
import { CogIcon, HomeIcon, UserCircleIcon } from '@heroicons/react/24/outline';

import { ProfileTag } from '../profile/ProfileTag';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import {NavbarIcon} from "@/components/AsideMyProfile/NavbarIcon";
import {auth} from "@/lib/auth";


export const AsideMyProfile = async () => {
  const session = await auth()
  console.table(session)
  const perfil: IProfile = (await api.get("/profiles/email/"+session?.user?.email)).data;
  console.log("mano supostamente o perfil eh ")
  console.table(perfil)
  return (
    <div
      className={`flex flex-col max-xl:border-r-[1px] max-xl:border-gray-700  border-rebeccapurple2 xl:p-5 justify-between fixed top-0 left-0 min-h-screen overflow-x-hidden max-xl:w-fit max-md:hidden w-72 z-1`}
    >
      {/*<style>*/}
      {/*  {`*/}
      {/*          h2 {*/}
      {/*            font-family: 'Habbo', sans-serif;*/}
      {/*            text-shadow: 2px 2px 15px rebeccapurple*/}
      {/*          }*/}
      {/*        dd`}*/}
      {/*</style>*/}

      <div className="flex flex-col items-center justify-between w-full  h-screen p-5 text-5xl pb-7">
        <div className="flex flex-col items-center h-full gap-8">
          <div className="flex flex-col items-center gap-4">
            <Link href={"/posts"}>
              <h2 className="max-xl:hidden">LABORAS</h2>
            </Link>
            <h2 className="xl:hidden">L</h2>
            <Separator></Separator>
          </div>

          <div className="flex flex-col w-full gap-4 text-5xl ">
            {/*<NavbarIcon title={"Home"} icon={HomeIcon} iconFilled={HomeIconFilled} href="/" />*/}
            {/*<NavbarIcon title="Profile" icon={UserCircleIcon} iconFilled={UserCircleIconFilled} href={`/u/${perfil?.username}`} />*/}
            {/*<NavbarIcon title="Settings" icon={CogIcon} iconFilled={CogIconFilled} href="/config"/>*/}
          </div>
        </div>
        <ProfileTag perfil={perfil!} />
        <Avatar className="w-12 xl:hidden h-12 rounded-full cursor-pointer">
          <AvatarImage
            src={perfil?.profile_image_link ?? "src/assets/chorro-timido.JPG"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
