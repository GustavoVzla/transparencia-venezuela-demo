import Link from "next/link";
import { alertaDestacada as a, fmtUSDfull } from "@/lib/data";

export default function AlertaPage() {
  const maxVal = Math.max(...a.comparativa.map((x) => x.valor_usd));

  return (
    <>
      <Link className="back-link" href="/">
        ← Volver al panel
      </Link>
      <div className="page-title">Alerta de corrupción detectada</div>
      <div className="page-sub">
        La IA detectó esta anomalía <strong>antes</strong> del desembolso. Contrato {a.contrato_id}.
      </div>

      <div className="ia-box alto">
        <div className="ia-head">
          <div className="ia-icon">!</div>
          <div>
            <div className="ia-tag">
              {a.ministerio} · Score de riesgo {a.score}/100
            </div>
            <div className="ia-verdict">{a.titulo}</div>
          </div>
        </div>
      </div>

      <div className="section-head">Comparativa de precios</div>
      <div className="card-box">
        {a.comparativa.map((c, i) => {
          const pct = (c.valor_usd / maxVal) * 100;
          const inside = pct >= 45;
          const label = fmtUSDfull(c.valor_usd);
          return (
            <div className="compare-row" key={i}>
              <span className="compare-label">{c.etiqueta}</span>
              <div className="compare-bar-wrap">
                <div className={`compare-bar ${c.color}`} style={{ width: `${Math.max(8, pct)}%` }}>
                  {inside ? label : ""}
                </div>
                {!inside && <span className="compare-out">{label}</span>}
              </div>
            </div>
          );
        })}
        <div
          style={{
            marginTop: 14,
            paddingTop: 14,
            borderTop: "1px solid var(--line)",
            fontSize: 14,
          }}
        >
          <strong style={{ color: "var(--crimson)" }}>Sobrecosto detectado:</strong> {a.cantidad} unidades ×
          sobreprecio = <strong>{fmtUSDfull(a.sobrecosto_total_usd)}</strong> de gasto evitable.
        </div>
      </div>

      <div className="section-head">Cómo lo detectó la IA</div>
      <div className="card-box">
        <ul className="detect-list">
          {a.como_lo_detecto.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </div>

      <div className="reco-box">
        <div className="reco-label">Recomendación del sistema</div>
        <div className="reco-text">{a.recomendacion}</div>
      </div>
    </>
  );
}
