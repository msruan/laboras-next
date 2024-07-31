"use client";

import { useRouter } from "next/navigation";

import { ChevronLeftIcon } from "@radix-ui/react-icons";

export function Header({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div className="fixed justify-center items-center z-10 top-0 flex p-2 w-full bg-black border-b-[1px] border-b-gray-500 sm:hidden ">
      <ChevronLeftIcon
        cursor={"pointer"}
        onClick={() => router.back()}
        className="fixed w-6 h-6 left-3 top-2"
      ></ChevronLeftIcon>
      <h1 className="font-bold">{title}</h1>
    </div>
  );
}
