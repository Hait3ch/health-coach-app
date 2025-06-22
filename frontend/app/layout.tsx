"use client";

import "../lib/i18n";
import "./globals.css";
import { useTranslation } from "react-i18next";
import { fiFI, enGB } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const lan = i18n.language == "fi-FI" ? fiFI : enGB;

  return (
    <ClerkProvider localization={lan}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
