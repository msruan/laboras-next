import mongoose, { type Model } from "mongoose";
import { parseUser, type User, type UserDTO } from "./user.model";

export type PostDTO = Omit<Post, "id"> & {
	_id: string;
	owner: UserDTO | null;
};

const PostSchema = new mongoose.Schema<PostDTO>(
	{
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Profile",
			required: true,
		},
		linkedTo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
			default: null,
		},
		content: {
			type: String,
			required: true,
		},
		likes: {
			type: Number,
			default: 0,
		},
		likedBy: {
			type: [String],
		},
		dislikes: {
			type: Number,
			default: 0,
		},
		dislikedBy: {
			type: [String],
		},
	},
	{ timestamps: true },
);

export const PostDB =
	(mongoose.models?.Post as Model<PostDTO>) ||
	mongoose.model("Post", PostSchema);

export interface Post {
	id: string;
	owner: User | null;
	linkedTo: string | null;
	content: string;
	likes: number;
	likedBy: string[];
	dislikes: number;
	dislikedBy: string[];
	createdAt: Date;
}

export function parsePost(dto: PostDTO): Post {
	const { _id, owner, ...props } = dto;
	return {
		id: _id,
		owner: owner ? parseUser(owner) : null,
		...props,
	};
}

export interface CreatePostDTO {
	ownerId: string;
	content: string;
	linkedTo: string | null;
}

export type UpdatePostDTO = Omit<Partial<PostDTO>, "createdAt" | "linkedTo">;
