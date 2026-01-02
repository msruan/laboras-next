import { NextResponse } from "next/server";

import { connectToDb } from "@/lib/utils";
import { ProfileDB } from "@/models/profile.model";
import { logger } from "@/lib/logger";

export const GET = async (_request: Request, { params }: any) => {
  try {
    await connectToDb();
    const { id } = params;
    logger.trace("The requested id profile is ", id);

    const user = await ProfileDB.findById(id);
    
    return NextResponse.json(user);
  } catch (err) {
    logger.error(String(err));
    return NextResponse.error();
  }
};

