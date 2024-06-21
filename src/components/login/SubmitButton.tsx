"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button className="mt-2" disabled>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Entrando...
        </Button>
      ) : (
        <Button type="submit" className="mt-2">
          Entrar
        </Button>
      )}
    </>
  );
}
