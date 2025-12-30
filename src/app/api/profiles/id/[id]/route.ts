import { NextResponse } from "next/server";

import { connectToDb } from "@/lib/utils";
import { ProfileDB } from "@/models/profile.model";

export const GET = async (_request: Request, { params }: any) => {
  try {
    await connectToDb();
    const { id } = params;
    console.info("The requested id profile is ", id);

    const user = await ProfileDB.findById(id);
    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};

