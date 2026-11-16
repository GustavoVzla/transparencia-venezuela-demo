import Link from "next/link";
import { ARQUITECTURA, PROCESOS, svgArquitecturaChasis, svgArqProceso } from "@/lib/arquitectura";
import SvgDiagram from "@/components/SvgDiagram";
import DiagramToggle from "@/components/DiagramToggle";

export default function ArquitecturaPage() {
  return (
    <>
      <div className="page-title">Arquitectura técnica</div>
      <p className="page-sub">
        Cómo está construido el sistema por dentro. Primero la vista general; luego el recorrido real de cada subsistema,
        paso a paso. La misma arquitectura sirve a todos los ministerios.
      </p>

      {/* ===== BLOQUE A · VISTA GENERAL ===== */}
      <div className="section-head">A · Vista general · el sistema en capas</div>
      <p className="arch-lead">
        Una petición recorre las capas de arriba abajo: la <strong>app</strong> habla con la <strong>API</strong>, que
        orquesta los <strong>servicios</strong> (IA, firma e indexación), que escriben en la capa de{" "}
        <strong>confianza</strong> (blockchain) y de <strong>datos</strong>.
      </p>
      <DiagramToggle
        views={[
          {
            key: "descriptivo",
            tab: "Qué es cada pieza",
            hint: "Cada capa y su función, de la app del ciudadano a los datos.",
            markup: svgArquitecturaChasis("descriptivo"),
          },
          {
            key: "tecnico",
            tab: "Con qué se construye",
            hint: "La tecnología y el protocolo concreto que ejecuta cada capa.",
            markup: svgArquitecturaChasis("tecnico"),
          },
        ]}
      />
      <div className="stack-strip">
        {ARQUITECTURA.stack.map((s, i) => (
          <div className="stack-chip" key={i} style={{ ["--c" as string]: s.color } as React.CSSProperties}>
            <span className="stack-chip-capa">{s.capa}</span>
            <span className="stack-chip-tec">{s.tec}</span>
          </div>
        ))}
      </div>

      {/* ===== BLOQUE B · CÓMO FUNCIONA POR DENTRO ===== */}
      <div className="section-head" style={{ marginTop: 38 }}>
        B · Cómo funciona por dentro · en detalle
      </div>
      <p className="arch-lead">
        El recorrido real de cada subsistema, con la técnica concreta de cada etapa. Cada paso con el sello{" "}
        <span style={{ color: "var(--jade)" }}>✓</span> replica un mecanismo <strong>ya en producción</strong> en otro
        gobierno — el detalle, en <Link href="/precedentes">Probado en el mundo</Link>.
      </p>

      <div className="section-head sub">1 · El Motor IA · de un contrato a una alerta</div>
      <p className="arch-lead">{PROCESOS.ia.intro}</p>
      <SvgDiagram markup={svgArqProceso("ia")} />

      <div className="section-head sub">2 · El recorrido del dato · on-chain vs off-chain</div>
      <p className="arch-lead">{PROCESOS.dato.intro}</p>
      <SvgDiagram markup={svgArqProceso("dato")} />

      <div className="section-head sub" id="pki">
        3 · La firma y la cadena de confianza
      </div>
      <p className="arch-lead">{PROCESOS.pki.intro}</p>
      <SvgDiagram markup={svgArqProceso("pki")} />
      <div className="xref-box">
        <span className="xref-label">¿Quién está en cada nivel de esta cadena?</span>
        Aquí se ve el <em>mecanismo</em> de la firma. El <strong>modelo institucional</strong> — qué autoridad es la raíz,
        qué ministerios son delegados y cómo se revoca a uno corrupto — está en{" "}
        <Link href="/gobernanza">Gobernanza · quién certifica a quién →</Link>
      </div>

      {/* ===== DECISIONES DE DISEÑO (anticipan las preguntas del evaluador técnico) ===== */}
      <div className="section-head" style={{ marginTop: 38 }}>
        C · Decisiones de diseño · por qué este stack
      </div>
      <p className="arch-lead">
        Las tres preguntas que hace todo evaluador técnico ante un blockchain de gobierno — respondidas de frente.
      </p>
      <div className="decision-grid">
        <div className="decision-card">
          <div className="decision-q">¿Red pública o de consorcio?</div>
          <p className="decision-a">
            El reflejo natural para varios entes sería una <strong>red de consorcio cerrada</strong> (tipo Quorum o
            Hyperledger). Elegimos una <strong>L2 pública (Polygon)</strong> con permisos a nivel de smart contract: el
            ciudadano verifica <em>sin pedir permiso</em>, se ancla a la seguridad de Ethereum y no hay lock-in con un
            proveedor. La transparencia es el producto — una red cerrada la contradiría.
          </p>
        </div>
        <div className="decision-card">
          <div className="decision-q">¿Quién valida los bloques?</div>
          <p className="decision-a">
            Polygon usa <strong>Proof of Stake</strong>, no minería (Proof of Work). Sin coste energético, transacciones
            de céntimos y confirmación en segundos — idóneo para el volumen de un Estado y para un gobierno que no puede
            justificar el gasto de una red de minado.
          </p>
        </div>
        <div className="decision-card">
          <div className="decision-q">¿Quién controla el contrato?</div>
          <p className="decision-a">
            El control de acceso se implementa con <strong>roles on-chain</strong> (patrón AccessControl): rol raíz para
            el Gobierno Central, rol emisor para cada ministerio — el reflejo en código de la jerarquía de{" "}
            <Link href="/gobernanza">Gobernanza</Link>. Las actualizaciones del contrato pasan por{" "}
            <strong>multifirma con timelock</strong> y auditoría previa (Slither + revisión manual).
          </p>
        </div>
      </div>

      <div className="card-box arch-disclaimer">
        Arquitectura conceptual con fines demostrativos. Las tecnologías nombradas reflejan el diseño propuesto; el
        sistema productivo está en desarrollo.
      </div>
    </>
  );
}
