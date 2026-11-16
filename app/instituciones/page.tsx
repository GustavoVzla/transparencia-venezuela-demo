import Link from "next/link";
import {
  MODALIDADES,
  PASOS_ADQUISICION,
  PROVEEDORES,
  estadoProveedorColor,
  tipoProveedorLabel,
  modalidadColor,
  type Proveedor,
  type PasoAdquisicion,
} from "@/lib/proveedores";
import { fmtUSDfull } from "@/lib/data";

function PasoAdq({ p }: { p: PasoAdquisicion }) {
  const c = p.atajo ? "var(--crimson)" : "var(--gold)";
  return (
    <div className={`adq-paso ${p.atajo ? "adq-atajo" : ""}`} style={{ borderLeftColor: c }}>
      <div className="adq-paso-head">
        <span className="adq-num" style={{ background: c, color: p.atajo ? "#fff" : "#0a1628" }}>
          {p.atajo ? "↘" : p.n}
        </span>
        <div>
          <div className="dinero-titulo">{p.titulo}</div>
          <div className="dinero-organismo">{p.organismo}</div>
        </div>
      </div>
      <div className="dinero-controla">
        <span className="dinero-lbl">El sistema verifica</span>
        {p.controla}
      </div>
      <span className="prec-badge" style={{ color: "var(--jade)", borderColor: "var(--jade)" }}>
        ✓ {p.precedente}
      </span>
    </div>
  );
}

function FichaProveedor({ p }: { p: Proveedor }) {
  const c = estadoProveedorColor(p.estado);
  return (
    <div className="prov-card" style={{ borderLeftColor: c }}>
      <div className="prov-head">
        <div>
          <div className="prov-nombre">{p.nombre}</div>
          <div className="prov-rif">
            {p.rif} · {p.rnc}
          </div>
        </div>
        <span className="prov-estado" style={{ color: c, borderColor: c }}>
          {p.estado}
        </span>
      </div>
      <div className="prov-meta">
        <div>
          <span className="prov-lbl">Tipo</span>
          {tipoProveedorLabel(p.tipo)}
        </div>
        <div>
          <span className="prov-lbl">Contrata con</span>
          {p.ministerio}
        </div>
        <div>
          <span className="prov-lbl">Contratos</span>
          {p.contratos} · {fmtUSDfull(p.monto_contratos_usd)}
        </div>
      </div>
      <div className="prov-ubo">
        <span className="prov-lbl">Beneficiario final (UBO)</span>
        {p.beneficiario_final}
      </div>
      {p.bandera && (
        <div className="prov-bandera" style={{ borderColor: c }}>
          <span className="prov-lbl" style={{ color: c }}>
            {p.estado === "INHABILITADO" ? "Motivo de inhabilitación" : "Bandera de la IA"}
          </span>
          {p.bandera}
        </div>
      )}
    </div>
  );
}

export default function InstitucionesPage() {
  return (
    <>
      <div className="page-title">Instituciones y empresas</div>
      <p className="page-sub">
        Cómo los ministerios contratan con empresas públicas y privadas: cómo las <strong>registran</strong>,{" "}
        <strong>certifican</strong> e <strong>inhabilitan</strong>, y cómo adquieren bienes y servicios. El registro
        venezolano <strong>ya guarda los accionistas</strong> de cada empresa — el sistema cruza ese dato para detectar
        testaferros, algo que hoy no se hace.
      </p>

      {/* ===== REGISTRO ===== */}
      <div className="section-head">El registro · quién puede contratar con el Estado</div>
      <p className="arch-lead">
        Toda empresa que quiera contratar con el Estado debe inscribirse en el <strong>Registro Nacional de
        Contratistas (RNC)</strong>, que administra el <strong>Servicio Nacional de Contrataciones (SNC)</strong>. El RNC
        ya exige capacidad legal, financiera, técnica <em>y la identidad de los accionistas y la junta directiva</em>.
      </p>
      <div className="reuso-grid">
        <div className="reuso-card">
          <div className="reuso-nombre">Capacidad legal</div>
          <div className="reuso-desc">Constitución, RIF, acta de asamblea, representante legal.</div>
        </div>
        <div className="reuso-card">
          <div className="reuso-nombre">Capacidad financiera</div>
          <div className="reuso-desc">Estados financieros auditados → nivel/monto máximo certificado.</div>
        </div>
        <div className="reuso-card">
          <div className="reuso-nombre">Capacidad técnica</div>
          <div className="reuso-desc">Especialidad, personal, experiencia (contratos previos con el Estado).</div>
        </div>
        <div className="reuso-card">
          <div className="reuso-nombre">Accionistas · beneficiario final</div>
          <div className="reuso-desc">Accionistas y junta directiva ya registrados — el ancla para detectar testaferros.</div>
        </div>
      </div>

      {/* ===== MODALIDADES ===== */}
      <div className="section-head">Cómo se elige · modalidades de selección</div>
      <p className="arch-lead">
        El monto del contrato (en Unidades Tributarias) determina la modalidad. A mayor monto, más competencia exigida.
        La <strong>contratación directa</strong> es la excepción — y el principal atajo para evadir el control.
      </p>
      <div className="mod-grid">
        {MODALIDADES.map((m, i) => {
          const c = modalidadColor(m.riesgo);
          return (
            <div className="mod-card" key={i} style={{ borderTopColor: c }}>
              <div className="mod-nombre">{m.nombre}</div>
              <div className="mod-umbral">{m.umbral}</div>
              <div className="mod-oferentes">{m.oferentes}</div>
              <span className="mod-riesgo" style={{ color: c, borderColor: c }}>
                riesgo {m.riesgo}
              </span>
            </div>
          );
        })}
      </div>

      {/* ===== CICLO ===== */}
      <div className="section-head">El ciclo de adquisición · paso a paso</div>
      <p className="arch-lead">
        De la programación de la compra al control posterior. El sistema pone un candado en cada paso; el camino en rojo
        es el atajo de contratación directa que el sistema marca y vigila.
      </p>
      {PASOS_ADQUISICION.map((p) => (
        <PasoAdq p={p} key={p.n} />
      ))}

      {/* ===== DIRECTORIO ===== */}
      <div className="section-head">Directorio de proveedores · estado en vivo</div>
      <p className="arch-lead">
        Cada empresa tiene una ficha con su estado (habilitado, inhabilitado, suspendido o en alerta), su beneficiario
        final y el cruce con el padrón de funcionarios. Las empresas públicas (PDVSA, CORPOELEC) participan sin RNC, vía
        contratación directa entre entes — un punto que el sistema vigila especialmente.
      </p>
      <div className="prov-grid">
        {PROVEEDORES.map((p) => (
          <FichaProveedor p={p} key={p.id} />
        ))}
      </div>

      <div className="xref-box">
        <span className="xref-label">¿De dónde sale el dinero de estos contratos?</span>
        Cada contrato consume una partida del presupuesto nacional. El recorrido del dinero — del ingreso petrolero al
        desembolso de la Tesorería — está en <Link href="/presupuesto">El flujo del dinero →</Link>
      </div>

      <div className="card-box arch-disclaimer">
        Estructura basada en la Ley de Contrataciones Públicas (LCP 2014), el SNC y el RNC. Casos de fuga inspirados en
        hechos documentados por Transparencia Venezuela. Empresas, RIF y montos simulados con fines demostrativos.
      </div>
    </>
  );
}
