// ============================================================
// FLUJOS ESPECÍFICOS POR MINISTERIO · Transparencia Venezuela
// Cada ministerio tiene su flujo REAL de contratación (no genérico):
// actores, roles y herramientas propios del sector, con su diagrama
// de flujo RAMIFICADO (Mermaid) y su caso de ejemplo.
// Datos SIMULADOS.
// ============================================================

// Un paso del flujo de contratación de un ministerio.
export interface FlujoPaso {
  n: number;
  tipo: string;
  titulo: string;
  actor: string;
  herramienta: string;
  desc: string;
  rama?: string;
}

// Caso de ejemplo del ministerio.
export interface FlujoCaso {
  titulo: string;
  id: string;
  detalle: string;
}

// KPIs del ministerio.
export interface FlujoKpis {
  certificados: number;
  monto: string;
  validas: string;
  alerta: number;
}

// Contenido de un nodo de la serpiente (operativo + técnico).
export interface SerpNodo {
  ic?: string;
  l1?: string;
  l2?: string;
  tic?: string;
  tt1?: string;
  tt2?: string;
  tt3?: string;
}

// Ramas de la decisión de la IA.
export interface SerpRamas {
  anomalia: string;
  ok: string;
}

// Contenido de los nodos del diagrama serpiente del ministerio.
export interface SerpFlujo {
  A: SerpNodo;
  B: SerpNodo;
  P: SerpNodo;
  AUD: SerpNodo;
  ramas: SerpRamas;
  [key: string]: SerpNodo | SerpRamas | string | undefined;
}

// Shape completo de un flujo de ministerio.
export interface Flujo {
  id: string;
  nombre: string;
  acento: string;
  riesgo: string;
  estado: string;
  credencial: string;
  vigencia: string;
  kpis: FlujoKpis;
  caso: FlujoCaso;
  pasos: FlujoPaso[];
  serp: SerpFlujo;
}

export type FlujosMap = Record<string, Flujo>;

export const FLUJOS: FlujosMap = {

  salud: {
    id: "salud",
    nombre: "Ministerio de Salud",
    acento: "#3fae6f",            // riesgo medio
    riesgo: "medio",
    estado: "ACTIVO",
    credencial: "0xCERT_SAL_8b1d4f6a0c5e9b2d8f1a4c7e3b6d9f2a5c8e1b4d",
    vigencia: "2027-02-10",
    kpis: { certificados: 312, monto: "US$1.85B", validas: "97%", alerta: 9 },
    caso: {
      titulo: "Suministro de camas hospitalarias UCI",
      id: "VE-SAL-2026-0312",
      detalle: "Sobreprecio detectado: US$8.400/cama vs US$2.100 de mercado (+300%).",
    },
    // Pasos específicos del sector salud
    pasos: [
      { n: 1, tipo: "actor",   titulo: "El hospital detecta la necesidad",
        actor: "Director de hospital / jefe médico", herramienta: "Sistema de Información Hospitalaria (HIS)",
        desc: "El director del hospital reporta que faltan camas en UCI y genera una solicitud de compra." },
      { n: 2, tipo: "actor",   titulo: "Compras del Ministerio abre la licitación",
        actor: "Dirección de Adquisiciones · Proveedores médicos", herramienta: "Portal de compras sanitarias",
        desc: "Se publica la licitación; los proveedores médicos registrados presentan ofertas con marca y modelo." },
      { n: 3, tipo: "sistema", titulo: "La IA analiza el contrato antes de adjudicar",
        actor: "Motor de IA anti-corrupción", herramienta: "Reglas estadísticas + grafos + LLM auditor",
        desc: "No solo mira el precio. En paralelo verifica: <strong>sobreprecio</strong> (vs base de precios sanitaria y 47 contratos similares), <strong>colusión</strong> entre oferentes (socios o cuentas compartidas), <strong>testaferros</strong> (cruce funcionario↔proveedor), <strong>concentración</strong> de adjudicaciones en pocos proveedores, y lee el <strong>pliego</strong> buscando requisitos hechos a medida. Si algo se dispara, el flujo se bifurca a auditoría." },
      { n: 4, tipo: "actor",   titulo: "Auditoría sanitaria revisa la alerta",
        actor: "Contraloría Sanitaria", herramienta: "Panel de auditoría con trazabilidad",
        desc: "Si la IA detecta anomalía, la Contraloría examina el caso y exige justificación ANTES del desembolso.",
        rama: "alerta" },
      { n: 5, tipo: "actor",   titulo: "El Ministro de Salud firma con su credencial",
        actor: "Ministerio de Salud (certificador delegado)", herramienta: "Firma digital + verificación de cadena",
        desc: "El ministerio firma; el sistema verifica que su credencial está autorizada por la Raíz (doble validación)." },
      { n: 6, tipo: "chain",   titulo: "El contrato se sella en blockchain",
        actor: "Red descentralizada (Polygon)", herramienta: "Smart contract de registro",
        desc: "Registro con hash inmutable. Imposible de borrar o modificar, ni por el propio ministerio." },
      { n: 7, tipo: "citizen", titulo: "El ciudadano verifica el contrato",
        actor: "Ciudadano / paciente", herramienta: "Portal público + app móvil (QR)",
        desc: "Cualquiera escanea el QR y ve la cadena de certificación completa. La confianza se verifica, no se pide." },
    ],
    // Contenido de los nodos del diagrama serpiente (operativo + técnico).
    // El layout/posiciones/ramas los pone el motor svgSerpienteMinisterio.
    serp: {
      A:   { ic:"hospital", l1:"Hospital", l2:"solicita camas UCI", tic:"server", tt1:"Sistema HIS", tt2:"registro de compra", tt3:"→ OCDS (JSON)" },
      B:   { ic:"clipboard", l1:"Adquisiciones", l2:"abre licitación", tic:"gateway", tt1:"API de ingesta", tt2:"normaliza ofertas", tt3:"→ esquema OCDS" },
      P:   { ic:"pill", l1:"Proveedores", l2:"ofertan", tic:"doc", tt1:"Oferta estructurada", tt2:"precio/u, marca, lote,", tt3:"registro sanitario" },
      AUD: { l1:"Contraloría", l2:"sanitaria audita" },
      ramas: { anomalia:"sobreprecio", ok:"precio normal" },
    },
  },

  // ───────────── ENERGÍA Y PETRÓLEO (riesgo alto) ─────────────
  energia: {
    id: "energia",
    nombre: "Ministerio de Energía y Petróleo",
    acento: "#e23b52", riesgo: "alto", estado: "ACTIVO · BAJO SUPERVISIÓN",
    credencial: "0xCERT_ENE_2c9e1b7d3a6f0c5e9b2d8f1a4c7e3b6d9f2a5c8e",
    vigencia: "2027-02-10",
    kpis: { certificados: 198, monto: "US$3.20B", validas: "93%", alerta: 14 },
    caso: {
      titulo: "Mantenimiento de planta termoeléctrica",
      id: "VE-ENE-2026-0198",
      detalle: "Sobrecosto detectado: tarifa de servicio +210% sobre contratos comparables; proveedor con un único socio recurrente.",
    },
    pasos: [
      { n:1, tipo:"actor", titulo:"La operadora reporta la necesidad", actor:"Operadora eléctrica / petrolera estatal", herramienta:"Sistema de gestión de activos (EAM)",
        desc:"La planta reporta una parada de mantenimiento o un proyecto de inversión y genera la requisición." },
      { n:2, tipo:"actor", titulo:"Energía abre la licitación", actor:"Dirección de Contrataciones · Proveedores de servicios", herramienta:"Portal de compras energéticas",
        desc:"Se publica el pliego técnico (turbinas, obra eléctrica, servicios) y los proveedores presentan oferta." },
      { n:3, tipo:"sistema", titulo:"La IA analiza el contrato antes de adjudicar", actor:"Motor de IA anti-corrupción", herramienta:"Oráculos de precio + reglas + grafos + LLM",
        desc:"Compara la tarifa contra <strong>precios de commodities y servicios energéticos</strong> (oráculos), detecta <strong>sobrecosto</strong>, <strong>colusión</strong>, <strong>concentración</strong> de adjudicaciones en pocos proveedores y lee el <strong>pliego</strong>. Aquí el flujo se bifurca.", rama:"alerta" },
      { n:4, tipo:"actor", titulo:"Auditoría energética revisa la alerta", actor:"Contraloría del sector energético", herramienta:"Panel de auditoría con trazabilidad",
        desc:"Si la IA detecta anomalía, la Contraloría examina el caso y exige justificación ANTES del desembolso." },
      { n:5, tipo:"actor", titulo:"El Ministro de Energía firma con su credencial", actor:"Ministerio de Energía (certificador delegado)", herramienta:"Firma digital + verificación de cadena",
        desc:"El ministerio firma; el sistema verifica que su credencial está autorizada por la Raíz (doble validación)." },
      { n:6, tipo:"chain", titulo:"El contrato se sella en blockchain", actor:"Red descentralizada (Polygon)", herramienta:"Smart contract de registro",
        desc:"Registro con hash inmutable. Imposible de borrar o modificar, ni por el propio ministerio." },
      { n:7, tipo:"citizen", titulo:"El ciudadano verifica el contrato", actor:"Ciudadano", herramienta:"Portal público + app móvil (QR)",
        desc:"Cualquiera escanea el QR y ve la cadena de certificación completa. La confianza se verifica, no se pide." },
    ],
    serp: {
      A:   { ic:"building", l1:"Operadora", l2:"reporta necesidad", tic:"server", tt1:"Sistema EAM", tt2:"requisición de obra", tt3:"→ OCDS (JSON)" },
      B:   { ic:"clipboard", l1:"Contrataciones", l2:"abre licitación", tic:"gateway", tt1:"API de ingesta", tt2:"normaliza ofertas", tt3:"→ esquema OCDS" },
      P:   { ic:"doc", l1:"Proveedores", l2:"de servicios", tic:"doc", tt1:"Oferta estructurada", tt2:"tarifa, alcance,", tt3:"plazo de ejecución" },
      AUD: { l1:"Contraloría", l2:"energética audita" },
      ramas: { anomalia:"sobrecosto", ok:"tarifa normal" },
    },
  },

  // ───────────── INFRAESTRUCTURA (riesgo alto) ─────────────
  infraestructura: {
    id: "infraestructura",
    nombre: "Ministerio de Infraestructura",
    acento: "#e23b52", riesgo: "alto", estado: "ACTIVO · BAJO SUPERVISIÓN",
    credencial: "0xCERT_INF_1b7d3a6f0c5e9b2d8f1a4c7e3b6d9f2a5c8e1b4d",
    vigencia: "2027-02-12",
    kpis: { certificados: 264, monto: "US$1.98B", validas: "97%", alerta: 8 },
    caso: {
      titulo: "Rehabilitación vial de autopista regional",
      id: "VE-INF-2026-0264",
      detalle: "Riesgo: pago por avance de obra liberado sin verificación de hito; concentración de contratos en un solo constructor.",
    },
    pasos: [
      { n:1, tipo:"actor", titulo:"El ente regional detecta la necesidad", actor:"Gobernación / alcaldía", herramienta:"Sistema de planificación de obra",
        desc:"Se identifica una obra (vialidad, edificación, agua) y se genera el proyecto con su presupuesto." },
      { n:2, tipo:"actor", titulo:"Infraestructura abre la licitación", actor:"Dirección de Obras Públicas · Constructoras", herramienta:"Portal de obra pública",
        desc:"Se publica el proyecto con cómputos métricos y las constructoras presentan oferta por partidas." },
      { n:3, tipo:"sistema", titulo:"La IA analiza el contrato antes de adjudicar", actor:"Motor de IA anti-corrupción", herramienta:"Precios de referencia de obra + reglas + grafos + LLM",
        desc:"Compara las partidas contra <strong>precios unitarios de referencia de obra</strong>, detecta <strong>sobreprecio</strong>, <strong>colusión</strong>, <strong>concentración</strong> de adjudicaciones y <strong>fraccionamiento</strong> (obras partidas para evitar licitación). Aquí el flujo se bifurca.", rama:"alerta" },
      { n:4, tipo:"actor", titulo:"Auditoría de obra revisa la alerta", actor:"Contraloría de obras públicas", herramienta:"Panel de auditoría + geolocalización de hitos",
        desc:"Si hay anomalía, la Contraloría examina el caso. El pago por avance se libera solo con hito verificado en sitio." },
      { n:5, tipo:"actor", titulo:"El Ministro de Infraestructura firma", actor:"Ministerio de Infraestructura (certificador delegado)", herramienta:"Firma digital + verificación de cadena",
        desc:"El ministerio firma; el sistema verifica que su credencial está autorizada por la Raíz (doble validación)." },
      { n:6, tipo:"chain", titulo:"El contrato se sella en blockchain", actor:"Red descentralizada (Polygon)", herramienta:"Smart contract de registro + hitos",
        desc:"Registro con hash inmutable. Cada hito y pago queda anclado y trazable." },
      { n:7, tipo:"citizen", titulo:"El ciudadano verifica la obra", actor:"Ciudadano", herramienta:"Portal público + app móvil (QR en obra)",
        desc:"El QR en la valla de obra muestra contrato, avance y pagos. La confianza se verifica, no se pide." },
    ],
    serp: {
      A:   { ic:"pin", l1:"Ente regional", l2:"detecta obra", tic:"server", tt1:"Planificación", tt2:"proyecto + cómputos", tt3:"→ OCDS (JSON)" },
      B:   { ic:"clipboard", l1:"Obras Públicas", l2:"abre licitación", tic:"gateway", tt1:"API de ingesta", tt2:"normaliza partidas", tt3:"→ esquema OCDS" },
      P:   { ic:"doc", l1:"Constructoras", l2:"ofertan", tic:"doc", tt1:"Oferta por partidas", tt2:"precio unitario,", tt3:"plazo, hitos" },
      AUD: { l1:"Contraloría", l2:"de obra audita", tic:"pin", tt1:"Auditoría + geo", tt2:"hito verificado", tt3:"en sitio (GPS)" },
      ramas: { anomalia:"sobreprecio", ok:"precio normal" },
    },
  },

  // ───────────── EDUCACIÓN (riesgo bajo) ─────────────
  educacion: {
    id: "educacion",
    nombre: "Ministerio de Educación",
    acento: "#3fae6f", riesgo: "bajo", estado: "ACTIVO",
    credencial: "0xCERT_EDU_3a6f0c5e9b2d8f1a4c7e3b6d9f2a5c8e1b4d7f0a",
    vigencia: "2027-02-15",
    kpis: { certificados: 221, monto: "US$720.0M", validas: "99%", alerta: 3 },
    caso: {
      titulo: "Dotación tecnológica de escuelas rurales",
      id: "VE-EDU-2026-0221",
      detalle: "Contrato verificado sin anomalías. Caso modelo: precios dentro de rango, proveedor sin vínculos, entrega trazada.",
    },
    pasos: [
      { n:1, tipo:"actor", titulo:"La zona educativa detecta la necesidad", actor:"Dirección de zona educativa", herramienta:"Sistema de gestión escolar",
        desc:"Se reporta la falta de dotación (equipos, mobiliario, infraestructura) y se genera la solicitud." },
      { n:2, tipo:"actor", titulo:"Educación abre la licitación", actor:"Dirección de Adquisiciones · Proveedores", herramienta:"Portal de compras educativas",
        desc:"Se publica la licitación y los proveedores presentan oferta con marca, modelo y especificaciones." },
      { n:3, tipo:"sistema", titulo:"La IA analiza el contrato antes de adjudicar", actor:"Motor de IA anti-corrupción", herramienta:"Precios de referencia + reglas + grafos + LLM",
        desc:"Compara contra <strong>precios de referencia de dotación escolar</strong>, detecta <strong>sobreprecio</strong>, <strong>colusión</strong> y <strong>concentración</strong>, y lee el <strong>pliego</strong>. Aquí el flujo se bifurca.", rama:"alerta" },
      { n:4, tipo:"actor", titulo:"Auditoría educativa revisa la alerta", actor:"Contraloría educativa", herramienta:"Panel de auditoría con trazabilidad",
        desc:"Si la IA detecta anomalía, la Contraloría examina el caso y exige justificación ANTES del desembolso." },
      { n:5, tipo:"actor", titulo:"El Ministro de Educación firma", actor:"Ministerio de Educación (certificador delegado)", herramienta:"Firma digital + verificación de cadena",
        desc:"El ministerio firma; el sistema verifica que su credencial está autorizada por la Raíz (doble validación)." },
      { n:6, tipo:"chain", titulo:"El contrato se sella en blockchain", actor:"Red descentralizada (Polygon)", herramienta:"Smart contract de registro",
        desc:"Registro con hash inmutable. Imposible de borrar o modificar." },
      { n:7, tipo:"citizen", titulo:"La comunidad verifica la entrega", actor:"Comunidad educativa / ciudadano", herramienta:"Portal público + app móvil (QR)",
        desc:"Cualquiera escanea el QR y ve la cadena de certificación completa. La confianza se verifica, no se pide." },
    ],
    serp: {
      A:   { ic:"building", l1:"Zona educativa", l2:"detecta necesidad", tic:"server", tt1:"Gestión escolar", tt2:"solicitud de dotación", tt3:"→ OCDS (JSON)" },
      B:   { ic:"clipboard", l1:"Adquisiciones", l2:"abre licitación", tic:"gateway", tt1:"API de ingesta", tt2:"normaliza ofertas", tt3:"→ esquema OCDS" },
      P:   { ic:"doc", l1:"Proveedores", l2:"ofertan", tic:"doc", tt1:"Oferta estructurada", tt2:"marca, modelo,", tt3:"especificaciones" },
      AUD: { l1:"Contraloría", l2:"educativa audita" },
      ramas: { anomalia:"sobreprecio", ok:"precio normal" },
    },
  },

  // ───────────── SEGURIDAD (riesgo medio) ─────────────
  seguridad: {
    id: "seguridad",
    nombre: "Ministerio de Seguridad",
    acento: "#e0a32e", riesgo: "medio", estado: "ACTIVO",
    credencial: "0xCERT_SEG_6f0c5e9b2d8f1a4c7e3b6d9f2a5c8e1b4d7f0a3c",
    vigencia: "2027-02-18",
    kpis: { certificados: 156, monto: "US$480.0M", validas: "98%", alerta: 3 },
    caso: {
      titulo: "Equipamiento de cuerpos de seguridad",
      id: "VE-SEG-2026-0156",
      detalle: "Riesgo medio: bienes sensibles que exigen cadena de custodia verificable de extremo a extremo.",
    },
    pasos: [
      { n:1, tipo:"actor", titulo:"El cuerpo de seguridad reporta la necesidad", actor:"Comandancia / dirección operativa", herramienta:"Sistema de inventario y logística",
        desc:"Se reporta la necesidad de equipamiento o dotación y se genera la requisición controlada." },
      { n:2, tipo:"actor", titulo:"Seguridad abre la licitación", actor:"Oficina de Adquisiciones · Proveedores autorizados", herramienta:"Portal de compras con control reforzado",
        desc:"Se publica la licitación a proveedores autorizados; presentan oferta con trazabilidad del bien." },
      { n:3, tipo:"sistema", titulo:"La IA analiza el contrato antes de adjudicar", actor:"Motor de IA anti-corrupción", herramienta:"Precios de referencia + reglas + grafos + LLM",
        desc:"Compara contra <strong>precios de referencia</strong>, detecta <strong>sobreprecio</strong>, <strong>colusión</strong>, <strong>testaferros</strong> y verifica la <strong>cadena de custodia</strong> del bien. Aquí el flujo se bifurca.", rama:"alerta" },
      { n:4, tipo:"actor", titulo:"Auditoría de seguridad revisa la alerta", actor:"Contraloría del sector seguridad", herramienta:"Panel de auditoría + cadena de custodia",
        desc:"Si la IA detecta anomalía, la Contraloría examina el caso y exige justificación ANTES del desembolso." },
      { n:5, tipo:"actor", titulo:"El Ministro de Seguridad firma", actor:"Ministerio de Seguridad (certificador delegado)", herramienta:"Firma digital + verificación de cadena",
        desc:"El ministerio firma; el sistema verifica que su credencial está autorizada por la Raíz (doble validación)." },
      { n:6, tipo:"chain", titulo:"El contrato se sella en blockchain", actor:"Red descentralizada (Polygon)", herramienta:"Smart contract de registro + custodia",
        desc:"Registro con hash inmutable. La cadena de custodia del bien queda anclada y trazable." },
      { n:7, tipo:"citizen", titulo:"El órgano de control verifica", actor:"Órgano de control / ciudadano autorizado", herramienta:"Portal de verificación (QR)",
        desc:"La cadena de certificación es verificable. La confianza se verifica, no se pide." },
    ],
    serp: {
      A:   { ic:"shield", l1:"Comandancia", l2:"reporta necesidad", tic:"server", tt1:"Inventario+logística", tt2:"requisición controlada", tt3:"→ OCDS (JSON)" },
      B:   { ic:"clipboard", l1:"Adquisiciones", l2:"abre licitación", tic:"gateway", tt1:"API de ingesta", tt2:"normaliza ofertas", tt3:"→ esquema OCDS" },
      P:   { ic:"doc", l1:"Proveedores", l2:"autorizados", tic:"doc", tt1:"Oferta + custodia", tt2:"trazabilidad del", tt3:"bien sensible" },
      AUD: { l1:"Contraloría", l2:"de seguridad", tic:"shield", tt1:"Auditoría+custodia", tt2:"cadena verificada", tt3:"extremo a extremo" },
      ramas: { anomalia:"anomalía", ok:"sin anomalía" },
    },
  },

  // ───────────── TRANSFORMACIÓN DIGITAL (riesgo bajo) ─────────────
  tecnologia: {
    id: "tecnologia",
    nombre: "Ministerio de Transformación Digital",
    acento: "#3fae6f", riesgo: "bajo", estado: "ACTIVO",
    credencial: "0xCERT_TEC_0c5e9b2d8f1a4c7e3b6d9f2a5c8e1b4d7f0a3c6e",
    vigencia: "2027-02-20",
    kpis: { certificados: 96, monto: "US$190.0M", validas: "99%", alerta: 1 },
    caso: {
      titulo: "Licencias y servicios cloud gubernamentales",
      id: "VE-TEC-2026-0096",
      detalle: "Riesgo bajo: foco en evitar licencias infladas o servicios cloud sobredimensionados y duplicados.",
    },
    pasos: [
      { n:1, tipo:"actor", titulo:"El organismo reporta la necesidad digital", actor:"Dirección de tecnología del organismo", herramienta:"Catálogo de servicios TI",
        desc:"Se reporta la necesidad de software, licencias o servicios cloud y se genera la solicitud." },
      { n:2, tipo:"actor", titulo:"Transformación Digital abre la licitación", actor:"Dirección de Compras TI · Proveedores tecnológicos", herramienta:"Portal de compras TI",
        desc:"Se publica la licitación; los proveedores presentan oferta con dimensionamiento y licenciamiento." },
      { n:3, tipo:"sistema", titulo:"La IA analiza el contrato antes de adjudicar", actor:"Motor de IA anti-corrupción", herramienta:"Precios de referencia TI + reglas + grafos + LLM",
        desc:"Compara contra <strong>precios de referencia de licencias y cloud</strong>, detecta <strong>sobreprecio</strong>, <strong>servicios duplicados</strong>, <strong>colusión</strong> y <strong>concentración</strong>, y lee el <strong>pliego</strong>. Aquí el flujo se bifurca.", rama:"alerta" },
      { n:4, tipo:"actor", titulo:"Auditoría TI revisa la alerta", actor:"Contraloría de tecnología", herramienta:"Panel de auditoría con trazabilidad",
        desc:"Si la IA detecta anomalía, la Contraloría examina el caso y exige justificación ANTES del desembolso." },
      { n:5, tipo:"actor", titulo:"El Ministro firma con su credencial", actor:"Ministerio de Transformación Digital (certificador delegado)", herramienta:"Firma digital + verificación de cadena",
        desc:"El ministerio firma; el sistema verifica que su credencial está autorizada por la Raíz (doble validación)." },
      { n:6, tipo:"chain", titulo:"El contrato se sella en blockchain", actor:"Red descentralizada (Polygon)", herramienta:"Smart contract de registro",
        desc:"Registro con hash inmutable. Imposible de borrar o modificar." },
      { n:7, tipo:"citizen", titulo:"El ciudadano verifica el contrato", actor:"Ciudadano", herramienta:"Portal público + app móvil (QR)",
        desc:"Cualquiera escanea el QR y ve la cadena de certificación completa. La confianza se verifica, no se pide." },
    ],
    serp: {
      A:   { ic:"server", l1:"Organismo", l2:"reporta necesidad", tic:"server", tt1:"Catálogo TI", tt2:"solicitud de servicio", tt3:"→ OCDS (JSON)" },
      B:   { ic:"clipboard", l1:"Compras TI", l2:"abre licitación", tic:"gateway", tt1:"API de ingesta", tt2:"normaliza ofertas", tt3:"→ esquema OCDS" },
      P:   { ic:"doc", l1:"Proveedores", l2:"tecnológicos", tic:"doc", tt1:"Oferta estructurada", tt2:"licencias, cloud,", tt3:"dimensionamiento" },
      AUD: { l1:"Contraloría", l2:"de tecnología" },
      ramas: { anomalia:"sobreprecio", ok:"precio normal" },
    },
  },

};

// Expuesto para el motor genérico svgSerpienteMinisterio (compat svgSerpienteSalud).
export const SERP_SALUD = { nombre: FLUJOS.salud.nombre, ...FLUJOS.salud.serp };

export function flujoAcento(r: string): string { return ({alto:"#e23b52",medio:"#e0a32e",bajo:"#3fae6f"} as Record<string, string>)[r]||"#6b7c93"; }
