import {
	EllipsisHorizontalIcon,
	PencilIcon,
	TrashIcon,
} from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { deletePost } from "@/api/post.actions";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type PostMenuProps = {
	postId: string;
	handleEdit: (value: boolean) => void;
};

export function PostMenu({ postId, handleEdit }: PostMenuProps) {
	const router = useRouter();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<EllipsisHorizontalIcon
					className="h-4 w-4 text-gray-500 hover:text-gray-100"
					cursor="pointer"
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-28">
				<DropdownMenuGroup className="*:cursor-pointer">
					<DropdownMenuItem
						onClick={() => {
							handleEdit(true);
						}}
					>
						Editar
						<DropdownMenuShortcut>
							<PencilIcon className="h-4 w-4" />
						</DropdownMenuShortcut>
					</DropdownMenuItem>

					<DropdownMenuItem
						className="text-red-700"
						onClick={async () => {
							await deletePost(postId);
							router.refresh();
						}}
					>
						Deletar
						<DropdownMenuShortcut>
							<TrashIcon className="h-4 w-4" />
						</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
