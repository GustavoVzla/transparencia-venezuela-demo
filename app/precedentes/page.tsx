import { PRECEDENTES, type PrecedentePieza } from "@/lib/precedentes";

function Tarjeta({ p }: { p: PrecedentePieza }) {
  return (
    <div className="prec-card" style={{ borderLeftColor: p.color }}>
      <div className="prec-head">
        <span className="prec-pieza">{p.pieza}</span>
        <span className="prec-badge" style={{ color: p.color, borderColor: p.color }}>
          {p.precedente} · {p.desde}
        </span>
      </div>
      <div className="prec-mec">
        <span className="prec-lbl">Cómo funciona</span>
        {p.mecanismo}
      </div>
      <div className="prec-prueba">
        <span className="prec-lbl">Probado</span>
        {p.prueba}
      </div>
      <div className="prec-replica">
        <span className="prec-lbl" style={{ color: p.color }}>
          Lo replicamos así
        </span>
        {p.replica}
      </div>
    </div>
  );
}

export default function PrecedentesPage() {
  return (
    <>
      <div className="page-title">Probado en el mundo</div>
      <p className="page-sub">
        No es un experimento. Cada pieza de este sistema replica un{" "}
        <strong>mecanismo que ya funciona en producción</strong> en otro gobierno. No prometemos tecnología nueva:
        aplicamos a Venezuela lo que ya redujo la corrupción en otros países.
      </p>

      <div className="section-head">Registro inmutable en blockchain</div>
      <p className="arch-lead">
        El patrón que comparten todos: <strong>nunca se sube el documento a la cadena, solo su huella (hash)</strong>. La
        blockchain prueba que el contrato existió, cuándo, y que no cambió.
      </p>
      <div className="prec-grid">
        {PRECEDENTES.blockchain.map((p, i) => (
          <Tarjeta p={p} key={i} />
        ))}
      </div>

      <div className="section-head">IA anti-corrupción</div>
      <p className="arch-lead">
        El patrón que comparten: <strong>detectar antes de la firma</strong>. Ingesta diaria de datos → indicadores de
        riesgo + cruce de bases → alerta al auditor humano, que decide.
      </p>
      <div className="prec-grid">
        {PRECEDENTES.ia.map((p, i) => (
          <Tarjeta p={p} key={i} />
        ))}
      </div>

      <div className="section-head">No reinventamos la rueda</div>
      <p className="arch-lead">
        Adoptamos estándares y librerías abiertas ya battle-tested. Menos riesgo, más rápido, compatible con el resto del
        mundo.
      </p>
      <div className="reuso-grid">
        {PRECEDENTES.reutilizado.map((r, i) => (
          <div className="reuso-card" key={i}>
            <div className="reuso-nombre">{r.nombre}</div>
            <div className="reuso-desc">{r.desc}</div>
          </div>
        ))}
      </div>

      <div className="card-box arch-disclaimer">
        Los mecanismos descritos corresponden a sistemas reales en producción (fuentes: Guardtime, Exonum/Bitfury,
        Stellar/UNHCR, CGU-TCU Brasil, UK NFI, World Bank GRAS, Open Contracting Partnership). Demo conceptual: nuestra
        implementación para Venezuela está en desarrollo.
      </div>
    </>
  );
}
