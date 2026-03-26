import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";

import useClient from "@/hooks/use-client";
import { cn } from "@/lib/utils";
import type { IPost } from "@/models/post.model";
import type { User } from "@/models/user.model";
import { CardContent } from "../ui/card";
import { Icons } from "./Icons";
import { PostMenu } from "./PostMenu";

interface Props {
  userId: string;
  owner: User;
  post: IPost;
  fullPage: boolean;
  onClick: () => void;
  handleEdit: (value: boolean) => void;
}

export function PostContent({
  owner,
  userId,
  post,
  fullPage,
  handleEdit,
  onClick,
}: Props) {
  const isClient = useClient();
  return (
    <CardContent
      onClick={onClick}
      className="flex w-full flex-col justify-between break-all"
    >
      <div className="flex flex-col gap-4">
        <div
          className=
          "flex items-center justify-between max-sm:flex-col max-sm:items-start"

        >
          <div
            className={cn(
              "flex items-start gap-2 text-aliceblue text-sm",
              fullPage && "flex-col gap-0",
            )}
          >
            <Link href={`/u/${owner?.username}`}>
              <h3>{owner?.first_name}</h3>
            </Link>
            <Link href={`/u/${owner?.username}`}>
              <h4 className="opacity-70">@{owner?.username}</h4>
            </Link>
          </div>
          {!fullPage && (
            <span className={"text-xs opacity-50"}>
              há{" "}
              {isClient &&
                formatDistanceToNow(post?.createdAt, { locale: ptBR })}
            </span>
          )}
        </div>
        <div className="w-full font-sans text-aliceblue text-base">
          <p>{post?.content}</p>
        </div>
      </div>
      {fullPage && (
        <footer className="mt-10 flex items-center border-t-purple-50 text-white text-xs opacity-70">
          <p className="w-3/4">
            Data de publicação:{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <div className="flex h-fit w-1/4 flex-row justify-between pr-7 pb-1">
            <Icons userId={userId} post={post} fullPage={fullPage}></Icons>
            {userId === post.user_id && (
              <PostMenu handleEdit={handleEdit} postId={post._id} />
            )}
          </div>
        </footer>
      )}
    </CardContent>
  );
}
