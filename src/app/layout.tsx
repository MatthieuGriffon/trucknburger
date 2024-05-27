import "../styles/font.css";
import "./globals.css";

import type { Metadata } from "next";
import ClientProvider from "../components/ClientProvider";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "TrucknBurger",
  description: "TrucknBurger, le meilleur burger de votre ville",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <ClientProvider>
          <Header />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </ClientProvider>
      </body>
    </html>
  );
}
