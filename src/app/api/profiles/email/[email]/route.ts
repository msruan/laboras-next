import { NextResponse } from "next/server";

import { connectToDb } from "@/lib/utils";
import { ProfileDB } from "@/models/profile.model";

export const GET = async (_request: Request, { params }: any) => {
  try {
    await connectToDb();
    const { email } = params;

    const user = await ProfileDB.findOne({ email: email });
    return NextResponse.json(user)
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};