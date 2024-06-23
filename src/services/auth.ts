"use server";

import { signIn, signOut } from '@/lib/auth';

export const GithubLogin = async () => {
  await signIn("github", { redirectTo: "/" });
};

export const Logout = async () => {
  await signOut();
};
