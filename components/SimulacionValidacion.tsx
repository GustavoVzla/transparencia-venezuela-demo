"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import type { Flujo } from "@/lib/flujos";

interface SimLine {
  txt: string;
  ok: boolean;
  warn?: boolean;
}

// Porta wireSimulacion(f): anima la cadena de certificación al pulsar el botón.
export default function SimulacionValidacion({ f }: { f: Flujo }) {
  const [lines, setLines] = useState<SimLine[]>([]);
  const [state, setState] = useState<"idle" | "running" | "done">("idle");
  const contRef = useRef<HTMLDivElement>(null);

  const cadena: SimLine[] = [
    { txt: "Ministerio firma el contrato con su credencial", ok: true },
    { txt: "Sistema verifica que la credencial está autorizada por la Raíz", ok: true },
    { txt: "IA analiza el precio contra el mercado…", ok: true, warn: f.kpis.alerta > 0 },
    {
      txt:
        f.riesgo === "alto" || f.riesgo === "medio"
          ? "⚠ Anomalía → enviado a auditoría sectorial"
          : "Sin anomalías detectadas",
      ok: f.riesgo === "bajo",
      warn: f.riesgo !== "bajo",
    },
    { txt: "Contrato sellado en blockchain (hash inmutable)", ok: true },
    { txt: "Disponible para verificación ciudadana vía QR", ok: true },
  ];

  function ejecutar() {
    if (state === "done") {
      window.location.reload();
      return;
    }
    setState("running");
    setLines([]);
    cadena.forEach((c, i) => {
      setTimeout(
        () => {
          setLines((prev) => [...prev, c]);
          // anima la última línea añadida
          requestAnimationFrame(() => {
            const el = contRef.current?.lastElementChild;
            if (el) gsap.from(el, { opacity: 0, x: -12, duration: 0.4 });
          });
          if (i === cadena.length - 1) setState("done");
        },
        700 * (i + 1),
      );
    });
  }

  const btnLabel =
    state === "running"
      ? "Validando…"
      : state === "done"
        ? "✓ Validación completada — reiniciar"
        : "▶ Ejecutar validación de este contrato";

  return (
    <div className="card-box sim-box">
      <div className="sim-caso">
        <strong>Caso de ejemplo:</strong> {f.caso.titulo} <span className="sim-id">({f.caso.id})</span>
      </div>
      <div className="sim-detalle">{f.caso.detalle}</div>
      <button className="sim-btn" onClick={ejecutar} disabled={state === "running"}>
        {btnLabel}
      </button>
      <div className="sim-steps" ref={contRef}>
        {lines.map((c, i) => (
          <div key={i} className={`sim-line ${c.warn ? "sim-warn" : c.ok ? "sim-ok" : "sim-bad"}`}>
            <span className="sim-dot" />
            {c.txt}
          </div>
        ))}
      </div>
    </div>
  );
}
