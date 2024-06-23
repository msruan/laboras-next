import { NextResponse } from 'next/server';

import cors from '@/lib/cors';
import { connectToDb, OPTIONS } from '@/lib/utils';
import { Profile } from '@/models/profiles';

export const GET = async (request: Request) => {
  try {
    await connectToDb();

    const users = await (await Profile()).find();
    return cors(
      request,
      new Response(JSON.stringify(users), {
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
