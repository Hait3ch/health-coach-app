import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Health Coach App",
  description: "Created by Haitech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
