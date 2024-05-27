"use client";
// import { SignUp } from "@/actions/AuthAction";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState, ChangeEvent } from "react";

export default function SignUpPage() {
  //   const { status, mutate: handleSignUp } = SignUp();
  const [isEntering, setIsEntering] = useState(false);

  const [inputValues, setInputValues] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement> | null = null) => {
    e?.preventDefault();
    // handleSignUp(inputValues);
    setIsEntering(true);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  //   if (status == "success") {
  //     return <Navigate to="/" />;
  //   }

  const validarParametros = (): boolean => {
    return (
      inputValues.first_name !== "" &&
      inputValues.last_name !== "" &&
      inputValues.username !== "" &&
      inputValues.email !== "" &&
      inputValues.password !== "" &&
      inputValues.confirm_password !== ""
    );
  };

  return (
    <Card
      className="w-full max-w-md text-wrap "
      onKeyDown={(e) => {
        if (e.key === "Enter" && validarParametros()) onSubmit();
      }}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tighter">
          Cadastrar-se
        </CardTitle>
        <CardDescription className="text-purple-300">
          Já possui uma conta?{" "}
          <Link className="underline" href={"/login"}>
            Login
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          <Label htmlFor="nome">First name</Label>
          <Input
            placeholder="Type your first name"
            type="text"
            name="first_name"
            onChange={handleOnChange}
          ></Input>
        </div>
        <div>
          <Label htmlFor="nome">Last name</Label>
          <Input
            placeholder="Type your last name"
            type="text"
            name="last_name"
            onChange={handleOnChange}
          ></Input>
        </div>
        <div>
          {/**Todo: partir depois pra pegar o first name */}
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Type your username"
            type="text"
            name="username"
            onChange={handleOnChange}
          ></Input>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Type your best email"
            type="email"
            name="email"
            onChange={handleOnChange}
          ></Input>
        </div>
        <div>
          <Label htmlFor="senha">Senha</Label>
          <Input
            id="senha"
            placeholder="Type your most discreet password"
            type="password"
            name="password"
            onChange={handleOnChange}
          ></Input>
        </div>
        <div>
          <Label htmlFor="confirm-senha">Senha</Label>
          <Input
            id="confirm-senha"
            placeholder="Retype your password"
            type="password"
            name="confirm_password"
            onChange={handleOnChange}
          ></Input>
        </div>
        {isEntering ? (
          <Button className="mt-2" disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Criando conta...
          </Button>
        ) : (
          <Button className="mt-2" onClick={onSubmit}>
            Criar conta
          </Button>
        )}

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
  );
}
