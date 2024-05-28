import { NextResponse } from "next/server";

import { connectToDb, OPTIONS } from "@/lib/utils";
import { Profile } from "@/models/profiles";
import { headers } from "next/headers";
import cors from "@/lib/cors";

export const GET = async (request: Request) => {
  try {
    await connectToDb();
    const headersList = headers();
    // console.log(headersList);
    const token = headersList.get("authorization")?.split(" ")[1];
    const user = await Profile.findOne({ token: token });
    return cors(
      request,
      new Response(JSON.stringify(user), {
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