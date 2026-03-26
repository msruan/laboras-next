"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { logoutAction } from "@/api/auth.actions";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "../ui/separator";

export function DesktopLogoutMenu({ children }: { children: ReactNode }) {
	const router = useRouter();

	async function handleLogout() {
		await logoutAction();
		router.replace("/login");
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className="w-24 mr-2 p-2">
				<Separator />
				<DropdownMenuItem className="flex items-center" onClick={handleLogout}>
					<LogOut className="mr-2 h-4 w-4" />
					Sair
				</DropdownMenuItem>
				<Separator />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
