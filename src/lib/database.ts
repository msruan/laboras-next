import { NextResponse } from "next/server";

import { connectToDb, OPTIONS } from "@/lib/utils";
import { Profile as ProfileDB } from "@/models/profiles";
import cors from "@/lib/cors";
import { IPost } from "@/models/posts";
import { Profile } from "next-auth";

export const signWithGithub = async (profile: Profile) => {
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
    console.log(err);
    return false;
  }
};

export { OPTIONS };
