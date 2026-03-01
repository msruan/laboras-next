"use server"

import { signIn, signOut } from '@/lib/auth';
import { logger } from '@/lib/logger';
import { connectToDb } from '@/lib/utils';
import { ProfileDB } from '@/models/profile.model';
import { Profile } from 'next-auth';

export const githubLoginAction = async () => {
  await signIn("github", { redirectTo: "/" });
};

export const logoutAction = async () => {
  await signOut();
};

export async function apiSign(profile: Profile): Promise<boolean> {
  try {
    await connectToDb();

    const oldAccount = await ProfileDB.findOne({ username: profile?.login });
    const hasAccount = oldAccount !== undefined && oldAccount !== null;

    if (hasAccount) return true;

    const profileSchema = {
      first_name: profile.name,
      last_name: "",
      username: profile?.login,
      token: "",
      email: profile?.email,
      profile_image_link: profile?.avatar_url,
      bio: profile?.bio,
    };

    const newProfile = new ProfileDB(profileSchema);
    await newProfile.save();

    return true;
  } catch (err) {
    logger.error(String(err));
    return false;
  }
}