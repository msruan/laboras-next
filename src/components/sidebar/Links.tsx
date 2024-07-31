"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Logout } from "@/services/auth";
import { CogIcon, HomeIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import {
  CogIcon as CogIconFilled,
  HomeIcon as HomeIconFilled,
  UserCircleIcon as UserCircleIconFilled,
} from "@heroicons/react/16/solid";
export function Links({
  username,
  avatarLink,
  footer = false,
}: {
  footer?: boolean;
  username: string;
  avatarLink: string;
}) {
  const pathname = usePathname();
  const localIsHome = pathname === "/";
  const localIsUser = pathname === `/u/${username}`;
  //   const localIsConfig = pathname === "/config";
  const router = useRouter();
  const handleClik = () => {
    Logout().then(() => router.replace("/sign"));
  };
  return (
    <>
      <div
        className={
          "max-md:fixed max-md:bottom-0 flex md:flex-col md:h-full items-center justify-between w-full p-4 text-5xl font-sans font-bold " +
          (footer ? "md:hidden bg-black px-10" : "")
        }
      >
        <Link href="/">
          <Button className=" flex items-center max-xl:p-0 max-xl:pb-2 max-xl:justify-center justify-start w-full gap-4 p-1 xl:pl-3 text-lg font-bold text-white transition-all duration-200 bg-transparent rounded-full h-fit pr-7 hover:bg-rebeccapurple">
            {localIsHome ? (
              <>
                <HomeIconFilled className="w-8 max-xl:mr-0 h-8 mr-1 text-biancapurple" />
              </>
            ) : (
              <HomeIcon className="w-8 max-xl:mr-0 h-8 mr-1 text-biancapurple" />
            )}
            <span className="max-xl:hidden ml-2  text-biancapurple">Home</span>
          </Button>
        </Link>
        <Link href={`/u/${username}`}>
          <Button className="md:mt-3 flex items-center max-xl:p-0 max-xl:pb-2 max-xl:justify-center justify-start w-full gap-4 p-1 xl:pl-3 text-lg font-bold text-white transition-all duration-200 bg-transparent rounded-full h-fit pr-7 hover:bg-rebeccapurple">
            {localIsUser ? (
              <>
                <UserCircleIconFilled className="w-8 max-xl:mr-0 h-8 mr-1 text-biancapurple" />
              </>
            ) : (
              <UserCircleIcon className="w-8 max-xl:mr-0 h-8 mr-1 text-biancapurple" />
            )}
            <span className="max-xl:hidden ml-2  text-biancapurple">
              Profile
            </span>
          </Button>
        </Link>
        {/* <Link href="/config">
          {localIsConfig ? (
            <CogIconFilled className="w-8 h-8 text-biancapurple" />
          ) : (
            <CogIcon className="w-8 h-8 text-biancapurple" />
          )}
        </Link> */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="w-8 h-8 md:hidden rounded-full cursor-pointer">
              <AvatarImage src={avatarLink ?? "src/assets/chorro-timido.JPG"} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Button onClick={handleClik}>Sair</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
