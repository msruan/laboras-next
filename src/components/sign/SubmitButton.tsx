"use client";

import { GitHubLogoIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";

import { Button } from "../ui/button";

export function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<>
			{pending ? (
				<Button className="mt-2" disabled>
					<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
					Entrando...
				</Button>
			) : (
				<Button variant="outline" className="mt-2">
					<GitHubLogoIcon className="mr-2" />
					Entrar com o GitHub
				</Button>
			)}
		</>
	);
}
