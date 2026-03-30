import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/16/solid";
import { LogoutModal } from "../logout-modal";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DeleteAccountModal } from "./delete-account-modal";
import { ThemeToggle } from "./theme-toggle";

export function GeneralSection() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Geral</CardTitle>
			</CardHeader>
			<CardContent>
				<ThemeToggle />
				<LogoutModal>
					<Button variant="ghost" className="flex w-full justify-between">
						Sair
						<ArrowRightStartOnRectangleIcon className="h-4 w-4" />
					</Button>
				</LogoutModal>
				<DeleteAccountModal />
			</CardContent>
		</Card>
	);
}
