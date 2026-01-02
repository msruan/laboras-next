import { NextResponse } from "next/server";

import { connectToDb } from "@/lib/utils";
import { ProfileDB } from "@/models/profile.model";
import { logger } from "@/lib/logger";

export const GET = async (_request: Request) => {
  try {
    await connectToDb();

    const users = await ProfileDB.find();

    return NextResponse.json(users)
  } catch (err) {
    logger.error(String(err));
    return NextResponse.error();
  }
};
