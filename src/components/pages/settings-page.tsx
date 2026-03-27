import { GeneralSection } from "@/components/settings/general-section";
import { UserProfileSection } from "@/components/settings/profile-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { User } from "@/models/user.model";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export function SettingsPage({ currentUser }: { currentUser: User }) {
	return (
		<div className="flex items-center justify-center pt-6">
			<Card className="w-full max-w-lg text-wrap bg-transparant">
				<CardHeader>
					<CardTitle
						id="beggin"
						className="text-center font-bold text-2xl tracking-tighter"
					>
						Configurações
					</CardTitle>
					<Separator />
				</CardHeader>
				<CardContent className="flex flex-col gap-8">
					<section className="flex h-full flex-col items-center justify-between gap-6">
						<Tabs defaultValue="account" className="mb-4 w-full">
							<TabsList className="grid w-full grid-cols-2">
								<TabsTrigger value="general">Gerais</TabsTrigger>
								<TabsTrigger value="account">Conta</TabsTrigger>
							</TabsList>
							<TabsContent value="account">
								<UserProfileSection profile={currentUser} />
							</TabsContent>
							<TabsContent value="general">
								<GeneralSection />
							</TabsContent>
						</Tabs>
					</section>
				</CardContent>
			</Card>
		</div>
	);
}
