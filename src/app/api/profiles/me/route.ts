import { NextResponse } from "next/server";

import { connectToDb } from "@/lib/utils";
import { Profile } from "@/models/profiles";
import { headers } from "next/headers";

export const GET = async () => {
  try {
    await connectToDb();
    const headersList = headers();
    // console.log(headersList);
    const token = headersList.get("authorization")?.split(" ")[1];
    const user = await Profile.findOne({ token: token });
    return NextResponse.json(user, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};
