// ============================================================
// FLUJO DEL DINERO PÚBLICO · datos SIMULADOS con estructura institucional REAL
// Estructura basada en el ciclo presupuestario venezolano (LOAFSP): ONAPRE,
// Asamblea Nacional, Min. Economía/Finanzas, SIGECOF/ONCOP, Tesorería Nacional,
// Contraloría General. Hilo: el aparato existe en la ley pero opera sin
// trazabilidad pública desde 2016 — el sistema pone un control verificable
// en cada eslabón que el Estado ya tiene.
// Montos en US$ (coherente con la demo). Umbrales legales en Unidades Tributarias.
// ============================================================

export interface PasoDinero {
  n: number;
  fase: "origen" | "asignacion" | "ejecucion" | "control";
  titulo: string;
  organismo: string; // organismo REAL responsable
  controla: string; // qué verifica el sistema en este paso
  precedente: string; // referencia internacional que lo respalda
  fuga?: string; // punto de fuga típico que este control cierra (opcional)
}

export interface PartidaDemo {
  ministerio: string;
  asignado_usd: number;
  comprometido_usd: number;
  causado_usd: number;
  pagado_usd: number;
  alerta?: string;
}

export interface FuenteIngreso {
  nombre: string;
  organismo: string;
  pct: number; // % del ingreso (proporciones ~reales del presupuesto 2025)
  nota: string;
}

// Proporciones inspiradas en el presupuesto 2025 (Transparencia Venezuela):
// ~83% ingresos corrientes / ~17% deuda; dentro de corrientes, petróleo ~59%, tributos liderados por IVA.
export const FUENTES_INGRESO: FuenteIngreso[] = [
  { nombre: "Ingresos petroleros", organismo: "PDVSA", pct: 49, nota: "Mayor fuente. Históricamente clasificada como 'extraordinaria' para reducir el Situado." },
  { nombre: "Ingresos tributarios", organismo: "SENIAT", pct: 28, nota: "Liderados por IVA (impuesto regresivo). ISLR, aranceles, IGTF." },
  { nombre: "Endeudamiento", organismo: "Min. Economía · Ley de Endeudamiento", pct: 17, nota: "Títulos en mercado interno + préstamos." },
  { nombre: "No tributarios", organismo: "Tasas, aduanas, regalías", pct: 6, nota: "Tasas y regalías. Porción menor." },
];

export const PASOS_DINERO: PasoDinero[] = [
  {
    n: 1,
    fase: "origen",
    titulo: "Ingreso · de dónde viene el dinero",
    organismo: "PDVSA · SENIAT · Tesorería Nacional",
    controla: "Registro inmutable de cada ingreso (petrolero, tributario, deuda) con su clasificación correcta. Impide reclasificar ingresos para evadir el Situado Constitucional.",
    precedente: "World Bank BOOST · ingresos por fuente de financiamiento",
    fuga: "Petróleo desviado en origen (≈US$13.000M en cargamentos sin cobrar 2019-2022).",
  },
  {
    n: 2,
    fase: "asignacion",
    titulo: "Formulación del presupuesto",
    organismo: "ONAPRE · Min. Economía, Finanzas y Comercio Exterior",
    controla: "Hash del proyecto de presupuesto + clasificador público. La IA detecta subestimación sistemática de ingresos comparando con el histórico.",
    precedente: "México · PPEF/PEF en datos abiertos",
    fuga: "Subestimación de ingresos crea fondos extra-presupuestarios discrecionales.",
  },
  {
    n: 3,
    fase: "asignacion",
    titulo: "Aprobación legislativa",
    organismo: "Asamblea Nacional",
    controla: "Sello temporal de aprobación + Ley de Presupuesto publicada on-chain. Alerta si se aprueba sin debate o sin publicar.",
    precedente: "Brasil · LOA publicada antes de ejecutar (SIAFI)",
    fuga: "Aprobación nominal sin deliberación efectiva; presupuesto no publicado desde 2016.",
  },
  {
    n: 4,
    fase: "asignacion",
    titulo: "Asignación a partidas",
    organismo: "Min. Economía · ONAPRE",
    controla: "Trazabilidad Sector → Programa → Proyecto → Partida. Crédito disponible verificable por cada nodo del árbol presupuestario.",
    precedente: "World Bank BOOST · clasificación programática desagregada",
    fuga: "Traspasos de gasto de capital a gasto corriente: el destino aprobado no es el real.",
  },
  {
    n: 5,
    fase: "ejecucion",
    titulo: "Compromiso",
    organismo: "Órgano ejecutor · SIGECOF / ONCOP",
    controla: "Registra el contrato u orden que reserva el crédito. La IA compara el precio contra referencias de mercado → alerta de sobreprecio antes de comprometer.",
    precedente: "Ucrania · Prozorro/DoZorro (IA anti-sobreprecio)",
    fuga: "Contratación directa a empresas de fachada evitando concurso; sobreprecios.",
  },
  {
    n: 6,
    fase: "ejecucion",
    titulo: "Causado",
    organismo: "Órgano ejecutor · ONCOP",
    controla: "Verifica la recepción conforme del bien u obra y la concilia con las metas físicas del Plan Operativo Anual → alerta de desembolso sin contraprestación.",
    precedente: "World Bank FundsChain · trazabilidad origen → propósito → beneficiario",
    fuga: "Obras pagadas con avance físico nulo o abandono (la grieta causado → pagado).",
  },
  {
    n: 7,
    fase: "ejecucion",
    titulo: "Pagado · el desembolso",
    organismo: "Tesorería Nacional · Cuenta Única del Tesoro",
    controla: "Registro inmutable del pago, beneficiario final y no-repudio. Detecta pagos de nómina que no llegan a las cuentas de las entidades.",
    precedente: "World Bank FundsChain · pagos y desembolsos en tiempo real",
    fuga: "Centralización de nóminas: el dinero no llega a las cuentas de gobernaciones/alcaldías.",
  },
  {
    n: 8,
    fase: "control",
    titulo: "Control y auditoría",
    organismo: "Contraloría General de la República · Sistema Nacional de Control Fiscal",
    controla: "Rastro de auditoría inmutable de extremo a extremo + panel ciudadano. La IA prioriza los casos de mayor riesgo para el auditor humano.",
    precedente: "Brasil Portal da Transparência + México Cuenta Pública + DoZorro",
    fuga: "Ejecución no publicada hace ~16 años: sin datos no hay control posible.",
  },
];

// Etapas de ejecución del gasto (definiciones reales LOAFSP) — para el explicativo.
export const ETAPAS_GASTO = [
  { etapa: "Compromiso", def: "Acto que afecta preventivamente el crédito presupuestario (p. ej. adjudicar un contrato). Reserva el dinero; aún no nace la obligación de pagar." },
  { etapa: "Causado", def: "Nace la obligación de pago (p. ej. recepción conforme del bien o servicio), con independencia de cuándo se pague." },
  { etapa: "Pagado", def: "La obligación se extingue: sale el dinero de la Cuenta Única del Tesoro al beneficiario." },
];

// Caso simulado: una partida recorriendo las etapas (US$). El "gap" causado→pagado
// y comprometido→causado es donde la demo enciende alertas.
export const PARTIDAS_DEMO: PartidaDemo[] = [
  { ministerio: "Salud", asignado_usd: 1850000000, comprometido_usd: 1720000000, causado_usd: 1610000000, pagado_usd: 1598000000 },
  { ministerio: "Energía y Petróleo", asignado_usd: 3200000000, comprometido_usd: 3120000000, causado_usd: 2890000000, pagado_usd: 2710000000, alerta: "Brecha causado→pagado de US$180M sin conciliar con metas físicas." },
  { ministerio: "Infraestructura", asignado_usd: 1980000000, comprometido_usd: 1940000000, causado_usd: 1505000000, pagado_usd: 1470000000, alerta: "US$435M comprometidos no causados: obras adjudicadas sin avance verificado." },
  { ministerio: "Educación", asignado_usd: 720000000, comprometido_usd: 690000000, causado_usd: 668000000, pagado_usd: 661000000 },
  { ministerio: "Seguridad", asignado_usd: 480000000, comprometido_usd: 470000000, causado_usd: 452000000, pagado_usd: 449000000 },
  { ministerio: "Transformación Digital", asignado_usd: 190000000, comprometido_usd: 178000000, causado_usd: 171000000, pagado_usd: 170000000 },
];

export const PRESUPUESTO_TOTAL_USD = PARTIDAS_DEMO.reduce((s, p) => s + p.asignado_usd, 0);

export function faseColor(fase: PasoDinero["fase"]): string {
  return (
    {
      origen: "#5b9bd5", // azul: entrada
      asignacion: "#d4b87c", // dorado: decisión institucional
      ejecucion: "#e0a32e", // ámbar: donde se mueve el dinero (riesgo)
      control: "#3fae6f", // jade: verificación
    } as Record<string, string>
  )[fase];
}

export function faseLabel(fase: PasoDinero["fase"]): string {
  return (
    { origen: "Origen", asignacion: "Asignación", ejecucion: "Ejecución", control: "Control" } as Record<string, string>
  )[fase];
}
