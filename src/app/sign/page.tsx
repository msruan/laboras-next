// import { Login } from "@/actions/AuthAction";
// import { GetProfileByEmail } from "@/actions/ProfileAction";

import { SubmitButton } from '@/components/sign/SubmitButton';
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { GithubLogin } from '@/services/auth';

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign",
  description: "Bro, just login it",
};
export default async function LoginPage() {
  const session = await auth();
  return (
    <div>
      <form action={GithubLogin}>
        <Card className="w-full max-w-md text-wrap">
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tighter">
              Entre por sua conta em risco
            </CardTitle>
            <CardDescription className="text-purple-300">
              Primeira vez aqui? É o mesmo botão
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {/* <div className="flex justify-center items-center gap-6 mt-2">
              <Separator></Separator>
              <span className="text-xs text-muted-foreground">OU</span>
              <Separator></Separator>
            </div> */}

            <SubmitButton session={session} />
          </CardContent>

          <CardFooter>
            <p className="text-sm text-muted-foreground text-center text-wrapp">
              Ao entrar em nossa plataforma, você concorda que roubemos todos os
              seus dados.
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
