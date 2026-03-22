import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lyvora - Global Health Access Platform",
  description:
    "Connecting patients and doctors worldwide. Find available doctors near you in real-time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
