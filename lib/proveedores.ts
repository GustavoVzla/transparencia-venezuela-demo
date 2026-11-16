// ============================================================
// INSTITUCIONES Y EMPRESAS · datos SIMULADOS con estructura institucional REAL
// Basado en la contratación pública venezolana (LCP 2014): Servicio Nacional de
// Contrataciones (SNC), Registro Nacional de Contratistas (RNC), modalidades de
// selección por umbral en Unidades Tributarias, e inhabilitación vía Contraloría.
// Hilo: el RNC ya captura accionistas y junta directiva — el problema no es la
// falta del dato, sino que no se cruza funcionario↔proveedor ni se hace público.
// ============================================================

export type EstadoProveedor = "HABILITADO" | "INHABILITADO" | "SUSPENDIDO" | "ALERTA";
export type TipoProveedor = "privada" | "publica" | "mixta";

export interface PasoAdquisicion {
  n: number;
  titulo: string;
  organismo: string;
  controla: string;
  precedente: string;
  atajo?: boolean; // true = el "atajo" de contratación directa (camino de riesgo)
}

export interface Modalidad {
  nombre: string;
  umbral: string; // en Unidades Tributarias (legalmente correcto, no se desactualiza)
  oferentes: string;
  riesgo: "bajo" | "medio" | "alto";
}

export interface Proveedor {
  id: string;
  nombre: string;
  rif: string;
  rnc: string;
  estado: EstadoProveedor;
  tipo: TipoProveedor;
  ministerio: string; // con quién contrata principalmente
  capacidad_financiera_usd: number; // monto máximo certificado
  beneficiario_final: string; // accionista/UBO hasta persona natural
  contratos: number;
  monto_contratos_usd: number;
  bandera?: string; // hallazgo de la IA (testaferro, sobreprecio, fachada...)
}

// Modalidades de selección (LCP 2014) — umbrales en U.T. con lógica de bandas.
export const MODALIDADES: Modalidad[] = [
  { nombre: "Consulta de Precios", umbral: "hasta 5.000 U.T.", oferentes: "mín. 3 proveedores", riesgo: "medio" },
  { nombre: "Concurso Cerrado", umbral: "5.000 – 20.000 U.T.", oferentes: "mín. 5 invitados", riesgo: "bajo" },
  { nombre: "Concurso Abierto", umbral: "> 20.000 U.T.", oferentes: "abierto a todos", riesgo: "bajo" },
  { nombre: "Contratación Directa", umbral: "excepcional, cualquier monto", oferentes: "1 (acto motivado)", riesgo: "alto" },
];

export const PASOS_ADQUISICION: PasoAdquisicion[] = [
  {
    n: 1,
    titulo: "Programación",
    organismo: "Órgano contratante · SNC",
    controla: "Plan Anual de Compras publicado y verificable. La IA detecta compras no programadas que aparecen de improviso.",
    precedente: "OCDS · planning stage",
  },
  {
    n: 2,
    titulo: "Pliego de condiciones",
    organismo: "Comisión de Contrataciones",
    controla: "Hash del pliego. La IA lee el pliego buscando requisitos hechos a medida para un proveedor concreto.",
    precedente: "Ucrania Prozorro · risk indicators",
  },
  {
    n: 3,
    titulo: "Llamado · modalidad según umbral",
    organismo: "Órgano contratante",
    controla: "Verifica que la modalidad corresponda al monto (U.T.). Detecta fraccionamiento: varios contratos pequeños al mismo proveedor para evitar el concurso.",
    precedente: "Ucrania Prozorro · detección de fraccionamiento",
  },
  {
    n: 3.5,
    titulo: "Contratación Directa (atajo)",
    organismo: "Máxima autoridad · acto motivado",
    controla: "Marca en rojo toda contratación directa: verifica la justificación y alerta si es injustificada o recurrente con el mismo proveedor.",
    precedente: "World Bank · red flags de contratación sin competencia",
    atajo: true,
  },
  {
    n: 4,
    titulo: "Ofertas",
    organismo: "Proveedores con RNC vigente",
    controla: "Bloquea proveedores inhabilitados (Contraloría) o suspendidos (SNC). La IA detecta colusión: ofertas pactadas entre empresas vinculadas.",
    precedente: "World Bank Debarment List + cross-debarment",
  },
  {
    n: 5,
    titulo: "Evaluación",
    organismo: "Comisión de Contrataciones",
    controla: "Cruza el beneficiario final de cada oferente contra el padrón de funcionarios → alerta de testaferro o conflicto de interés.",
    precedente: "Open Contracting · UBO ↔ procurement",
  },
  {
    n: 6,
    titulo: "Adjudicación",
    organismo: "Máxima autoridad (acto motivado)",
    controla: "Ancla el precio adjudicado y lo compara con referencias de mercado e históricos → marca el sobreprecio (como en el caso Derwick).",
    precedente: "OCDS + analítica Prozorro",
  },
  {
    n: 7,
    titulo: "Contrato y garantías",
    organismo: "Órgano contratante",
    controla: "Sella el contrato y sus fianzas on-chain. Verifica que existan las garantías exigidas antes de comprometer el pago.",
    precedente: "OCDS · contract stage",
  },
  {
    n: 8,
    titulo: "Ejecución y control",
    organismo: "Contraloría General · SNC",
    controla: "Expediente completo, inmutable y siempre disponible. Evaluación de desempeño del contratista. Resuelve el portal de sanciones que hoy está caído.",
    precedente: "Prozorro 'todos ven todo' + DoZorro",
  },
];

// Directorio simulado de proveedores. Mezcla privadas, públicas y mixtas,
// con estados y banderas que la IA levantaría. Coherente con los ministerios
// y casos que ya usa la demo (Suministros Médicos Andinos, etc.).
export const PROVEEDORES: Proveedor[] = [
  {
    id: "P-001",
    nombre: "Suministros Médicos Andinos C.A.",
    rif: "J-40XXXXXX-1",
    rnc: "RNC-2026-08812",
    estado: "ALERTA",
    tipo: "privada",
    ministerio: "Salud",
    capacidad_financiera_usd: 12000000,
    beneficiario_final: "3 accionistas · 1 coincide con padrón de funcionarios",
    contratos: 7,
    monto_contratos_usd: 14600000,
    bandera: "Sobreprecio del 300% en camas UCI + accionista vinculado a funcionario adjudicador (testaferro).",
  },
  {
    id: "P-002",
    nombre: "Servicios Energéticos del Caribe C.A.",
    rif: "J-41XXXXXX-7",
    rnc: "RNC-2026-04419",
    estado: "ALERTA",
    tipo: "privada",
    ministerio: "Energía y Petróleo",
    capacidad_financiera_usd: 60000000,
    beneficiario_final: "Comparte dirección fiscal y 2 directivos con otras 4 empresas",
    contratos: 11,
    monto_contratos_usd: 78400000,
    bandera: "Red de empresas vinculadas que ganó el 78% de las licitaciones del ministerio en 2026.",
  },
  {
    id: "P-003",
    nombre: "Constructora Vial Bolívar C.A.",
    rif: "J-39XXXXXX-3",
    rnc: "RNC-2026-02651",
    estado: "HABILITADO",
    tipo: "privada",
    ministerio: "Infraestructura",
    capacidad_financiera_usd: 45000000,
    beneficiario_final: "4 accionistas · sin coincidencias · historial limpio",
    contratos: 9,
    monto_contratos_usd: 41200000,
  },
  {
    id: "P-004",
    nombre: "CORPOELEC (empresa del Estado)",
    rif: "G-20XXXXXX-0",
    rnc: "No requiere (ente público)",
    estado: "HABILITADO",
    tipo: "publica",
    ministerio: "Energía y Petróleo",
    capacidad_financiera_usd: 0,
    beneficiario_final: "Estado venezolano (ente público)",
    contratos: 23,
    monto_contratos_usd: 310000000,
    bandera: "Adquisición entre entes públicos: contratación directa permitida. Vigilar encadenamiento a filiales privadas.",
  },
  {
    id: "P-005",
    nombre: "Inversiones Caribe Express C.A.",
    rif: "J-50XXXXXX-9",
    rnc: "RNC-2026-09903",
    estado: "INHABILITADO",
    tipo: "privada",
    ministerio: "Infraestructura",
    capacidad_financiera_usd: 2000000,
    beneficiario_final: "1 accionista · empresa constituida hace 3 meses",
    contratos: 0,
    monto_contratos_usd: 0,
    bandera: "Empresa de fachada: sin capacidad técnica real, inhabilitada por la Contraloría.",
  },
  {
    id: "P-006",
    nombre: "Tecnología Educativa Nacional C.A.",
    rif: "J-40XXXXXX-5",
    rnc: "RNC-2026-07725",
    estado: "HABILITADO",
    tipo: "privada",
    ministerio: "Educación",
    capacidad_financiera_usd: 8000000,
    beneficiario_final: "2 accionistas · sin coincidencias · proceso transparente",
    contratos: 5,
    monto_contratos_usd: 9800000,
  },
];

export function estadoProveedorColor(e: EstadoProveedor): string {
  return (
    {
      HABILITADO: "#3fae6f",
      INHABILITADO: "#e23b52",
      SUSPENDIDO: "#e0a32e",
      ALERTA: "#e0a32e",
    } as Record<string, string>
  )[e];
}

export function tipoProveedorLabel(t: TipoProveedor): string {
  return ({ privada: "Privada", publica: "Pública (Estado)", mixta: "Mixta" } as Record<string, string>)[t];
}

export function modalidadColor(r: Modalidad["riesgo"]): string {
  return ({ bajo: "#3fae6f", medio: "#e0a32e", alto: "#e23b52" } as Record<string, string>)[r];
}
