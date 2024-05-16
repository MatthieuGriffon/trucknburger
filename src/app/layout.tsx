import "../styles/font.css";
import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TrucknBurger",
  description: "TrucknBurger, le meilleur burger de votre ville",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body >{children}</body>
    </html>
  );
}
