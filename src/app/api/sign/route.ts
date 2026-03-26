import { NextResponse } from "next/server";
import type { Profile } from "next-auth";
import { logger } from "@/lib/logger";
import { connectToDb } from "@/lib/utils";
import { UserDB } from "@/models/user.model";

export const POST = async (request: Request) => {
	try {
		await connectToDb();
		const profile: Profile = await request.json();

		const oldAccount = await UserDB.findOne({ username: profile?.login });

		if (oldAccount) return NextResponse.json(null, { status: 201 });

		const profileSchema = {
			first_name: profile.name,
			last_name: "",
			username: profile?.login,
			email: profile?.email,
			profile_image_link: profile?.avatar_url,
			bio: profile?.bio,
		};

		const newProfile = new UserDB(profileSchema);
		await newProfile.save();

		return NextResponse.json(null, { status: 201 });
	} catch (err) {
		logger.error(String(err));
		return NextResponse.json(null, { status: 500 });
	}
};
