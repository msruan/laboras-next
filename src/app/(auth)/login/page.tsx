// import { Login } from "@/actions/AuthAction";
// import { GetProfileByEmail } from "@/actions/ProfileAction";
// import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ChangeEvent, useContext, useState } from "react";
import Link from "next/link";
import { GithubLogin, Logout } from "@/services/auth";
import { useFormStatus } from "react-dom";
import { auth } from "@/lib/auth";
import { SubmitButton } from "@/components/login/SubmitButton";

export default async function LoginPage() {
  const session = await auth();
  console.log(session);
  return (
    <div>
      {session?.user && (
        <form action={Logout} className="w-full flex justify center">
          <Button>Logout</Button>
        </form>
      )}
      <form action={GithubLogin}>
        <Card className="w-full max-w-md text-wrap">
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tighter">
              Entre por sua conta em risco
            </CardTitle>
            <CardDescription className="text-purple-300">
              Não possui conta ainda?{" "}
              <Link className="underline" href={"/signup"}>
                Criar nova conta
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email">Login</Label>
              <Input
                defaultValue="ruan@gmail.com"
                id="email"
                placeholder="Digite seu e-mail ou nome de usuário"
                type="email"
                name="email"
              ></Input>
            </div>
            <div>
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                defaultValue="1234"
                placeholder="Digite sua melhor senha"
                type="password"
                name="password"
              ></Input>
            </div>

            <SubmitButton />

            {/* <div className="flex justify-center items-center gap-6 mt-2">
              <Separator></Separator>
              <span className="text-xs text-muted-foreground">OU</span>
              <Separator></Separator>
            </div>
            <Button variant="outline" className="mt-2">
              <GitHubLogoIcon className="mr-2" />
              Entrar com o GitHub
            </Button> */}
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
