import { getPosts } from "@/api/post.queries";
import { getUserByEmail } from "@/api/user.queries";
import { PostsContainer } from "@/components/PostsContainer";
import { auth } from "@/lib/auth";

const Home = async () => {
	const [posts, session] = await Promise.all([getPosts(), auth()]);

	const user = await getUserByEmail(session?.user?.email ?? "");

	return <PostsContainer currentUser={user} posts={posts} />;
};

export default Home;
