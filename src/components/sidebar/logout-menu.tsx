"use client";

import { LogOut } from "lucide-react";
import type { ReactNode } from "react";
import { logoutAction } from "@/api/auth.actions";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "../ui/separator";

export function LogoutMenu({ children }: { children: ReactNode }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className="mr-2 w-24 p-2">
				<Separator />
				<DropdownMenuItem className="flex items-center" onClick={logoutAction}>
					<LogOut className="mr-2 h-4 w-4" />
					Sair
				</DropdownMenuItem>
				<Separator />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
