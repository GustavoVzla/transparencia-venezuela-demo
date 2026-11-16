import Link from "next/link";
import {
  FUENTES_INGRESO,
  PASOS_DINERO,
  ETAPAS_GASTO,
  PARTIDAS_DEMO,
  PRESUPUESTO_TOTAL_USD,
  faseColor,
  faseLabel,
  type PasoDinero,
} from "@/lib/presupuesto";
import { fmtUSD } from "@/lib/data";

function PasoFlujo({ p }: { p: PasoDinero }) {
  const c = faseColor(p.fase);
  return (
    <div className="dinero-paso" style={{ borderLeftColor: c }}>
      <div className="dinero-paso-head">
        <span className="dinero-num" style={{ background: c }}>
          {p.n}
        </span>
        <div>
          <div className="dinero-titulo">{p.titulo}</div>
          <div className="dinero-organismo">{p.organismo}</div>
        </div>
        <span className="dinero-fase" style={{ color: c, borderColor: c }}>
          {faseLabel(p.fase)}
        </span>
      </div>
      <div className="dinero-controla">
        <span className="dinero-lbl">El sistema verifica</span>
        {p.controla}
      </div>
      {p.fuga && (
        <div className="dinero-fuga">
          <span className="dinero-lbl" style={{ color: "var(--crimson)" }}>
            Punto de fuga que cierra
          </span>
          {p.fuga}
        </div>
      )}
      <div className="dinero-prec">
        <span className="prec-badge" style={{ color: "var(--jade)", borderColor: "var(--jade)" }}>
          ✓ {p.precedente}
        </span>
      </div>
    </div>
  );
}

export default function PresupuestoPage() {
  return (
    <>
      <div className="page-title">El flujo del dinero público</div>
      <p className="page-sub">
        De dónde viene cada dólar y hacia dónde va: quién es responsable en cada paso y qué mecanismo de control lo
        vigila. La estructura institucional <strong>ya existe en la ley</strong> venezolana (ONAPRE, Tesorería,
        Contraloría) — el sistema le pone la <strong>trazabilidad pública</strong> que hoy no tiene.
      </p>

      <div className="card-box arch-disclaimer" style={{ marginBottom: 22 }}>
        El presupuesto nacional no se publica desde 2016 y la ejecución del gasto hace ~16 años. El aparato formal es
        robusto sobre el papel; opera a oscuras. Datos simulados con esa estructura real.
      </div>

      {/* ===== DE DÓNDE VIENE ===== */}
      <div className="section-head">De dónde viene · fuentes de ingreso</div>
      <p className="arch-lead">
        El dinero del Estado entra por cuatro grandes fuentes. Cada ingreso se registra de forma inmutable con su
        clasificación correcta, para que no se reclasifique y se evada el reparto a estados y municipios.
      </p>
      <div className="fuente-grid">
        {FUENTES_INGRESO.map((f, i) => (
          <div className="fuente-card" key={i}>
            <div className="fuente-top">
              <span className="fuente-nombre">{f.nombre}</span>
              <span className="fuente-pct">{f.pct}%</span>
            </div>
            <div className="fuente-bar-track">
              <div className="fuente-bar" style={{ width: `${f.pct}%` }} />
            </div>
            <div className="fuente-org">{f.organismo}</div>
            <div className="fuente-nota">{f.nota}</div>
          </div>
        ))}
      </div>

      {/* ===== EL RECORRIDO ===== */}
      <div className="section-head">El recorrido · de la entrada al desembolso</div>
      <p className="arch-lead">
        Ocho pasos del dinero público, con el organismo real responsable en cada uno. El sistema ancla un control
        verificable en cada eslabón — y cada control replica un mecanismo <strong>ya en producción</strong> en otro
        gobierno (ver <Link href="/precedentes">Probado en el mundo</Link>).
      </p>
      {PASOS_DINERO.map((p) => (
        <PasoFlujo p={p} key={p.n} />
      ))}

      {/* ===== ETAPAS DEL GASTO ===== */}
      <div className="section-head">Cómo se gasta · las tres etapas</div>
      <p className="arch-lead">
        Dentro de la ejecución, todo gasto público recorre tres etapas legales. La corrupción se esconde en las{" "}
        <strong>brechas</strong> entre ellas: dinero comprometido sin obra, u obra recibida sin pagar — o pagada sin
        existir.
      </p>
      <div className="etapa-grid">
        {ETAPAS_GASTO.map((e, i) => (
          <div className="etapa-card" key={i}>
            <span className="etapa-num">{i + 1}</span>
            <div className="etapa-nombre">{e.etapa}</div>
            <div className="etapa-def">{e.def}</div>
          </div>
        ))}
      </div>

      {/* ===== PARTIDAS ===== */}
      <div className="section-head">Partidas por ministerio · seguimiento en vivo</div>
      <p className="arch-lead">
        Cada ministerio recibe su asignación y la ejecuta. El sistema sigue el dinero asignado → comprometido → causado →
        pagado, y enciende una alerta cuando las brechas no cuadran con las metas físicas.
      </p>
      <div className="card-box" style={{ padding: 0, overflow: "hidden" }}>
        <table className="partida-table">
          <thead>
            <tr>
              <th>Ministerio</th>
              <th>Asignado</th>
              <th>Comprometido</th>
              <th>Causado</th>
              <th>Pagado</th>
            </tr>
          </thead>
          <tbody>
            {PARTIDAS_DEMO.map((p, i) => (
              <tr key={i} className={p.alerta ? "partida-alerta" : ""}>
                <td data-label="Ministerio">
                  <strong>{p.ministerio}</strong>
                  {p.alerta && <div className="partida-nota">⚠ {p.alerta}</div>}
                </td>
                <td data-label="Asignado">{fmtUSD(p.asignado_usd)}</td>
                <td data-label="Comprometido">{fmtUSD(p.comprometido_usd)}</td>
                <td data-label="Causado">{fmtUSD(p.causado_usd)}</td>
                <td data-label="Pagado">{fmtUSD(p.pagado_usd)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td data-label="Total">
                <strong>Total nacional</strong>
              </td>
              <td colSpan={4}>
                <strong style={{ color: "var(--gold)" }}>{fmtUSD(PRESUPUESTO_TOTAL_USD)}</strong> asignados (simulado)
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="xref-box">
        <span className="xref-label">¿Quién certifica a las empresas que reciben este dinero?</span>
        El dinero termina en contratos con proveedores. Cómo se registran, certifican e inhabilitan esas empresas — y
        cómo se detecta a los testaferros — está en{" "}
        <Link href="/instituciones">Instituciones y empresas →</Link>
      </div>

      <div className="card-box arch-disclaimer">
        Estructura basada en la Ley Orgánica de la Administración Financiera del Sector Público (LOAFSP). Organismos
        reales, cifras simuladas con fines demostrativos.
      </div>
    </>
  );
}
