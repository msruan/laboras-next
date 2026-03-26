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
			<div className="flex flex-col justify-center w-full items-center">
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
					className={`text-xl h-[calc(theme(fontSize.xl)*theme(lineHeight.tight))] overflow-hidden`}
				>
					Feito por{" "}
					<span className="inline-flex flex-col">
						<ul className={"block *:block *:text-[#956afa] animate-text-slide"}>
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
						<CardTitle className="text-2xl font-bold tracking-tighter">
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
