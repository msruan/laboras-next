"use client";

import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export function Header({ title }: { title: string }) {
	const router = useRouter();

	return (
		<div className="fixed top-0 z-10 flex w-full items-center justify-center border-b-[1px] border-b-gray-500 bg-black p-2 sm:hidden">
			<ChevronLeftIcon
				cursor={"pointer"}
				onClick={() => router.back()}
				className="fixed top-2 left-3 h-6 w-6"
			/>
			<h1 className="font-bold">{title}</h1>
		</div>
	);
}
