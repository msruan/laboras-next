import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IProfile } from '@/models/profile.model';

import { Card, CardContent } from '../ui/card';

type IProfileProps = {
  perfil: IProfile;
};

export const ProfileTag = ({ perfil }: IProfileProps) => {
  return (
    <Link className="w-full max-xl:hidden" href={`/u/${perfil.username}`}>
      <Card className="w-full bg-rebeccapurple2 flex gap-4 p-2 border-0 rounded-full hover:bg-rebeccapurple transition-all duration-150">
        <Avatar className="w-12 h-12 rounded-full cursor-pointer">
          <AvatarImage
            src={perfil.profile_image_link ?? "/images/chorro-timido.jpg"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <CardContent className="flex gap-5 break-all justify-center items-center p-0">
          <div className="flex flex-col items-start text-aliceblue text-sm gap-0.5">
            <h3>
              <strong>{perfil?.first_name}</strong>
            </h3>
            <h4 className="opacity-70">@{perfil?.username}</h4>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
