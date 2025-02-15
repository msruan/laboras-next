import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";

import useClient from "@/hooks/use-client";
import { IPost } from "@/models/posts";
import { IProfile } from "@/models/profiles";

import { CardContent } from "../ui/card";
import { Icons } from "./Icons";
import { PostMenu } from "./PostMenu";

interface IPostContentProps {
  userId: string;
  perfil: IProfile;
  post: IPost;
  fullPage: boolean;
  onClick: () => void;
  handleEdit: (value: boolean) => void;
}

export function PostContent({
  perfil,
  userId,
  post,
  fullPage,
  handleEdit,
  onClick,
}: IPostContentProps) {
  const isClient = useClient();
  return (
    <>
      <CardContent
        onClick={onClick}
        className="flex flex-col justify-between w-full break-all"
      >
        <div className="flex flex-col gap-4">
          <div
            className={
              "flex justify-between items-center max-sm:flex-col max-sm:items-start"
            }
          >
            <div
              className={`flex items-start text-aliceblue text-sm gap-0 ${
                fullPage ? "flex-col" : "gap-2"
              } `}
            >
              <Link href={`/u/${perfil?.username}`}>
                <h3>{perfil?.first_name}</h3>
              </Link>
              <Link href={`/u/${perfil?.username}`}>
                <h4 className="opacity-70">@{perfil?.username}</h4>
              </Link>
            </div>
            {!fullPage && (
              <span className={"opacity-50 text-xs"}>
                há{" "}
                {isClient &&
                  formatDistanceToNow(post?.createdAt, { locale: ptBR })}
              </span>
            )}
          </div>
          <div className="text-aliceblue font-sans text-base w-full">
            <p>{post?.content}</p>
          </div>
        </div>
        {fullPage ? (
          <footer
            className={`text-white opacity-70 text-xs mt-10 border-t-purple-50 flex items-center`}
          >
            <p className="w-3/4">
              Data de publicação:{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <div
              className={`flex flex-row justify-between pr-7 pb-1 h-fit
      ${fullPage ? " w-1/4" : " w-1/4"}
      `}
            >
              <Icons userId={userId} post={post} fullPage={fullPage}></Icons>
              {userId === post.user_id && (
                <PostMenu handleEdit={handleEdit} postId={post._id} />
              )}
            </div>
          </footer>
        ) : (
          <></>
        )}
      </CardContent>
    </>
  );
}
