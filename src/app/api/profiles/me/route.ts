import { headers } from 'next/headers';

import { connectToDb, DefaultError, DefaultResponse, OPTIONS } from '@/lib/utils';
import { IProfile, Profile } from '@/models/profiles';

export const GET = async (request: Request) => {
  try {
    await connectToDb();
    const headersList = headers();
    const token = headersList.get("authorization")?.split(" ")[1];
    const user: IProfile | null = await (await Profile()).findOne({ token: token });
    return DefaultResponse(request, user);
  } catch (err) {
    console.log(err);
    return DefaultError(request);
  }
};

export { OPTIONS };
