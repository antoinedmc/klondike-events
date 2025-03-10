import type { Metadata } from "next";
import { Bebas_Neue, Mrs_Saint_Delafield } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font--bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const saintDelafield = Mrs_Saint_Delafield({
  variable: "--font--saint-delafield",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Klondike Events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${saintDelafield.variable} `}>
        {children}
      </body>
    </html>
  );
}
