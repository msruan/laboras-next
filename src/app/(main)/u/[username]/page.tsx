import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProfileByUsername, getUserByEmail } from "@/api/user.queries";
import { UserDetailPage } from "@/components/pages/user-page";
import { EntityNotFoundException } from "@/exceptions";
import { auth } from "@/lib/auth";
import { logger } from "@/lib/logger";
import type { IPost } from "@/models/post.model";
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
	const { username } = await params;

	let data;

	try {
		data = await getProfileByUsername(username);
	} catch (err) {
		logger.error(String(err));

		if (err instanceof EntityNotFoundException) {
			notFound();
		}
		throw err;
	}

	const userProfile: User = data.user;
	const userPosts: IPost[] = data.posts;

	const session = await auth();
	const user: User = await getUserByEmail(session?.user?.email ?? "");

	return (
		<UserDetailPage
			currentUser={user}
			profile={userProfile}
			profilePosts={userPosts}
			isProfileOfLoggerUser={session?.user?.email === userProfile.email}
		/>
	);
};

export default UserDetail;
