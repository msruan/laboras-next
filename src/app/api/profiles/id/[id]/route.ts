import { NextResponse } from "next/server";

import { connectToDb } from "@/lib/utils";
import { Profile } from "@/models/profiles";
import { headers } from "next/headers";
import {OPTIONS} from "@/lib/utils"

export const GET = async (request: any, { params }: any) => {
  try {
    await connectToDb();
    const { id } = params;
    console.log(id);

    const user = await Profile.findById(id);
    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};

export {OPTIONS}