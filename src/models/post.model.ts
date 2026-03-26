import mongoose, { type Model } from "mongoose";

export interface IPost {
	_id: string;
	user_id: string;
	content: string;
	createdAt: Date;
	likes: number;
	deslikes: number;
	linked_to: string | null;
	liked_by: string[];
	desliked_by: string[];
}

export interface CreatePostDTO {
	user_id: string;
	content: string;
	linked_to: string | null;
}

const PostSchema = new mongoose.Schema<IPost>(
	{
		user_id: { type: String, required: true },
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
	(mongoose.models?.Post as Model<IPost>) || mongoose.model("Post", PostSchema);
