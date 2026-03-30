import { ArchiveBoxXMarkIcon } from "@heroicons/react/16/solid";
import { logoutAction } from "@/api/auth.actions";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

export function DeleteAccountModal() {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					disabled
					variant="ghost"
					className="flex w-full justify-between text-red-700"
				>
					Deletar conta
					<ArchiveBoxXMarkIcon className="h-4 w-4" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="font-bold font-sans text-2xl text-white">
						Tem certeza absoluta?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Essa ação não poderá ser desfeita!
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction onClick={logoutAction} className="bg-red-600">
						Deletar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
