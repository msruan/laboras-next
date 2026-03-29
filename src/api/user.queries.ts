import { EntityNotFoundException } from "@/exceptions";
import { logger } from "@/lib/logger";
import { connectToDb } from "@/lib/utils";
import { type IPost, PostDB } from "@/models/post.model";
import {
	parseUser,
	type User,
	UserDB,
	type UserDTO,
} from "@/models/user.model";

export async function getUsers(): Promise<User[]> {
	try {
		await connectToDb();

		const rawUsers = await UserDB.find();
		const users: UserDTO[] = JSON.parse(JSON.stringify(rawUsers));

		return users.map(parseUser);
	} catch (err) {
		logger.error(String(err));
		throw err;
	}
}

export async function getUserByEmail(email: string): Promise<User> {
	try {
		await connectToDb();

		const rawUser = await UserDB.findOne({ email: email });
		if (!rawUser) {
			throw new EntityNotFoundException("User not found");
		}

		const user: UserDTO = JSON.parse(JSON.stringify(rawUser));

		return parseUser(user);
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

		const rawUser = await UserDB.findOne({ username: username });
		if (!rawUser) throw new EntityNotFoundException("User not found!");

		const user = JSON.parse(JSON.stringify(rawUser));

		const rawPosts = await PostDB.find({ user_id: rawUser._id });
		const posts: IPost[] = JSON.parse(JSON.stringify(rawPosts));

		return {
			user: parseUser(user),
			posts: posts.filter((post) => post.linked_to === null).reverse(),
		};
	} catch (err) {
		logger.error(String(err));
		throw err;
	}
}
