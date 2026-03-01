import "@/global.css";

import localFont from "next/font/local";

import { Metadata } from "next";
import RootProvider from "./providers";
import { ReactNode } from "react";

const habboFont = localFont({
  src: "../../public/fonts/HabboFont.ttf",
  display: "swap",
  variable: "--font-habbo",
});

export const metadata: Metadata = {
  title: "Laboras",
  description: "A Piauian social network"
}

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${habboFont.variable} font-sans h-full`}>
      <body className="h-full">
        <RootProvider
        >
          <main>{children}</main>
        </RootProvider>
      </body>
    </html>
  );
}
