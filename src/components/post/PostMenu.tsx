import { deletePost } from '@/actions/PostActions';
import { EllipsisHorizontalIcon, PencilIcon, TrashIcon } from '@heroicons/react/16/solid';

import {
    DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut,
    DropdownMenuTrigger
} from '../ui/dropdown-menu';
import {useRouter} from "next/navigation";

type PostMenuProps = {
  postId: string;
  handleEdit: (value: boolean) => void;
};

export function PostMenu({ postId, handleEdit }: PostMenuProps) {
    const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisHorizontalIcon
          className="h-4 w-4 text-gray-500 hover:text-gray-100"
          cursor="pointer"
        ></EllipsisHorizontalIcon>
        {/* <Button variant="outline">Open</Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-28">
        <DropdownMenuGroup>
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
            onClick={async() => {
              await deletePost(postId);
              router.refresh();
            }}
          >
            Deletar
            <DropdownMenuShortcut>
              <TrashIcon className="w-4 h-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
