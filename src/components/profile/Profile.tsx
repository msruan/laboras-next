import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IProfile } from "@/models/profiles";

import { Card, CardContent, CardTitle } from "../ui/card";

type IProfileProps = {
  profile: IProfile;
  email: string;
  postsCount: number;
};

export const Profile = ({ profile, email, postsCount }: IProfileProps) => {
  const isCurrentUserProfile = profile.email === email;
  return (
    <Card className="flex flex-row max-sm:flex-row items-center gap-7 max-sm:p-5 sm:gap-16 max-sm:pb-10 p-9 px-20 rounded-none bg-transparent border-r-0 border-l-0 border-rebeccapurple2">
      <div className="flex flex-col h-full items-center justify-center gap-5">
        <Avatar className="h-56 w-56 max-xl:h-40 max-xl:w-40 max-sm:h-20 max-sm:w-20">
          <AvatarImage
            src={
              profile.profile_image_link ??
              "https://i.pinimg.com/originals/b5/81/61/b58161c8a74b05c68eeefae22908ce35.jpg"
            }
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {isCurrentUserProfile && (
          <Button
            disabled
            className="w-32 text-white rounded-full font-bold px-9"
          >
            Change image
          </Button>
        )}
      </div>

      <div className="flex flex-col w-full gap-3 items-center">
        <CardTitle className="text-2xl font-bold tracking-tighter">
          {`${
            profile ? profile.first_name + " " + profile.last_name : "Nada n"
          }`}
        </CardTitle>

        <CardContent className="flex flex-col gap-6 p-0 items-center">
          <div className="flex flex-row w-full gap-10 p-0 justify-center">
            <p>
              {postsCount} <strong>publicações</strong>
            </p>
          </div>

          <div className="flex w-fit h-fit text-wrap ">
            <p className="break-normal text-ellipsis ">
              {profile.bio ?? (
                <p>
                  Meiga e abusada, faço você se perder! e quem foi que disse que
                  eu estava apaixonada por você? eu só quero saber! linda e
                  perfumada, ah, na tua mente! faz o que quiser comigo na
                  imaginação. homem do teu tipo eu uso mas se chega lá, eu digo
                  não...
                </p>
              )}
            </p>
          </div>
          {isCurrentUserProfile && (
            <Button
              disabled
              className="font-bold p-4 px-9 w-16 h-8 bg-slate-700 hover:bg-slate-800 text-white rounded-full justify-self-center"
            >
              Edit bio
            </Button>
          )}
        </CardContent>
      </div>
    </Card>
  );
};
