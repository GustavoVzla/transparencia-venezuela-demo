import Link from "next/link";
import { resumen, ministerios, contratos, fmtUSD, fmtUSDfull, riesgoColor, riesgoLabel, estadoBadge } from "@/lib/data";

export default function Dashboard() {
  return (
    <>
      <div className="page-title">
        Cada dólar público,
        <br />
        imposible de esconder.
      </div>
      <div className="page-sub">
        Panel ciudadano en tiempo real. Cada contrato del Estado queda <strong>sellado en blockchain</strong> y revisado
        por <strong>inteligencia artificial</strong> antes de que se mueva el dinero.
      </div>

      <div className="kpi-grid">
        <div className="kpi">
          <div className="kpi-value">{resumen.contratos_monitoreados.toLocaleString("es")}</div>
          <div className="kpi-label">Contratos monitoreados</div>
        </div>
        <div className="kpi">
          <div className="kpi-value">{fmtUSD(resumen.monto_total_usd)}</div>
          <div className="kpi-label">Monto total en blockchain</div>
        </div>
        <div className="kpi red">
          <div className="kpi-value">{resumen.alertas_activas}</div>
          <div className="kpi-label">Alertas activas ({resumen.alertas_criticas} críticas)</div>
        </div>
        <div className="kpi green">
          <div className="kpi-value">{fmtUSD(resumen.ahorro_estimado_usd)}</div>
          <div className="kpi-label">En contratos bajo alerta (riesgo estimado)</div>
        </div>
      </div>

      <div className="section-head">Riesgo por ministerio</div>
      {ministerios.map((m) => (
        <div className="ministry" key={m.id}>
          <div className="ministry-info">
            <div className="ministry-name">{m.nombre}</div>
            <div className="ministry-meta">
              {m.contratos} contratos · {fmtUSD(m.monto_usd)} · {m.alertas} alertas
            </div>
          </div>
          <span className="risk-chip" style={{ color: riesgoColor(m.riesgo), borderColor: riesgoColor(m.riesgo) }}>
            Riesgo {riesgoLabel(m.riesgo)}
          </span>
        </div>
      ))}

      <div className="section-head">Contratos recientes</div>
      {contratos.map((c) => {
        const b = estadoBadge(c.estado);
        return (
          <Link className="contract-card" href={`/contrato?id=${c.id}`} key={c.id}>
            <div className="contract-top">
              <div>
                <div className="contract-title">{c.titulo}</div>
                <div className="contract-id">{c.id}</div>
              </div>
              <span className="badge" style={{ background: b.bg }}>
                {b.txt}
              </span>
            </div>
            <div className="contract-meta">
              <span>
                <strong>{c.ministerio}</strong>
              </span>
              <span>{c.proveedor}</span>
            </div>
            <div
              className="contract-meta"
              style={{ marginTop: 8, alignItems: "center", justifyContent: "space-between" }}
            >
              <span className="contract-amount">{fmtUSDfull(c.monto_usd)}</span>
              <span style={{ fontFamily: "'Spline Sans Mono',monospace", fontSize: 11, color: "var(--paper-mute)" }}>
                {c.fecha}
              </span>
            </div>
          </Link>
        );
      })}
    </>
  );
}
