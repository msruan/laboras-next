"use client";

import {
  HomeIcon as HomeIconFilled,
  UserCircleIcon as UserIconFilled,
} from "@heroicons/react/16/solid";
import {
  HomeIcon as HomeIconEmpty,
  UserCircleIcon as UserIconEmpty,
} from "@heroicons/react/24/outline";
import { DropdownMenu, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { LogOut as LogoutIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutAction } from "@/api/auth.actions";
import { Assets } from "@/assets";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

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
    <div
      className={cn(
        "flex w-full items-center justify-between p-4 font-bold font-sans text-5xl max-md:fixed max-md:bottom-0 md:h-full md:flex-col",
        footer && "bg-black px-10 md:hidden"
      )
      }
    >
      {[
        {
          href: "/" as const,
          Icon: pathname === "/" ? HomeIconFilled : HomeIconEmpty,
          label: "Home",
        },
        {
          href: `/u/${username}` as const,
          Icon:
            pathname === `/u/${username}` ? UserIconFilled : UserIconEmpty,
          label: "Profile",
        },
      ].map((link) => (
        <Link key={link.label} href={link.href}>
          <Button className="flex h-fit w-full items-center justify-start gap-4 rounded-full bg-transparent p-1 pr-7 font-bold text-lg text-white transition-all duration-200 hover:bg-rebeccapurple max-xl:justify-center max-xl:p-0 max-xl:pb-2 xl:pl-3">
            <link.Icon className="mr-1 h-8 w-8 text-biancapurple max-xl:mr-0" />
            <span className="ml-2 text-biancapurple max-xl:hidden">
              {link.label}
            </span>
          </Button>
        </Link>
      ))}

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="h-8 w-8 cursor-pointer rounded-full md:hidden">
            <AvatarImage src={avatarLink ?? Assets.images.shyDog} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="mr-2 w-24 p-2">
          <Separator />
          <DropdownMenuItem
            className="flex items-center"
            onClick={handleLogout}
          >
            <LogoutIcon className="mr-2 h-4 w-4" />
            Sair
          </DropdownMenuItem>
          <Separator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
