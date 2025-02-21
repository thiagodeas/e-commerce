import type { Metadata } from "next";
import "../styles/globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "E-commerce",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#f3f4f6]">
        <Header />
        {children}
      </body>
    </html>
  );
}
