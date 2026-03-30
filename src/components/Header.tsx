"use client";

import { Cog8ToothIcon } from "@heroicons/react/16/solid";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export function Header({
	title,
	showConfigLink,
}: {
	title: string;
	showConfigLink?: boolean;
}) {
	const router = useRouter();

	return (
		<div className="fixed top-0 left-0 z-10 flex w-full items-center justify-between border-b-[1px] border-b-gray-500 bg-black p-4 py-2 sm:hidden">
			<ChevronLeftIcon onClick={() => router.back()} className="h-6 w-6" />
			<h1 className="font-bold">{title}</h1>
			{showConfigLink ? <Cog8ToothIcon className="h-6 w-6" /> : <div />}
		</div>
	);
}
