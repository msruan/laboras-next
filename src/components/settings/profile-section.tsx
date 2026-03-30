"use client";

import { redirect } from "next/navigation";
import { updateUser } from "@/api/user.actions";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDebounce } from "@/hooks/use-debounce";
import { useInput } from "@/hooks/use-input";
import type { User, UserUpdate } from "@/models/user.model";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export function UserProfileSection({ profile }: { profile: User }) {
	const nameInput = useInput(profile.name);
	const bioInput = useInput(profile.bio);
	const avatarInput = useInput(profile.avatarUrl);

	const avatarLinkDebounced = useDebounce(avatarInput.value, 500);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Conta</CardTitle>
				<CardDescription>
					Clique em <i>Salvar mudanças</i> quando acabar.
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-4">
				<div className="space-y-1">
					<Label htmlFor="name">Nome</Label>
					<Input id="name" placeholder="Seu nome" {...nameInput} />
				</div>
				<div className="space-y-1">
					<Label htmlFor="bio">Bio</Label>
					<Textarea
						className="bg-transparent"
						id="bio"
						placeholder="Conte ao mundo sobre você"
						{...bioInput}
					/>
				</div>

				<div className="flex h-full w-full items-center justify-between">
					<div className="w-full space-y-1">
						<Label htmlFor="avatar">Foto de perfil</Label>
						<Input id="avatar" placeholder="Seu avatar" {...avatarInput} />
					</div>

					<figure className="flex h-full items-center justify-center pl-4">
						<Avatar className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full">
							<AvatarImage src={avatarLinkDebounced} />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</figure>
				</div>
			</CardContent>

			<CardFooter>
				<Button
					onClick={async () => {
						const changeBody: UserUpdate = {
							id: profile.id,
							name: nameInput.value,
							bio: bioInput.value,
							avatarUrl: avatarInput.value,
						};
						await updateUser(changeBody);
						redirect(`/u/${profile?.username}`);
					}}
				>
					Salvar mudanças
				</Button>
			</CardFooter>
		</Card>
	);
}
