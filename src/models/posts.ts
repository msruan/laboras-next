import mongoose from 'mongoose';

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

export type PostCreate = {
    user_id: string;
    content: string;
    linked_to: string | null;
};

export type PostUpdate = {
    _id: string;
    data: {
        content?: string;
        likes?: number;
        deslikes?: number;
    };
};

const PostSchema = new mongoose.Schema<IPost>(
    {
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
        user_id: {type: String, required: true},
    },
    {timestamps: true}
);

// export const Post = mongoose.models?.Post || mongoose.model("Post", PostSchema);
export const Post = async () =>
    (await mongoose.models?.Post) || (await mongoose.model("Post", PostSchema));
