import {Suspense} from 'react';

import {getUsers} from '@/actions/UsersActions';
import {IProfile} from '@/models/profiles';

import {ProfileTag} from './profile/ProfileTag';
import {ScrollArea} from './ui/scroll-area';

type AsideFollowersProps = {
    className: string;
};

export const AsidePeople = async () => {
    const users: IProfile[] = await (await getUsers()).json();

    return (
        <div
            className={`flex flex-col items-center p-6 gap-3 fixed top-0 right-0 min-h-screen overflow-x-hidden max-xl:hidden w-72 z-1`}
        >
            {/*<Suspense fallback={<h2>Pending...</h2>}>*/}
            <h2 className="text-white font-sans text-2xl font-bold">
                People signed
            </h2>
            {/*<ScrollArea className="flex flex-row h-lvh w-60">*/}
                <div className="min-h-full flex flex-col gap-11">
                    {users.length > 0 &&
                        users.map((profile) => (
                            <ProfileTag key={profile?.username} perfil={profile}/>
                        ))}
                </div>
            {/*</ScrollArea>*/}
            {/*</Suspense>*/}
        </div>
    );
};
