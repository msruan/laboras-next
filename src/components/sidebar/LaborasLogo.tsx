"use client";

import Link from "next/link";
import Celebrate from "@/lib/celebrations";

export function LaborasLogo() {
	const actualCelebration = Celebrate.actualCelebration;

	return (
		<Link href={"/"}>
			{actualCelebration && <actualCelebration.launchVisuals />}
			{actualCelebration ? (
				<actualCelebration.customLogo />
			) : (
				<h2 className="font-habbo max-xl:hidden">
					L<span className="max-xl:hidden">ABORAS</span>
				</h2>
			)}
		</Link>
	);
}
