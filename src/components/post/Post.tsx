"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import { updatePost as handleUpdate } from '@/actions/PostActions';
import { IPost } from '@/models/posts';
import { IProfile } from '@/models/profiles';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Card, CardFooter } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Icons } from './Icons';
import { PostContent } from './PostContent';
import { PostMenu } from './PostMenu';

type IPostProps = {
  post: IPost;
  perfil: IProfile;
  fullPage: boolean;
  fullBorder: boolean;
};

export const Post = ({
  post,
  perfil,
  fullPage = false,
  fullBorder = false,
}: IPostProps) => {
  const [editMode, setEditMode] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const local = usePathname();
  const router = useRouter();

  function handleSaveEdit() {
    if (
      textareaRef.current !== null &&
      textareaRef.current.value !== post.content
    ) {
      handleUpdate({
        _id: post._id!,
        data: { content: textareaRef.current.value },
      });
    }
    setEditMode(!editMode);
  }

  const onClick = () => {
    const link = `/posts/${post._id}`;
    if (local != link) {
      router.push(link);
    }
  };

  return (
    <Card
      className={`flex flex-col
          ${fullPage ? "" : "cursor-pointer"}
    ${fullPage || editMode ? "bg-transparent" : "h-full bg-rebeccapurple"}
    ${
      editMode
        ? "border-t-0 border-l-0 border-r-0 border-b-0 rounded-none"
        : fullBorder
        ? "border-purple-400 "
        : "border-t-0 border-l-0 border-r-0 border-b-purple-400 rounded-none"
    }
    `}
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
          <div className="flex w-full pt-3 pl-5 pr-3 h-fit">
            <Link href={`/posts/profile/${perfil?.username}`}>
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


            <PostContent
              onClick={onClick}
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
                <Icons post={post} fullPage={fullPage}></Icons>
                <PostMenu handleEdit={setEditMode} postId={post._id} />
              </div>
            </CardFooter>
          )}
        </>
      )}
    </Card>
  );
};

export default Post;
