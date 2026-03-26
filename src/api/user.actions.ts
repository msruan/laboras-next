"use server";

import { redirect } from "next/navigation";
import { logger } from "@/lib/logger";
import { connectToDb } from "@/lib/utils";
import { UserDB } from "@/models/user.model";
import { logoutAction } from "./auth.actions";

export async function updateUser(payload: {
	data: any;
	_id: string;
}): Promise<void> {
	try {
		await connectToDb();
		const user = await UserDB.findByIdAndUpdate(payload._id, payload.data);
		if (!user) {
			throw new Error("User not found");
		}
		logger.info("User atualizado!");
		logoutAction();
		redirect("/login");
	} catch (err) {
		logger.error(String(err));
		throw err;
	}
}
