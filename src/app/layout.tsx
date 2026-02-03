import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PDV Pro Max - Gastronomia Inteligente",
  description: "O sistema PDV definitivo para o seu restaurante moderno.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
