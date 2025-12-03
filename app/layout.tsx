import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Varanasi Travel Survey - Sacred Walks Travel",
  description: "Share your Varanasi travel experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}