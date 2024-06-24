"use client";
import { usePathname } from 'next/navigation';
import { ElementType } from 'react';
import Link from "next/link";
import {Button} from "@/components/ui/button";

type Props = {
  icon: ElementType;
  iconFilled: ElementType;
  href: string;
  title: string;
};

export function NavbarIcon({ icon, iconFilled, href, title }: Props) {
  const local = usePathname();
  const Icon = icon;
  const IconFilled = iconFilled;
  return (
  <Link href={href}>
    <Button className="flex items-center max-xl:p-0 max-xl:pb-2 max-xl:justify-center justify-start w-full gap-4 p-1 xl:pl-3 text-lg font-bold text-white transition-all duration-200 bg-transparent rounded-full h-fit pr-7 hover:bg-rebeccapurple">
      {local===href ? (
          <IconFilled className="w-8 max-xl:mr-0 h-8 mr-1 text-biancapurple" />
      ) : (
          <Icon className="w-8 max-xl:mr-0 h-8 mr-1 text-biancapurple" />
      )}
      <span className="max-xl:hidden">{title}</span>
    </Button>
  </Link>)
}
