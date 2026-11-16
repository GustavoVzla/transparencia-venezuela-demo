"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Labels cortos para que las 10 secciones quepan en una línea sin scroll/corte.
// El nombre completo de cada sección vive en su <h1> y en los cross-links.
const TABS = [
  { href: "/", label: "Dashboard" },
  { href: "/presupuesto", label: "Presupuesto" },
  { href: "/instituciones", label: "Instituciones" },
  { href: "/gobernanza", label: "Gobernanza" },
  { href: "/arquitectura", label: "Arquitectura" },
  { href: "/ministerios", label: "Ministerios" },
  { href: "/precedentes", label: "Precedentes" },
  { href: "/contrato", label: "Contrato" },
  { href: "/alerta", label: "Alerta IA" },
  { href: "/verificar", label: "Verificación" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Chrome() {
  const pathname = usePathname();
  return (
    <>
      <div className="demo-banner">⚠ DEMO CONCEPTUAL · Datos simulados con fines demostrativos</div>
      <header className="app-header">
        <div className="app-header-inner">
          <div className="brand">
            <span>
              <span className="dot">●</span> Transparencia Venezuela
              <small>Sistema Blockchain + IA</small>
            </span>
          </div>
        </div>
      </header>
      <nav className="nav-tabs">
        {TABS.map((t) => (
          <Link key={t.href} className={`nav-tab ${isActive(pathname, t.href) ? "active" : ""}`} href={t.href}>
            {t.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
