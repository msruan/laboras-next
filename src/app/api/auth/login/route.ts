interface CredentialsLogin {
  email: string;
  password: string;
}

import { connectToDb } from "@/lib/utils";
import { Post } from "@/models/posts";
import { IProfile, Profile } from "@/models/profiles";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  try {
    await connectToDb();
    const credentials: CredentialsLogin = await request.json();
    console.log("mana as credenciais sao " + JSON.stringify(credentials));

    const { email, password } = credentials;
    const user: IProfile | null = await Profile.findOne({ email: email });
    console.log("mano o user eh" + user);
    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Email or password incorrects!" });
    }
    return NextResponse.json({ token: `${user["token"]}` });
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};
