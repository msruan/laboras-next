"use client";

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

export default function LoginPage() {
  // const { status, mutate } = Login();
  //   const { Login, signed } = useAuth();

  const [isEntering, setIsEntering] = useState(false);
  const [inputValues, setInputValues] = useState({
    email: "ruan@gmail.com",
    password: "1234",
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement> | null = null) => {
    if (e) {
      e.preventDefault();
    }
    localStorage.setItem("email", inputValues.email);
    // mutate(inputValues);
    // Login(inputValues);
    setIsEntering(true);
  };

  //   if (signed) {
  //     return <Navigate to="/posts" />;
  //   }

  // if (status === "success") {
  // const email = inputValues.email;
  // console.log(email);
  // const { handleChange } = useAuth();
  // const { response: data, isSuccess } = GetProfileByEmail(email);
  // if (isSuccess) {
  //   handleChange({ username: data?.username, id: data?.id });
  // }
  // console.log("LOGIN COM SUCESSO");
  // return <Navigate to="/posts" />;
  // }

  const validarParametros = (): boolean => {
    return inputValues.email !== "" && inputValues.password !== "";
  };

  return (
    <Card
      className="w-full max-w-md text-wrap"
      onKeyDown={(e) => {
        if (e.key === "Enter" && validarParametros()) () => {}; //onSubmit();
      }}
    >
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
            onChange={handleOnChange}
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
            onChange={handleOnChange}
          ></Input>
        </div>

        {isEntering ? (
          <Button className="mt-2" disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Entrando...
          </Button>
        ) : (
          <Button className="mt-2" onClick={onSubmit}>
            Entrar
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
