import "@/global.css";

import localFont from "next/font/local";

import { ThemeProvider } from "@/components/ui/theme-provider";

// Font files can be colocated inside of `app`
const habboFont = localFont({
  src: "./../assets/habbo-font/HabboFont.ttf",
  display: "swap",
  variable: "--font-habbo",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${habboFont.variable} font-sans h-full`}>
      <head>
        <title>Laboras</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="h-full">
        {/* Layout UI */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
