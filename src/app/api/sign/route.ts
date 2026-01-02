import { Profile } from "next-auth";
import { NextResponse } from "next/server";

import { connectToDb } from "@/lib/utils";
import { ProfileDB as ProfileDB } from "@/models/profile.model";
import { logger } from "@/lib/logger";

export const POST = async (request: Request) => {
  try {
    await connectToDb();
    const profile: Profile = await request.json();

    const oldAccount = await ProfileDB.findOne({ username: profile?.login });
    const hasAccount = oldAccount !== undefined && oldAccount !== null;

    if (hasAccount) return NextResponse.json({ response: true });

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

    return NextResponse.json({ response: true });
  } catch (err) {
    logger.error(String(err));
    return NextResponse.json({ response: false });
  }
};
