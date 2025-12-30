"use server"

import { signIn, signOut } from '@/lib/auth';

export const githubLoginAction = async () => {
  await signIn("github", { redirectTo: "/" });
};

export const logoutAction = async () => {
  await signOut();
};
