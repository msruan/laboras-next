"use server"

import { apiURL } from '@/constants';
import { signIn, signOut } from '@/lib/auth';
import { Profile } from 'next-auth';

export const githubLoginAction = async () => {
  await signIn("github", { redirectTo: "/" });
};

export const logoutAction = async () => {
  await signOut();
};

export async function apiSign(profile: Profile): Promise<boolean> {
  const response = await fetch(`${apiURL}/sign`, {
    method: "POST",
    body: JSON.stringify(profile)
  });

  return response.ok;
}