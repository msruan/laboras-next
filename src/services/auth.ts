"use server";

import { signIn, signOut } from "@/lib/auth";

export const GithubLogin = async () => {
  await signIn("github");
};

export const Logout = async () => {
  await signOut();
};
