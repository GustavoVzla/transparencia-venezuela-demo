import type { Metadata } from "next";
import "./globals.css";
import Chrome from "@/components/Chrome";
import Footer from "@/components/Footer";
import Animations from "@/components/Animations";

export const metadata: Metadata = {
  title: "Transparencia Venezuela · Demo conceptual",
  description:
    "Panel ciudadano: cada contrato del Estado sellado en blockchain y revisado por IA antes de mover el dinero. Demo conceptual con datos simulados.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,900;1,9..144,500&family=Archivo:wght@400;500;600;700&family=Spline+Sans+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Chrome />
        <main className="container">{children}</main>
        <Footer />
        <Animations />
      </body>
    </html>
  );
}
