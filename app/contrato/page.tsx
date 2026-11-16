"use client";

import { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { contratoById, fmtUSDfull, riesgoColor, estadoBadge } from "@/lib/data";

function ContratoContent() {
  const params = useSearchParams();
  const c = contratoById(params.get("id") || "VE-SAL-2026-0312");
  const b = estadoBadge(c.estado);
  const fillRef = useRef<HTMLDivElement>(null);

  // Barra de score: nace en 0% y se rellena con la transición CSS de .ia-score-fill.
  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.width = c.analisis_ia.score + "%";
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [c.analisis_ia.score]);

  return (
    <>
      <Link className="back-link" href="/">
        ← Volver al panel
      </Link>
      <div className="contract-top">
        <div>
          <div className="page-title" style={{ marginBottom: 2 }}>
            {c.titulo}
          </div>
          <div className="contract-id">{c.id}</div>
        </div>
        <span className="badge" style={{ background: b.bg }}>
          {b.txt}
        </span>
      </div>

      <div className="card-box" style={{ marginTop: 16 }}>
        <div className="contract-meta" style={{ fontSize: 14, gap: "12px 24px" }}>
          <span>
            <strong>Ministerio:</strong> {c.ministerio}
          </span>
          <span>
            <strong>Proveedor:</strong> {c.proveedor}
          </span>
          <span>
            <strong>Fecha:</strong> {c.fecha}
          </span>
        </div>
        <div className="contract-amount" style={{ fontSize: 28, marginTop: 12 }}>
          {fmtUSDfull(c.monto_usd)}
        </div>
      </div>

      <div className="blockchain-box">
        <div className="bc-label">⛓ Registro en blockchain · inmutable</div>
        <div className="bc-hash">{c.hash}</div>
        <div className="bc-meta">
          <div className="bc-meta-item">
            Bloque<strong>#{c.bloque.toLocaleString("es")}</strong>
          </div>
          <div className="bc-meta-item">
            Estado<strong>Confirmado</strong>
          </div>
          <div className="bc-meta-item">
            Red<strong>Polygon</strong>
          </div>
        </div>
        <div className="bc-immutable">🔒 Este registro no puede ser borrado ni modificado por nadie.</div>
      </div>

      <div className="section-head">Análisis automático de IA</div>
      <div className={`ia-box ${c.riesgo}`}>
        <div className="ia-head">
          <div className="ia-icon">◆</div>
          <div>
            <div className="ia-tag">Veredicto IA</div>
            <div className="ia-verdict">{c.analisis_ia.veredicto}</div>
          </div>
        </div>
        <div className="ia-detail">{c.analisis_ia.detalle}</div>
        <div className="ia-score">
          <span style={{ fontSize: 12, color: "var(--paper-mute)", fontWeight: 600 }}>Riesgo</span>
          <div className="ia-score-bar">
            <div ref={fillRef} className="ia-score-fill" style={{ width: "0%", background: riesgoColor(c.riesgo) }} />
          </div>
          <span className="ia-score-num" style={{ color: riesgoColor(c.riesgo) }}>
            {c.analisis_ia.score}
          </span>
        </div>
      </div>

      <div className="section-head">Trazabilidad completa</div>
      <div className="card-box">
        <div className="timeline">
          {c.timeline.map((t, i) => (
            <div className="tl-item" key={i}>
              <span className="tl-time">{t.fecha}</span>
              <span className="tl-event">
                <span className={`tl-dot ${t.tipo}`} />
                {t.evento}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function ContratoPage() {
  return (
    <Suspense fallback={null}>
      <ContratoContent />
    </Suspense>
  );
}
