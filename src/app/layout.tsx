import "@/global.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import RootProvider from "./providers";

const habboFont = localFont({
	src: "../../public/fonts/HabboFont.ttf",
	display: "swap",
	variable: "--font-habbo",
});

export const metadata: Metadata = {
	title: "Laboras",
	description: "A Piauian social network",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html
			lang="en"
			className={`${habboFont.variable} font-sans h-full`}
			suppressHydrationWarning
		>
			<body className="h-full">
				<RootProvider>
					<main>{children}</main>
				</RootProvider>
			</body>
		</html>
	);
}
