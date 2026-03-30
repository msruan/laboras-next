import { NextResponse } from "next/server";
import type { Profile } from "next-auth";
import { logger } from "@/lib/logger";
import { connectToDb } from "@/lib/utils";
import { type User, UserDB } from "@/models/user.model";

export const POST = async (request: Request) => {
	try {
		await connectToDb();
		const profile: Profile = await request.json();

		const oldAccount = await UserDB.findOne({ username: profile?.login });

		if (oldAccount) return NextResponse.json(null, { status: 201 });

		const profileSchema: Omit<User, "id"> = {
			name: profile.name ?? "",
			username: String(profile?.login),
			email: profile?.email ?? "",
			avatarUrl: String(profile?.avatar_url),
			bio: String(profile?.bio),
		};

		const newProfile = new UserDB(profileSchema);
		await newProfile.save();

		return NextResponse.json(null, { status: 201 });
	} catch (err) {
		logger.error(String(err));
		return NextResponse.json(null, { status: 500 });
	}
};
