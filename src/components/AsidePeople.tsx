import { getUsers } from "@/api/user.queries";
import type { User } from "@/models/user.model";

import { UserProfileTag } from "./user/UserProfileTag";

export const AsidePeople = async () => {
	const users: User[] = await getUsers();

	return (
		<div
			className={`flex flex-col items-center p-6 gap-3 fixed top-0 right-0 min-h-screen overflow-x-hidden max-xl:hidden w-72 z-1`}
		>
			<h2 className="text-white font-sans text-2xl font-bold">
				Pessoas logadas
			</h2>
			<div className="min-h-full flex flex-col gap-11">
				{users.length > 0 &&
					users.map((profile) => (
						<UserProfileTag key={profile?.username} user={profile} />
					))}
			</div>
		</div>
	);
};
