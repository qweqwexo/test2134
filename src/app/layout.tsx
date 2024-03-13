import RootProvider from "./store/RootProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo Apfsp"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <RootProvider>
        <body className={inter.className}>
          {children}
        </body>
      </RootProvider>
    </html>
  );
}
