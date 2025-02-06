import {
  Geist,
  Geist_Mono,
  Poppins,
  Open_Sans,
  Pacifico,
  Noto_Serif,
  Roboto,
  Lora,
  Kanit,
} from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const openSans = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const pacifico = Pacifico({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-pacifico",
});

export const notoSerif = Noto_Serif({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-noto-serif",
});

export const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const lora = Lora({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-lora",
});

export const kanit = Kanit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-kaint",
});
