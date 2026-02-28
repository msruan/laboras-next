"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { logoutAction } from '@/api/auth.actions';
import { LogOut as LogoutIcon } from "lucide-react"
import { HomeIcon as HomeIconEmpty, UserCircleIcon as UserIconEmpty } from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconFilled,
  UserCircleIcon as UserIconFilled,
} from "@heroicons/react/16/solid";
import { Separator } from "../ui/separator";

export function Links({
  username,
  avatarLink,
  footer = false,
}: {
  footer?: boolean;
  username: string;
  avatarLink: string;
}) {

  const router = useRouter();
  const handleLogout = () => {
    logoutAction().then(() => router.replace("/login"));
  };

  const pathname = usePathname();

  return (
    <>
      <div
        className={
          "max-md:fixed max-md:bottom-0 flex md:flex-col md:h-full items-center justify-between w-full p-4 text-5xl font-sans font-bold " +
          (footer ? "md:hidden bg-black px-10" : "")
        }
      >
        {
          [
            {
              href: '/',
              Icon: pathname === "/" ? HomeIconFilled : HomeIconEmpty,
              label: 'Home'
            },
            {
              href: `/u/${username}`,
              Icon: pathname === `/u/${username}` ? UserIconFilled : UserIconEmpty,
              label: 'Profile'
            }
          ].map((link) =>
            <Link key={link.label} href="/">
              <Button className=" flex items-center max-xl:p-0 max-xl:pb-2 max-xl:justify-center justify-start w-full gap-4 p-1 xl:pl-3 text-lg font-bold text-white transition-all duration-200 bg-transparent rounded-full h-fit pr-7 hover:bg-rebeccapurple">
                <link.Icon className="w-8 max-xl:mr-0 h-8 mr-1 text-biancapurple" />
                <span className="max-xl:hidden ml-2 text-biancapurple">{link.label}</span>
              </Button>
            </Link>
          )
        }

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="w-8 h-8 md:hidden rounded-full cursor-pointer">
              <AvatarImage src={avatarLink ?? "/chorro-timido.JPG"} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-24 mr-2 p-2">
            <Separator />
            <DropdownMenuItem className="flex items-center" onClick={handleLogout}>
              <LogoutIcon className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
            <Separator />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
