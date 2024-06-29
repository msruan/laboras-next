"use client";

import { useRouter } from 'next/navigation';

import { ChevronLeftIcon } from '@radix-ui/react-icons';

export function Navbar({ username }: { username: string }) {
  const router = useRouter();
  return (
    <div className="fixed justify-center items-center top-0 flex p-2 w-full bg-black border-b-[1px] border-b-gray-500 sm:hidden ">
      <ChevronLeftIcon
        cursor={"pointer"}
        onClick={() => router.back()}
        className="fixed w-6 h-6 left-3 top-2"
      ></ChevronLeftIcon>
      <h1 className="font-bold">{username}</h1>
    </div>
  );
}
