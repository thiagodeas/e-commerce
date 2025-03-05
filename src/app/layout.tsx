import type { Metadata } from "next";
import "../styles/globals.css";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "E-commerce",
  description: "Site de compras",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#F8FAFC]">
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
