import type { Metadata } from "next";
import { Coustard, Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const coustard = Coustard({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-coustard",
});

export const metadata: Metadata = {
  title: "My Animal Crossing Island",
  description:
    "Showcase of my Animal Crossing: New Horizons island and its villagers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${coustard.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
