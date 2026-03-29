import Link from "next/link";
import { Assets } from "@/assets";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { User } from "@/models/user.model";
import { Card, CardContent, CardTitle } from "../ui/card";

interface Props {
	user: User;
	isTheLoggedUser: boolean;
	postsCount: number;
}

export const UserProfile = ({ user, isTheLoggedUser, postsCount }: Props) => {
	const defaultBio =
		"Meiga e abusada, faço você se perder! e quem foi que disse que eu estava apaixonada por você? eu só quero saber! linda e perfumada, ah, na tua mente! faz o que quiser comigo na imaginação. homem do teu tipo eu uso mas se chega lá, eu digo não...";

	return (
		<Card className="flex flex-row items-center gap-7 rounded-none border-rebeccapurple2 border-r-0 border-l-0 bg-transparent p-9 px-20 max-sm:flex-row max-sm:p-5 max-sm:pb-10 sm:gap-16">
			<div className="flex h-full flex-col items-center justify-center gap-5">
				<Avatar className="h-56 w-56 max-sm:h-20 max-sm:w-20 max-xl:h-40 max-xl:w-40">
					<AvatarImage src={user.avatarUrl ?? Assets.images.cookingDog} />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				{isTheLoggedUser && (
					<Link href="/settings">
						<Button className="rounded-xl px-9 font-bold hover:underline">
							Editar perfil
						</Button>
					</Link>
				)}
			</div>

			<div className="flex w-full flex-col items-start gap-3">
				<CardTitle className="text-start font-bold text-2xl tracking-tighter">
					{user.name}
				</CardTitle>

				<CardContent className="space-y-6 p-0">
					<div className="flex w-full flex-row justify-center gap-10 p-0">
						<p className="w-full text-start">
							{postsCount}{" "}
							<strong>publicaç{postsCount !== 1 ? "ões" : "ão"}</strong>
						</p>
					</div>

					<div className="flex h-fit">
						<p className="text-ellipsis text-wrap break-normal text-start">
							{user.bio ?? defaultBio}
						</p>
					</div>
				</CardContent>
			</div>
		</Card>
	);
};
