import { Profile } from 'next-auth';
import { NextResponse } from 'next/server';

import { connectToDb } from '@/lib/utils';
import { Profile as ProfileDB } from '@/models/profiles';

export const POST = async (request: Request) => {
  try {
    await connectToDb();
    const profileDB = await ProfileDB();
    const profile: Profile = await request.json();

    const oldAccount = await profileDB.findOne({ username: profile?.login });
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
    const newProfile = await new profileDB(profileSchema);
    await newProfile.save();
    return NextResponse.json({ response: true });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ response: false });
  }
};
