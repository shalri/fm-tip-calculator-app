import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const spacemono = Space_Mono({ subsets: ["latin"], weight: "700" });

export const metadata: Metadata = {
  title: "Tip Calculator App  | FScode",
  description:
    "Solution for the Tip Calculator App challenge from Frontend Mentor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spacemono.className} grid min-h-dvh grid-cols-1 place-items-start bg-tc-light-grayish text-base sm:place-items-center`}
      >
        {children}
      </body>
    </html>
  );
}
