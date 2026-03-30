"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="flex w-full justify-between">
					Mudar tema
					<SunIcon className="h-4 w-4 rotate-0 scale-100 transition-all dark:hidden dark:-rotate-90 dark:scale-0" />
					<MoonIcon className="hidden h-4 w-4 rotate-90 scale-0 transition-all dark:block dark:rotate-0 dark:scale-100" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme("light")}>
					Claro (Experimental)
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					Escuro
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>
					Sistema
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
