import { NextResponse } from "next/server";

import { connectToDb } from "@/lib/utils";
import { ProfileDB } from "@/models/profile.model";

export const GET = async (_request: Request) => {
  try {
    await connectToDb();

    const users = await ProfileDB.find();

    return NextResponse.json(users)
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};
