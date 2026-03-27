import { getUsers } from "@/api/user.queries";
import type { User } from "@/models/user.model";

import { UserProfileTag } from "./user/UserProfileTag";

export const AsidePeople = async () => {
	const users: User[] = await getUsers();

	return (
		<div className="fixed top-0 right-0 z-1 flex min-h-screen w-72 flex-col items-center gap-3 overflow-x-hidden p-6 max-xl:hidden">
			<h2 className="font-bold font-sans text-2xl text-white">
				Pessoas logadas
			</h2>
			<div className="flex min-h-full flex-col gap-11">
				{users.map((profile) => (
					<UserProfileTag key={profile?.username} user={profile} />
				))}
			</div>
		</div>
	);
};
