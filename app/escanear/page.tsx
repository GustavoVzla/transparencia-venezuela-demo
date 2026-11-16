"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { contratoById, fmtUSDfull } from "@/lib/data";

type Fase = "consultando" | "verificado";

// Página de "resultado de escaneo" — lo que ve el ciudadano tras escanear el QR.
// Móvil-first e inmersiva: simula la consulta a la cadena y muestra el registro.
function EscanearContent() {
  const params = useSearchParams();
  const c = contratoById(params.get("id") || "VE-INF-2026-0264");
  const [fase, setFase] = useState<Fase>("consultando");

  useEffect(() => {
    const t = setTimeout(() => setFase("verificado"), 1600);
    return () => clearTimeout(t);
  }, []);

  const coincide = c.estado !== "ALERTA"; // en alerta, el papel NO coincide con la cadena

  return (
    <div className="scan-screen">
      <div className="scan-card">
        <div className="scan-brand">
          <span className="dot">●</span> Transparencia Venezuela
        </div>

        {fase === "consultando" ? (
          <div className="scan-loading">
            <div className="scan-spinner" />
            <div className="scan-loading-txt">Consultando la blockchain…</div>
            <div className="scan-loading-sub">Verificando el registro original e inmutable</div>
          </div>
        ) : (
          <>
            <div className={`scan-seal ${coincide ? "ok" : "bad"}`}>
              <div className="scan-seal-icon">{coincide ? "✓" : "⚠"}</div>
              <div className="scan-seal-txt">{coincide ? "Registro auténtico" : "Registro bajo alerta"}</div>
              <div className="scan-seal-sub">
                {coincide
                  ? "El contrato existe en la cadena y no ha sido modificado."
                  : "Existe en la cadena, pero la IA detectó una anomalía de precio."}
              </div>
            </div>

            <div className="scan-detail">
              <div className="scan-row scan-row-title">{c.titulo}</div>
              <div className="scan-row">
                <span>Identificador</span>
                <strong>{c.id}</strong>
              </div>
              <div className="scan-row">
                <span>Ministerio</span>
                <strong>{c.ministerio}</strong>
              </div>
              <div className="scan-row">
                <span>Proveedor</span>
                <strong>{c.proveedor}</strong>
              </div>
              <div className="scan-row">
                <span>Monto sellado</span>
                <strong className="scan-amount">{fmtUSDfull(c.monto_usd)}</strong>
              </div>
              <div className="scan-row">
                <span>Bloque · red</span>
                <strong>
                  #{c.bloque.toLocaleString("es")} · Polygon
                </strong>
              </div>
              <div className="scan-hash">{c.hash}</div>
            </div>

            <Link className="scan-cta" href={`/contrato?id=${c.id}`}>
              Ver expediente completo →
            </Link>
            <Link className="scan-back" href="/verificar">
              ← Volver a verificación
            </Link>
          </>
        )}

        <div className="scan-foot">Demo conceptual · datos simulados · GT Dev Solutions</div>
      </div>
    </div>
  );
}

export default function EscanearPage() {
  return (
    <Suspense fallback={null}>
      <EscanearContent />
    </Suspense>
  );
}
