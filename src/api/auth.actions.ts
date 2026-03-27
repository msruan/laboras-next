"use server";

import { redirect } from "next/navigation";
import type { Profile } from "next-auth";
import { apiURL } from "@/constants";
import { signIn, signOut } from "@/lib/auth";

export const githubLoginAction = async () => {
	await signIn("github", { redirectTo: "/" });
};

export const logoutAction = async () => {
	await signOut();
	redirect("/login");
};

export async function apiSign(profile: Profile): Promise<boolean> {
	const response = await fetch(`${apiURL}/sign`, {
		method: "POST",
		body: JSON.stringify(profile),
	});

	return response.ok;
}
