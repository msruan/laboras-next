import mongoose from "mongoose";
import { notFound } from "next/navigation";
import { getPostById } from "@/api/post.queries";
import { getUserByEmail } from "@/api/user.queries";
import { PostDetailPage } from "@/components/pages/post-detail-page";
import { EntityNotFoundException } from "@/exceptions";
import { auth } from "@/lib/auth";
import { logger } from "@/lib/logger";
import type { Post } from "@/models/post.model";

interface Props {
	params: Promise<{
		id: string;
	}>;
}

const PostDetail = async ({ params }: Props) => {
	const session = await auth();
	const user = await getUserByEmail(session?.user?.email ?? "");
	const userId = session?.user?.id;

	const { id } = await params;

	const isIdValid = mongoose.Types.ObjectId.isValid(id);
	if (!isIdValid) {
		notFound();
	}

	let data: {
		post: Post;
		replies: Post[];
	};

	try {
		data = await getPostById(id);
	} catch (err) {
		logger.error(String(err));

		if (err instanceof EntityNotFoundException) {
			notFound();
		}
		throw err;
	}

	return (
		<PostDetailPage
			currentUser={user}
			post={data.post}
			replies={data.replies}
			userId={userId ?? ""}
		/>
	);
};

//TODO: make paralell fetchs allow page show up without wait for the comments
export default PostDetail;
