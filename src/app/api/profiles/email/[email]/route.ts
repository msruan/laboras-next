import { NextResponse } from "next/server";

import { connectToDb } from "@/lib/utils";
import { ProfileDB } from "@/models/profile.model";
import { logger } from "@/lib/logger";

export const GET = async (_request: Request, { params }: any) => {
  try {
    await connectToDb();
    const { email } = params;

    const user = await ProfileDB.findOne({ email: email });
    return NextResponse.json(user)
  } catch (err) {
    logger.error(String(err));
    return NextResponse.error();
  }
};