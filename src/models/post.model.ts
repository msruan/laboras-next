import mongoose, { type Model } from "mongoose";
import { parseUser, type User, type UserDTO } from "./user.model";

export interface PostDTO {
	_id: string;
	owner: UserDTO | null;
	user_id?: string | null;
	content: string;
	createdAt: Date;
	likes: number;
	deslikes: number;
	linked_to: string | null;
	liked_by: string[];
	desliked_by: string[];
}

const PostSchema = new mongoose.Schema<PostDTO>(
	{
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Profile",
		},
		user_id: { type: String, required: false },
		content: {
			type: String,
			required: true,
		},
		likes: {
			type: Number,
			default: 0,
		},
		deslikes: {
			type: Number,
			default: 0,
		},
		linked_to: {
			type: String,
			default: null,
		},
		liked_by: {
			type: [String],
		},
		desliked_by: {
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
	deslikes: number;
	deslikedBy: string[];
	createdAt: Date;
}

export function parsePost(dto: PostDTO): Post {
	return {
		id: dto._id,
		owner: dto.owner ? parseUser(dto.owner) : null,
		linkedTo: dto.linked_to,
		content: dto.content,
		likes: dto.likes,
		likedBy: dto.liked_by,
		deslikes: dto.deslikes,
		deslikedBy: dto.desliked_by,
		createdAt: dto.createdAt,
	};
}

export interface CreatePostDTO {
	user_id: string;
	content: string;
	linked_to: string | null;
}

export type UpdatePostDTO = Omit<Partial<PostDTO>, "createdAt" | "linked_to">;
