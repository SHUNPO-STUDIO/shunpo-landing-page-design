import type { Metadata } from "next";
import { Hanken_Grotesk, Piazzolla, Shippori_Mincho } from "next/font/google";

import { Providers } from "./providers";

import "./globals.css";

const sans = Hanken_Grotesk({ variable: "--font-family-sans", subsets: ["latin"] });
const display = Piazzolla({ variable: "--font-family-display", subsets: ["latin"] });
const kanji = Shippori_Mincho({
  variable: "--font-family-kanji",
  subsets: ["latin"],
  weight: "500",
  preload: false,
});
const fontVariables = [sans, display, kanji].map((font) => font.variable).join(" ");

export const metadata: Metadata = {
  title: "SHUNPO · Logiciels métier sur mesure, automatisations et IA pour les PME",
  description:
    "SHUNPO construit le système qui fait tourner votre entreprise : logiciels métier sur mesure, automatisations et IA pour les PME de 20 à 250 salariés. Une équipe à Lyon, sur le terrain avec vous.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={fontVariables}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
