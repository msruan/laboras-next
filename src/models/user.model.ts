import mongoose, { type Model } from "mongoose";

export type UserDTO = Omit<User, "id"> & {
	_id: string;
};

const UserSchema = new mongoose.Schema<UserDTO>(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			min: 4,
		},
		name: {
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
		avatarUrl: {
			type: String,
			required: false,
		},
		bio: {
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
	const { _id, ...props } = dto;

	return { id: _id, ...props };
}

export type UserUpdate = Partial<Omit<User, "email">> & Pick<User, "id">;
