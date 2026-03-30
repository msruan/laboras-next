"use server";

import { logger } from "@/lib/logger";
import { connectToDb } from "@/lib/utils";
import { UserDB, type UserUpdate } from "@/models/user.model";
import { logoutAction } from "./auth.actions";

export async function updateUser(payload: UserUpdate): Promise<void> {
	try {
		await connectToDb();

		const updatedData = {
			...(payload.name ? { first_name: payload.name } : {}),
			...(payload.bio ? { bio: payload.bio } : {}),
			...(payload.username ? { username: payload.username } : {}),
			...(payload.avatarUrl ? { profile_image_link: payload.avatarUrl } : {}),
		};
		const user = await UserDB.findByIdAndUpdate(payload.id, updatedData);

		if (!user) {
			throw new Error("User not found");
		}

		logger.info("User was updated!");
		await logoutAction();
	} catch (err) {
		logger.error(String(err));
		throw err;
	}
}
