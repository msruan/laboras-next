import { NextResponse } from "next/server";

import { connectToDb } from "@/lib/utils";
import { Profile } from "@/models/profiles";

export const GET = async () => {
  try {
    await connectToDb();

    const post = await Profile.find();
    return NextResponse.json(post);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};
