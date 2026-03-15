'use client'

import Celebrate from "@/lib/celebrations"
import Link from "next/link";

export function LaborasLogo() {
  const actualCelebration = Celebrate.actualCelebration;

  return (
    <Link href={"/"}>
      {actualCelebration && <actualCelebration.launchVisuals />}
      {actualCelebration ? (
        <actualCelebration.customLogo />
      ) : (
        <h2 className="max-xl:hidden font-habbo">
          L<span className="max-xl:hidden">ABORAS</span>
        </h2>
      )}
    </Link>
  )
}