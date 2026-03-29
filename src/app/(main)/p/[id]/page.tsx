import { notFound } from "next/navigation";
import { getPostById } from "@/api/post.queries";
import { getUserByEmail, getUsers } from "@/api/user.queries";
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
	const { id } = await params;

	let response;

	try {
		response = await getPostById(id);
	} catch (err) {
		logger.error(String(err));

		if (err instanceof EntityNotFoundException) {
			notFound();
		}
		throw err;
	}

	const post: Post = response.post;
	const children: Post[] = response.children;

	const session = await auth();
	const user = await getUserByEmail(session?.user?.email!);

	const users = await getUsers();

	return (
		<PostDetailPage
			users={users}
			currentUser={user}
			post={post}
			postChildren={children}
			owner={user}
			userId={session?.user?.id!}
		/>
	);
};

//Todo: fazer fetchs separados, para deixar a pagina carregar sem esperar pelos comentarios
export default PostDetail;
