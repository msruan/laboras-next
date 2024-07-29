"use client";

import clsx from "clsx";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { updatePost as handleUpdate } from "@/actions/PostActions";
import useClient from "@/hooks/use-client";
import { IPost } from "@/models/posts";
import { IProfile } from "@/models/profiles";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardFooter } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Icons } from "./Icons";
import { PostContent } from "./PostContent";
import { PostMenu } from "./PostMenu";

type IPostProps = {
  post: IPost;
  perfil: IProfile;
  fullPage: boolean;
  fullBorder: boolean;
  userId: string;
};

export const Post = ({
  post,
  perfil,
  fullPage = false,
  userId,
  fullBorder = false,
}: IPostProps) => {
  const [editMode, setEditMode] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isClient = useClient();
  const local = usePathname();
  const router = useRouter();
  console.log("rpz, sou o post e recebi o id ", userId);

  async function handleSaveEdit() {
    if (
      textareaRef.current !== null &&
      textareaRef.current.value !== post.content
    ) {
      setEditMode(!editMode);
      toast.promise(
        handleUpdate({
          _id: post._id!,
          data: { content: textareaRef.current.value },
        }),
        {
          loading: "Atualizando post...",
          success: (data) => {
            router.refresh();
            return `Post atualizado!`;
          },
          error: "Erro ao atualizar post!",
        }
      );
    } else setEditMode(!editMode);
  }

  const onClick = () => {
    const link = `/p/${post._id}`;
    if (local != link) {
      router.push(link);
    }
  };

  return (
    <Card
      className={clsx("flex w-full flex-col", {
        "cursor-pointer": fullPage,
        "bg-transparent": fullPage || editMode,
        "h-full bg-rebeccapurple": !(fullPage || editMode),
        "border-t-0 border-l-0 border-r-0 border-b-0 rounded-none": editMode,
        "border-purple-400 ": !editMode && fullBorder,
        "border-t-0 border-l-0 border-r-0 border-b-purple-400 rounded-none":
          !editMode && !fullBorder,
      })}
    >
      {editMode ? (
        <div className="flex flex-col items-center justify-center w-full h-full gap-2 border-t-0 border-b-0 border-l-0 border-r-0">
          <Textarea
            defaultValue={post.content}
            ref={textareaRef}
            autoFocus={true}
            className="bg-rebeccapurple w-noavatar"
            placeholder="Edit your message here."
            id={`post-${post._id}`}
          ></Textarea>
          <Button onClick={handleSaveEdit} variant="ghost">
            Salvar
          </Button>
        </div>
      ) : (
        <>
          <div className="flex w-full pt-3 pl-8 pr-3 h-fit">
            <div className="flex gap-5 w-full">
              <Link href={`/u/${perfil?.username}`}>
                <Avatar className="w-12 h-12 rounded-full">
                  <AvatarImage
                    src={
                      perfil?.profile_image_link ??
                      "https://p2.trrsf.com/image/fget/cf/1200/1600/middle/images.terra.com/2023/07/31/pedro-flamengo-uv5ta7zqn5us.jpg"
                    }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <div className={""}>
                <div
                  className={`flex ${
                    fullPage ? "flex-col" : ""
                  } items-start text-aliceblue text-sm gap-2`}
                >
                  <Link href={`/u/${perfil?.username}`}>
                    <h3>{perfil?.first_name}</h3>
                  </Link>
                  <Link href={`/u/${perfil?.username}`}>
                    <h4 className="opacity-70">@{perfil?.username}</h4>
                  </Link>
                </div>
                <span className={"opacity-50 text-xs"}>
                  há{" "}
                  {isClient &&
                    formatDistanceToNow(post?.createdAt, { locale: ptBR })}
                </span>
              </div>
            </div>
          </div>
          <div className="p-5 ">
            <PostContent
              onClick={onClick}
              userId={userId}
              perfil={perfil!}
              post={post}
              fullPage={fullPage}
              handleEdit={setEditMode}
            />
          </div>
          {!fullPage && (
            <CardFooter className="flex items-center justify-end h-fit">
              <div
                className={`flex flex-row justify-between pr-7 pb-1 h-fit
      ${fullPage ? " w-1/4 max-md:w-full" : " w-1/4 max-md:w-full"}
      `}
              >
                <Icons userId={userId} post={post} fullPage={fullPage}></Icons>
                {userId === post.user_id && (
                  <PostMenu handleEdit={setEditMode} postId={post._id} />
                )}
              </div>
            </CardFooter>
          )}
        </>
      )}
    </Card>
  );
};

export default Post;
