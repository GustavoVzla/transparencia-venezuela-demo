import Link from "next/link";
import { GOBERNANZA, estadoCertColor } from "@/lib/gobernanza";

export default function GobernanzaPage() {
  const g = GOBERNANZA;

  return (
    <>
      <div className="page-title">Quién certifica a quién</div>
      <div className="page-sub">
        El sistema funciona como una <strong>jerarquía de confianza</strong>: el Gobierno Central es la autoridad raíz
        que autoriza a cada ministerio, y cada ministerio certifica sus propios contratos. Nadie puede falsificar su
        autoridad.
      </div>

      {/* NIVEL 0: RAÍZ */}
      <div className="section-head">Nivel 0 · Autoridad Certificadora Raíz</div>
      <div className="raiz-box">
        <div className="raiz-head">
          <div className="raiz-crown">★</div>
          <div>
            <div className="raiz-name">{g.raiz.nombre}</div>
            <div className="raiz-role">{g.raiz.rol}</div>
          </div>
        </div>
        <p className="raiz-desc">{g.raiz.descripcion}</p>
        <div className="bc-hash" style={{ marginTop: 10 }}>
          {g.raiz.clave_publica}
        </div>
        <div className="raiz-stats">
          <div>
            <span className="raiz-stat-num">{g.raiz.ministerios_autorizados}</span> ministerios autorizados
          </div>
          <div>
            <span className="raiz-stat-num">{g.raiz.ministerios_revocados}</span> revocados
          </div>
          <div>
            Constituida: <strong>{g.raiz.fecha_constitucion}</strong>
          </div>
        </div>
        <div className="raiz-poderes">
          <div className="raiz-poderes-lbl">Poderes de la Autoridad Raíz</div>
          <ul>
            {g.raiz.poderes.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="jerarquia-conector">
        <span>delega y autoriza ↓</span>
      </div>

      {/* NIVEL 1: DELEGADOS */}
      <div className="section-head">Nivel 1 · Certificadores Delegados (Ministerios)</div>
      <div className="cert-grid">
        {g.certificadores.map((c) => {
          const color = estadoCertColor(c.estado);
          const pctValidos = Math.round((c.contratos_firmados_validos / c.contratos_certificados) * 100);
          return (
            <div className="cert-card" key={c.id}>
              <div className="cert-card-head">
                <div>
                  <div className="cert-name">{c.nombre}</div>
                  <div className="cert-role">{c.rol}</div>
                </div>
                <span className="cert-estado" style={{ color, borderColor: color }}>
                  {c.estado}
                </span>
              </div>
              <div className="cert-credential">
                <span className="cert-cred-label">Credencial certificadora</span>
                <span className="cert-cred-hash">{c.credencial}</span>
                <span className="cert-signed">✓ firmada por la Autoridad Raíz · vigente hasta {c.vigencia}</span>
              </div>
              <div className="cert-stats">
                <div className="cert-stat">
                  <span className="cert-stat-num">{c.contratos_certificados}</span>
                  <span className="cert-stat-lbl">contratos certificados</span>
                </div>
                <div className="cert-stat">
                  <span className="cert-stat-num" style={{ color: "var(--jade)" }}>
                    {pctValidos}%
                  </span>
                  <span className="cert-stat-lbl">firmas válidas</span>
                </div>
                <div className="cert-stat">
                  <span
                    className="cert-stat-num"
                    style={{ color: c.contratos_en_alerta > 5 ? "var(--crimson)" : "var(--gold)" }}
                  >
                    {c.contratos_en_alerta}
                  </span>
                  <span className="cert-stat-lbl">en alerta</span>
                </div>
              </div>
              <div className="cert-meta">
                <div>
                  <strong>Ámbito:</strong> {c.ambito}
                </div>
                <div>
                  <strong>Responsable:</strong> {c.responsable_tecnico}
                </div>
                {c.nota_supervision && <div className="cert-nota">⚠ {c.nota_supervision}</div>}
              </div>
            </div>
          );
        })}
      </div>

      {/* ACTIVIDAD DE LA RAÍZ */}
      <div className="section-head">Actividad de la Autoridad Raíz</div>
      <div className="card-box">
        <div className="timeline">
          {g.eventos_raiz
            .slice()
            .reverse()
            .map((e, i) => (
              <div className="tl-item" key={i}>
                <span className="tl-time">{e.fecha}</span>
                <span className="tl-event">
                  <span
                    className={`tl-dot ${e.tipo === "supervision" ? "alerta" : e.tipo === "genesis" ? "blockchain" : "ok"}`}
                  />
                  {e.evento}
                </span>
              </div>
            ))}
        </div>
      </div>

      <div className="reco-box">
        <div className="reco-label">La clave del modelo</div>
        <div className="reco-text">
          Un ministerio <strong style={{ color: "#fff" }}>no puede</strong> certificar contratos de otro, ni inventarse
          su propia autoridad. Cada contrato lleva doble validación: la firma del ministerio{" "}
          <strong style={{ color: "#fff" }}>y</strong> la garantía de que ese ministerio está autorizado por la raíz. Si
          un ministerio cae en corrupción sistémica, la raíz le revoca la autoridad — pero los contratos válidos ya
          emitidos siguen verificables para siempre.
        </div>
      </div>

      <div className="xref-box">
        <span className="xref-label">¿Cómo se garantiza esto técnicamente?</span>
        Esta jerarquía no depende de confiar en una base de datos: es una <strong>cadena de firmas criptográficas</strong>{" "}
        (ECDSA) que cualquiera verifica on-chain. Mira el mecanismo en{" "}
        <Link href="/arquitectura#pki">Arquitectura · firma y cadena de confianza →</Link>
      </div>
    </>
  );
}
