import { NextResponse } from "next/server";

import { connectToDb, OPTIONS } from "@/lib/utils";
import { Profile } from "@/models/profiles";
import cors from "@/lib/cors";

export const GET = async (request: Request) => {
  try {
    await connectToDb();

    const users = await Profile.find();
    return cors(
      request,
      new Response(JSON.stringify(users), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};

export { OPTIONS };