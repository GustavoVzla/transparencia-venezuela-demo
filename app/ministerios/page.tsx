"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { GOBERNANZA } from "@/lib/gobernanza";
import { FLUJOS, flujoAcento, type Flujo } from "@/lib/flujos";
import { svgSerpienteMinisterio } from "@/lib/diagrama-svg";
import { riesgoLabel } from "@/lib/data";
import DiagramToggle from "@/components/DiagramToggle";
import SimulacionValidacion from "@/components/SimulacionValidacion";

function MinisteriosContent() {
  const params = useSearchParams();
  const m = params.get("m");
  const activo = m && FLUJOS[m] ? m : null;

  if (!activo) return <Selector />;
  return <VistaMinisterio f={FLUJOS[activo]} />;
}

export default function MinisteriosPage() {
  return (
    <Suspense fallback={null}>
      <MinisteriosContent />
    </Suspense>
  );
}

// ---- Selector: entrar como un ministerio ----
function Selector() {
  const lista = GOBERNANZA.certificadores;
  return (
    <>
      <div className="page-title">Entra como cada ministerio</div>
      <div className="page-sub">
        Cada ministerio es un <strong>certificador delegado</strong> con su propio flujo de contratación sobre la misma
        arquitectura. Entra en cualquiera para ver, paso a paso, cómo valida sus contratos —del primer solicitante al
        ciudadano— y alterna a la <strong>vista técnica</strong> para ver qué ejecuta cada paso por dentro.
      </div>
      <div className="min-select-grid">
        {lista.map((mn) => {
          const color = flujoAcento(mn.riesgo);
          const disponible = !!FLUJOS[mn.id];
          return (
            <Link
              key={mn.id}
              className={`min-select ${disponible ? "" : "min-soon"}`}
              href={disponible ? `/ministerios?m=${mn.id}` : "#"}
            >
              <div className="min-select-top">
                <div className="min-select-name">{mn.nombre}</div>
                <span className="risk-chip" style={{ color, borderColor: color }}>
                  Riesgo {riesgoLabel(mn.riesgo)}
                </span>
              </div>
              <div className="min-select-ambito">{mn.ambito}</div>
              <div className="min-select-foot">
                <span>{mn.contratos_certificados} contratos certificados</span>
                <span className="min-select-cta">
                  {disponible ? "Entrar como este ministerio →" : "En despliegue ↗"}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

// ---- Vista de un ministerio concreto ----
function VistaMinisterio({ f }: { f: Flujo }) {
  const serpData = { nombre: f.nombre, ...f.serp };
  const sector = f.nombre.replace("Ministerio de ", "").replace("Ministerio ", "");

  return (
    <>
      <Link className="back-link" href="/ministerios">
        ← Todos los ministerios
      </Link>
      <div className="min-hero" style={{ borderColor: f.acento }}>
        <div>
          <div className="min-hero-eyebrow">Certificador delegado · {f.estado}</div>
          <div className="page-title" style={{ margin: "4px 0 8px" }}>
            {f.nombre}
          </div>
          <div className="min-hero-cred">
            <span className="min-hero-cred-lbl">Credencial firmada por la Raíz</span>
            <span className="min-hero-cred-hash">{f.credencial}</span>
          </div>
        </div>
        <span className="risk-chip" style={{ color: flujoAcento(f.riesgo), borderColor: flujoAcento(f.riesgo) }}>
          Riesgo {riesgoLabel(f.riesgo)}
        </span>
      </div>

      <div className="kpi-grid" style={{ marginTop: 16 }}>
        <div className="kpi">
          <div className="kpi-value">{f.kpis.certificados}</div>
          <div className="kpi-label">Contratos certificados</div>
        </div>
        <div className="kpi">
          <div className="kpi-value">{f.kpis.monto}</div>
          <div className="kpi-label">Monto sellado</div>
        </div>
        <div className="kpi green">
          <div className="kpi-value">{f.kpis.validas}</div>
          <div className="kpi-label">Firmas válidas</div>
        </div>
        <div className="kpi">
          <div className="kpi-value">{f.kpis.alerta}</div>
          <div className="kpi-label">En alerta</div>
        </div>
      </div>

      <div className="section-head">Diagrama de flujo · sector {sector}</div>
      <DiagramToggle
        views={[
          {
            key: "operativo",
            tab: "Vista operativa",
            hint: "Qué pasa en cada paso, del primer solicitante al ciudadano.",
            markup: svgSerpienteMinisterio(serpData, "operativo"),
          },
          {
            key: "tecnico",
            tab: "Vista técnica",
            hint: "El mismo recorrido, pero qué ocurre por detrás de cada paso (la tecnología real).",
            markup: svgSerpienteMinisterio(serpData, "tecnico"),
          },
        ]}
      />
      <p className="arch-tec-foot">
        La vista técnica corre sobre la <Link href="/arquitectura">arquitectura común</Link> (IA · PKI · Polygon); el
        detalle de cada mecanismo, en <Link href="/precedentes">Probado en el mundo</Link>.
      </p>

      <div className="section-head">Simular el acto de validar un contrato</div>
      <SimulacionValidacion f={f} />

      <div className="section-head">El flujo paso a paso (específico de este sector)</div>
      {f.pasos.map((p) => (
        <div
          className={`flujo-paso flujo-${
            p.tipo === "actor"
              ? "ministerio"
              : p.tipo === "sistema"
                ? "sistema"
                : p.tipo === "chain"
                  ? "raiz"
                  : "ciudadano"
          }`}
          key={p.n}
        >
          <div className="flujo-num">{p.n}</div>
          <div className="flujo-content">
            <div className="flujo-titulo">{p.titulo}</div>
            {/* p.desc es texto estático nuestro con <strong> de énfasis; sin input de usuario (ver SvgDiagram.tsx). */}
            <div className="flujo-accion" dangerouslySetInnerHTML={{ __html: p.desc }} />
            <div className="flujo-tags">
              <span className="flujo-tag">
                <strong>Actor:</strong> {p.actor}
              </span>
              <span className="flujo-tag">
                <strong>Herramienta:</strong> {p.herramienta}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
