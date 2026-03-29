import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUserByEmail, getUserByUsername } from "@/api/user.queries";
import { UserDetailPage } from "@/components/pages/user-page";
import { EntityNotFoundException } from "@/exceptions";
import { auth } from "@/lib/auth";
import { logger } from "@/lib/logger";
import type { Post } from "@/models/post.model";
import type { User } from "@/models/user.model";

type Props = {
	params: Promise<{
		username: string;
	}>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { username } = await params;

	return {
		title: username,
	};
}

const UserDetail = async ({ params }: Props) => {
	const session = await auth();
	const currentUser = await getUserByEmail(session?.user?.email ?? "");

	const { username } = await params;

	let data: {
		user: User;
		userPosts: Post[];
	};

	try {
		data = await getUserByUsername(username);
	} catch (err) {
		logger.error(String(err));

		if (err instanceof EntityNotFoundException) {
			notFound();
		}
		throw err;
	}

	return (
		<UserDetailPage
			currentUser={currentUser}
			user={data.user}
			userPosts={data.userPosts}
		/>
	);
};

export default UserDetail;
