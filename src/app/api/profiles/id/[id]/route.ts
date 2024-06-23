import { NextResponse } from 'next/server';

import { connectToDb, DefaultResponse, OPTIONS } from '@/lib/utils';
import { Profile } from '@/models/profiles';

export const GET = async (request: any, { params }: any) => {
  try {
    await connectToDb();
    const { id } = params;
    console.log("o diabo do id eh ", id);

    const user = await (await Profile()).findById(id);
    return DefaultResponse(request, user);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};

export { OPTIONS };
