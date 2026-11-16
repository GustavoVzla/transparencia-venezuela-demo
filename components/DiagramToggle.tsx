"use client";

import { useState } from "react";

export interface DiagView {
  key: string;
  tab: string;
  hint: string;
  markup: string;
}

// Toggle entre vistas del MISMO diagrama (una visible a la vez, no duplicado).
// Reemplaza wireDiagToggle() de la demo vanilla.
//
// SEGURIDAD: `markup` proviene siempre del motor de diagramas (lib/*.ts) sobre datos
// estáticos. Sin input de usuario → sin vector XSS (ver nota en SvgDiagram.tsx).
export default function DiagramToggle({ views }: { views: DiagView[] }) {
  const [active, setActive] = useState(views[0].key);
  const current = views.find((v) => v.key === active) ?? views[0];

  return (
    <>
      <div className="diag-toggle" role="tablist">
        {views.map((v) => (
          <button
            key={v.key}
            className={`diag-tab ${v.key === active ? "active" : ""}`}
            role="tab"
            aria-selected={v.key === active}
            onClick={() => setActive(v.key)}
          >
            {v.tab}
          </button>
        ))}
      </div>
      <p className="diag-hint">{current.hint}</p>
      {/* contenido estático del motor de diagramas; ver nota de seguridad arriba */}
      <div className="flow-svg-wrap" dangerouslySetInnerHTML={{ __html: current.markup }} />
    </>
  );
}
