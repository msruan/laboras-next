import { NextResponse } from "next/server";

import { connectToDb } from "@/lib/utils";
import { Profile } from "@/models/profiles";
import { headers } from "next/headers";

export const GET = async (request: any, { params }: any) => {
  try {
    await connectToDb();
    const { username } = params;
    console.log(username);

    const user = await Profile.findOne({ username: username });
    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};
