import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Providers } from "./(app)/Providers";
import HeaderComponent from "./(app)/HeaderComponent";
import { classNames } from "@/lib/helpers";
import FooterComponent from "./(app)/FooterComponent";

// The entire app uses the Inter font
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "CodeWords*",
  description:
    "Build custom software with natural language. From problem statement to deployment in minutes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={classNames(
          inter.className,
          "min-h-screen flex flex-col justify-start"
        )}
      >
        <Providers>
          <HeaderComponent />
          <main className="grow">{children}</main>
          <FooterComponent />
        </Providers>
      </body>
    </html>
  );
}
