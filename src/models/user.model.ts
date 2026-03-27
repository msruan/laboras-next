import mongoose, { type Model } from "mongoose";

import type { IPost } from "./post.model";

export interface User {
	_id: string;
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	password: string;
	posts: IPost[];
	profile_image_link?: string;
	bio?: string;
}

const UserSchema = new mongoose.Schema<User>(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			min: 4,
		},
		first_name: {
			type: String,
			required: true,
		},
		last_name: {
			type: String,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
		},
		bio: {
			type: String,
			required: false,
		},
		profile_image_link: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true },
);

export const UserDB =
	(mongoose.models?.Profile as Model<User>) ||
	mongoose.model("Profile", UserSchema);

export interface UserUpdateDTO {
	_id: string;
	name?: string;
	username?: string;
	avatarUrl?: string;
	bio?: string;
}
