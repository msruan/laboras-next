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
import { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  return (
    <Card className="w-full max-w-md text-wrap ">
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tighter">
          Register
        </CardTitle>
        <CardDescription className="text-purple-300">
          Already have a account?{" "}
          <Link className="underline" href={"/login"}>
            Login
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground text-center text-wrapp">
          By entering on our platform, 
        </p>
      </CardFooter>
    </Card>
  );
}

async function createPost(previousState: any, formData: FormData) {
  const { username, first_name, last_name, email, password } =
    Object.fromEntries(formData);
  const newUser = {
    username: username,
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
  };
  const response = await axios.post(
    "http://localhost:3000/api/auth/signup",
    newUser
  );
  console.log(response);
  return response.data;
}

function Submit({ disabled }: { disabled: any }) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button className="mt-2" disabled>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Criando conta...
        </Button>
      ) : (
        <Button type="submit" disabled={disabled?.sucess} className="mt-2">
          Criar conta
        </Button>
      )}
    </>
  );
}

function RegisterForm() {
  const validarParametros = (): boolean => {
    return (
      inputValues.first_name !== "" &&
      inputValues.last_name !== "" &&
      inputValues.username !== "" &&
      inputValues.email !== "" &&
      inputValues.password !== ""
    );
  };
  const router = useRouter();
  const [state, handleAction] = useFormState(createPost, undefined);

  console.log(state);
  useEffect(() => {
    console.log("entrei no use effect, o valor de state é ", state);
    state?.sucess && //
      setInputValues({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
      });
  }, [state, router]);
  const [inputValues, setInputValues] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  return (
    <form action={handleAction} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="first_name">First name</Label>
        <Input
          value={inputValues.first_name}
          placeholder="Type your first name"
          type="text"
          name="first_name"
          onChange={handleOnChange}
        ></Input>
      </div>
      <div>
        <Label htmlFor="last_name">Last name</Label>
        <Input
          value={inputValues.last_name}
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
          value={inputValues.username}
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
          value={inputValues.email}
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
          value={inputValues.password}
          id="senha"
          placeholder="Type your most discreet password"
          type="password"
          name="password"
          onChange={handleOnChange}
        ></Input>
      </div>
      <Submit disabled={state} />
      <p className="text-center">
        {state?.sucess && "Sucesso! Estamos redirecionando você para login..."}
        {state?.error}
      </p>
      {/* <div className="flex justify-center items-center gap-6 mt-2">
              <Separator></Separator>
              <span className="text-xs text-muted-foreground">OU</span>
              <Separator></Separator>
            </div>
            <Button variant="outline" className="mt-2">
              <GitHubLogoIcon className="mr-2" />
              Entrar com o GitHub
            </Button> */}
    </form>
  );
}
