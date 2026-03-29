import mongoose, { type Model } from "mongoose";

export interface UserDTO {
	_id: string;
	first_name: string;
	username: string;
	email: string;
	password: string;
	profile_image_link?: string;
	bio?: string;
}

const UserSchema = new mongoose.Schema<UserDTO>(
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
		email: {
			type: String,
			required: true,
			unique: true,
			minlength: 5,
			lowercase: true,
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
	(mongoose.models?.Profile as Model<UserDTO>) ||
	mongoose.model("Profile", UserSchema);

export interface User {
	id: string;
	username: string;
	name: string;
	email: string;
	avatarUrl: string | null;
	bio: string | null;
}

export function parseUser(dto: UserDTO): User {
	return {
		id: dto._id,
		username: dto.username,
		name: dto.first_name,
		email: dto.email,
		bio: dto.bio ?? null,
		avatarUrl: dto.profile_image_link ?? null,
	};
}

export type UserUpdate = Partial<Omit<User, "email">> & Pick<User, "id">;
