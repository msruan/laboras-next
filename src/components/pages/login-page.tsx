import { githubLoginAction } from "@/api/auth.actions";
import { SubmitButton } from "../sign/SubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import styles from "./login.module.css";

export function LoginPage() {
  return (
    <div className="space-y-12">
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className={`text-6xl ${styles.habbo} font-habbo`}>
          <span className={`${styles.letter} ${styles.l}`}>L</span>
          <span className={`${styles.letter} ${styles.a}`}>A</span>
          <span className={`${styles.letter} ${styles.b}`}>B</span>
          <span className={`${styles.letter} ${styles.o}`}>O</span>
          <span className={`${styles.letter} ${styles.r}`}>R</span>
          <span className={`${styles.letter} ${styles.a2}`}>A</span>
          <span className={`${styles.letter} ${styles.s}`}>S</span>
        </h1>
        <div
          className="h-[calc(theme(fontSize.xl)*theme(lineHeight.tight))] overflow-hidden text-xl"
        >
          Feito por{" "}
          <span className="inline-flex flex-col">
            <ul className="block animate-text-slide *:block *:text-[#956afa]">
              <li>Antonio Meireles</li>
              <li>Bianca Bezerra</li>
              <li>Halyson Itallo</li>
              <li>Hermínio Neto</li>
              <li>Lívia Tainá</li>
              <li>Ruan Macedo</li>
              <li>Ryan Faustino</li>
              <li aria-hidden="true">Antonio Meireles</li>
            </ul>
          </span>
        </div>
      </div>
      <form action={githubLoginAction}>
        <Card className="w-full max-w-md text-wrap">
          <CardHeader>
            <CardTitle className="font-bold text-2xl tracking-tighter">
              Entre por sua conta em risco
            </CardTitle>
            <CardDescription className="text-purple-300">
              Novo por aqui? É o mesmo botão
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <SubmitButton />
          </CardContent>

          <CardFooter>
            <p className="text-center text-muted-foreground text-sm text-wrapp">
              Ao entrar em nossa plataforma, você concorda que roubemos todos os
              seus dados.
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
