"use client";
import "../lib/i18n"; // Import once
import "./globals.css";
import Header from "@components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
