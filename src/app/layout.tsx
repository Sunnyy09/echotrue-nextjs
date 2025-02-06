import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import {
  geistSans,
  geistMono,
  poppins,
  openSans,
  pacifico,
  notoSerif,
  roboto,
  lora,
  kanit,
} from "@/styles/fonts";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

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
    <html lang="en">
      <AuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${openSans.variable} ${pacifico.variable} ${notoSerif.variable} ${roboto.variable} ${lora.variable} ${kanit.variable} antialiased`}
        >
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
