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
  return (
    <>
      <CardContent
        onClick={onClick}
        className="flex flex-col justify-between w-full break-all"
      >
        <div className="flex flex-col gap-4">
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
              <PostMenu handleEdit={handleEdit} postId={post?._id}></PostMenu>
            </div>
          </footer>
        ) : (
          <></>
        )}
      </CardContent>
    </>
  );
}
