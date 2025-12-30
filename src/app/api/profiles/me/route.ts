import {
  connectToDb,
} from "@/lib/utils";
import { IProfile, ProfileDB } from "@/models/profile.model";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    await connectToDb();
    // const headersList = headers();
    // const token = headersList.get("authorization")?.split(" ")[1];
    // const user: IProfile | null = await (await Profile()).findOne({ token: token });
    const user: IProfile | null = await ProfileDB.findOne({
      username: (await request.json())?.username,
    });

    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
};
