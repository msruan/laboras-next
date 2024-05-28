import { ISignupProfile } from "@/models/profiles";

import {
  connectToDb,
  DefaultError,
  DefaultResponse,
  OPTIONS,
} from "@/lib/utils";
import { IProfile, Profile } from "@/models/profiles";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    await connectToDb();
    const profile: ISignupProfile = await request.json();
    console.log(
      "mana o perfil q to tentando criar eh " + JSON.stringify(profile)
    );
    const newUser = new Profile({
      email: profile.email,
      first_name: profile.first_name,
      last_name: profile.last_name,
      username: profile.username,
      password: profile.password,
    });

    const user = await newUser.save();
    console.log("novo usuario criado com sucesso!" + user);

    return DefaultResponse(request, { sucess: true });
  } catch (err) {
    console.log(err);
    return DefaultError(request);
  }
};

export { OPTIONS };
