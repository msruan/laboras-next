import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import cors from '@/lib/cors';
import { connectToDb, OPTIONS } from '@/lib/utils';
import { Profile } from '@/models/profiles';

export const GET = async (request: Request, { params }: any) => {
  try {
    await connectToDb();
    const { username } = params;
    console.log("o username eh", username);

    const user = await (await Profile()).findOne({ username: username });
    return cors(
      request,
      new Response(JSON.stringify(user), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};

export { OPTIONS };
