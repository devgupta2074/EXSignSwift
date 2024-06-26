import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { EdgeStoreProvider } from "@/lib/edgestore";
import Navbar from "@/components/(dashboard)/User/Navbar";

import AuthProvider from "./AuthProvider/AuthProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ overflowY: "hidden" }}>
      <body className={inter.className}>
        {/* <nav>
          <Navbar />
        </nav> */}
        <AuthProvider>
          {" "}
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
