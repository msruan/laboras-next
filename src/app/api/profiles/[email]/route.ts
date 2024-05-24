import { NextResponse } from "next/server";

import { connectToDb } from "@/lib/utils";
import { Profile } from "@/models/profiles";

export const GET = async (request: any, { params }: any) => {
  const { email } = params;

  try {
    await connectToDb();

    const post = await Profile.findOne({ email: email });
    return NextResponse.json(post);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};
