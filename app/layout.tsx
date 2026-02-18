import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import React from "react";

export const metadata: Metadata = {
  title: "DevFlow",
  description: "Task scheduling and messaging platform for software teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
      <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
