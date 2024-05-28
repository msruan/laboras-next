interface CredentialsLogin {
  email: string;
  password: string;
}

import cors from "@/lib/cors";
import { connectToDb, OPTIONS } from "@/lib/utils";
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
      return cors(
        new Response(
          JSON.stringify({ error: "Email or password incorrects!" }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
      );
    }
    return cors(
      new Response(JSON.stringify({ token: `${user["token"]}` }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
    return NextResponse.json();
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
};

export { OPTIONS };
