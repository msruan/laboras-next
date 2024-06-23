"use client";

import { Session } from 'next-auth';
import { useFormStatus } from 'react-dom';

import { GitHubLogoIcon, ReloadIcon } from '@radix-ui/react-icons';

import { Button } from '../ui/button';

export function SubmitButton({ session }: { session: Session | null }) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button className="mt-2" disabled>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Entrando...
        </Button>
      ) : (
        <Button
          variant="outline"
          disabled={session?.user !== undefined}
          className="mt-2"
        >
          <GitHubLogoIcon className="mr-2" />
          Entrar com o GitHub
        </Button>
      )}
    </>
  );
}
