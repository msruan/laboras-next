import { NextResponse } from "next/server";

import { connectToDb, DefaultResponse } from "@/lib/utils";
import { Profile } from "@/models/profiles";
import { headers } from "next/headers";
import { OPTIONS } from "@/lib/utils";

export const GET = async (request: any, { params }: any) => {
  try {
    await connectToDb();
    const { id } = params;
    console.log("o diabo do id eh ", id);

    const user = await Profile.findById(id);
    return DefaultResponse(request, user);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};

export { OPTIONS };
