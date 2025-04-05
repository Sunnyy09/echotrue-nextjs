import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/app/Navbar";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Echotrue – Speak Freely, Anonymously",
  description:
    "Echotrue is a platform where anyone can send you anonymous messages through your personal link. Share your profile and uncover honest thoughts, feedback, or just a little mystery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />

      {children}
    </>
  );
}
