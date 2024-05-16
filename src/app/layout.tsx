import "../styles/font.css";
import "./globals.css";

import type { Metadata } from "next";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";


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
      <body>
      <Header />
      <Navbar />
      <main>{children}</main>
      <Footer />
      </body>
    </html>
  );
}
