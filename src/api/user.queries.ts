import { EntityNotFoundException } from "@/exceptions";
import { logger } from "@/lib/logger";
import { connectToDb } from "@/lib/utils";
import { type IPost, PostDB } from "@/models/post.model";
import { type User, UserDB } from "@/models/user.model";

export async function getUsers(): Promise<User[]> {
	try {
		await connectToDb();

		const users = await UserDB.find();

		return JSON.parse(JSON.stringify(users));
	} catch (err) {
		logger.error(String(err));
		throw err;
	}
}

export async function getUserByEmail(email: string): Promise<User> {
	try {
		await connectToDb();

		const user = await UserDB.findOne({ email: email });
		if (!user) {
			throw new EntityNotFoundException("User not found");
		}

		return JSON.parse(JSON.stringify(user));
	} catch (err) {
		logger.error(String(err));
		throw err;
	}
}

export async function getProfileByUsername(
	username: string,
): Promise<{ user: User; posts: IPost[] }> {
	try {
		await connectToDb();
		logger.trace(`The received username is ${username}`);

		const user: User | null = await UserDB.findOne({ username: username });
		if (!user) throw new EntityNotFoundException("User not found!");

		const posts: IPost[] = await PostDB.find({ user_id: user._id });

		return JSON.parse(
			JSON.stringify({
				user,
				posts: posts.filter((post) => post.linked_to === null).reverse(),
			}),
		);
	} catch (err) {
		logger.error(String(err));
		throw err;
	}
}
