import { EntityNotFoundException } from "@/exceptions";
import { logger } from "@/lib/logger";
import { connectToDb, parseObjToJson } from "@/lib/utils";
import {
	type Post,
	PostDB,
	type PostDTO,
	parsePost,
} from "@/models/post.model";
import {
	parseUser,
	type User,
	UserDB,
	type UserDTO,
} from "@/models/user.model";

export async function getAllUsers(): Promise<User[]> {
	try {
		await connectToDb();

		const rawUsers = await UserDB.find();
		const users = parseObjToJson<UserDTO[]>(rawUsers);

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
		const user = parseObjToJson<UserDTO>(rawUser);

		return parseUser(user);
	} catch (err) {
		logger.error(String(err));
		throw err;
	}
}

export async function getUserByUsername(
	username: string,
): Promise<{ user: User; userPosts: Post[] }> {
	try {
		await connectToDb();
		logger.trace(`The received username is ${username}`);

		const rawUser = await UserDB.findOne({ username: username });
		if (!rawUser) throw new EntityNotFoundException("User not found!");
		const user = parseObjToJson<UserDTO>(rawUser);

		const rawPosts = await PostDB.find({ linked_to: null }, null, {
			sort: "-createdAt",
		}).populate("owner");
		const posts = parseObjToJson<PostDTO[]>(rawPosts);

		return {
			user: parseUser(user),
			userPosts: posts.map(parsePost),
		};
	} catch (err) {
		logger.error(String(err));
		throw err;
	}
}
