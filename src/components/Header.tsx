"use client";

import { Cog8ToothIcon } from "@heroicons/react/16/solid";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Header({
	title,
	username,
}: {
	title: string;
	username?: string;
}) {
	const router = useRouter();

	return (
		<div className="fixed top-0 left-0 z-10 flex w-full items-center justify-between border-b-[1px] border-b-gray-500 bg-black p-4 py-2 sm:hidden">
			<button type="button" onClick={() => router.back()} aria-label="Go back">
				<ChevronLeftIcon className="h-6 w-6" />
			</button>
			<h1 className="font-bold">{title}</h1>
			{username ? (
				<Link href="/settings">
					<Cog8ToothIcon className="h-6 w-6" />
				</Link>
			) : (
				<div />
			)}
		</div>
	);
}
