"use client";
import { useRef } from "react";

import { addPost } from "@/api/post.actions";
import { CreatePostDTO } from "@/models/post.model";
import { IProfile } from "@/models/profile.model";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
type TextBoxProps = {
  linkedTo: string | null;
  profile: IProfile;
};
export const TextBox = ({ linkedTo = null, profile }: TextBoxProps) => {
  const router = useRouter();
  const input = useRef<HTMLTextAreaElement>(null);

  async function handleClick() {
    if (input.current == null || input.current.value.trim() === "") {
      return;
    }

    const newPost: CreatePostDTO = {
      user_id: profile._id,
      content: input.current.value,
      linked_to: linkedTo,
    };
    input.current.value = "";
    await addPost(newPost);
    router.refresh();
  }

  return (
    <div className="flex flex-col w-full align-middle pb-10 border-b-2  pl-3 pr-3 border-rebeccapurple2">
      <div className="w-full flex flex-row gap-8 items-center">
        <Avatar className="w-12 h-12 rounded-full">
          <AvatarImage
            src={profile?.profile_image_link ?? "/images/chorro-timido.jpg"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <textarea
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleClick();
            }
          }}
          ref={input}
          className="bg-transparent py-5 w-full content-center border-none text-white outline-none resize-none"
          name="text"
          maxLength={400}
          placeholder={`${linkedTo ? "O que acha disso" : "No que voce está pensando"
            } ${profile.first_name}?`}
        ></textarea>
      </div>
      <div className="self-end justify-self-end w-fit h-fit">
        <Button
          onClick={handleClick}
          className=" bg-rebeccapurple2 hover:bg-rebeccapurple w-full h-full rounded-full font-bold"
        >
          POST
        </Button>
      </div>
    </div>
  );
};
