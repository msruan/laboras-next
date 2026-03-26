import { getPosts } from "@/api/post.queries";
import { getUserByEmail, getUsers } from "@/api/user.queries";
import { PostsContainer } from "@/components/PostsContainer";
import { auth } from "@/lib/auth";
import type { User } from "@/models/user.model";

const Home = async () => {
	const [posts, users, session] = await Promise.all([
		getPosts(),
		getUsers(),
		auth(),
	]);

	const user: User = await getUserByEmail(session?.user?.email ?? "");

	return <PostsContainer currentUser={user} posts={posts} users={users} />;
};

export default Home;
