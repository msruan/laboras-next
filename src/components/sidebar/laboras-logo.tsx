"use client";

import Link from "next/link";
import Celebrate from "@/lib/celebrations";

export function LaborasLogo() {
	const actualCelebration = Celebrate.actualCelebration;

	return (
		<Link href={"/"} className="text-5xl">
			{actualCelebration && <actualCelebration.launchVisuals />}
			{actualCelebration ? (
				<actualCelebration.customLogo />
			) : (
				<h2 className="font-habbo">
					L<span className="max-xl:hidden">ABORAS</span>
				</h2>
			)}
		</Link>
	);
}
