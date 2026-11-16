// ============================================================
// DATOS SIMULADOS · Demo Transparencia Venezuela
// Todos los datos son FICTICIOS, generados para demostración.
// Ningún contrato, proveedor o monto corresponde a entidades reales.
// ============================================================

export type Riesgo = "alto" | "medio" | "bajo";
export type EstadoContrato = "ALERTA" | "REVISION" | "VERIFICADO";

export interface Ministerio {
  id: string;
  nombre: string;
  contratos: number;
  monto_usd: number;
  riesgo: Riesgo;
  alertas: number;
}

export interface TimelineItem {
  fecha: string;
  evento: string;
  tipo: "registro" | "blockchain" | "ia" | "alerta" | "notif" | "ok";
}

export interface Contrato {
  id: string;
  titulo: string;
  ministerio: string;
  proveedor: string;
  monto_usd: number;
  fecha: string;
  estado: EstadoContrato;
  riesgo: Riesgo;
  hash: string;
  bloque: number;
  analisis_ia: { veredicto: string; detalle: string; score: number };
  timeline: TimelineItem[];
}

export interface Resumen {
  contratos_monitoreados: number;
  monto_total_usd: number;
  alertas_activas: number;
  alertas_criticas: number;
  ahorro_estimado_usd: number;
  ministerios_activos: number;
  verificaciones_ciudadanas: number;
}

export interface AlertaDestacada {
  contrato_id: string;
  titulo: string;
  ministerio: string;
  score: number;
  comparativa: { etiqueta: string; valor_usd: number; color: "rojo" | "verde" }[];
  cantidad: number;
  sobrecosto_total_usd: number;
  recomendacion: string;
  como_lo_detecto: string[];
}

export interface Verificacion {
  contrato_id: string;
  titulo: string;
  monto_usd: number;
  ministerio: string;
  proveedor: string;
  hash: string;
  bloque: number;
  fecha_registro: string;
  verificado: boolean;
}

export const resumen: Resumen = {
  contratos_monitoreados: 1247,
  monto_total_usd: 8420000000,
  alertas_activas: 38,
  alertas_criticas: 7,
  ahorro_estimado_usd: 142000000,
  ministerios_activos: 6,
  verificaciones_ciudadanas: 18934,
};

export const ministerios: Ministerio[] = [
  { id: "salud", nombre: "Salud", contratos: 312, monto_usd: 1850000000, riesgo: "medio", alertas: 9 },
  { id: "energia", nombre: "Energía y Petróleo", contratos: 198, monto_usd: 3200000000, riesgo: "alto", alertas: 14 },
  { id: "infraestructura", nombre: "Infraestructura", contratos: 264, monto_usd: 1980000000, riesgo: "alto", alertas: 8 },
  { id: "educacion", nombre: "Educación", contratos: 221, monto_usd: 720000000, riesgo: "bajo", alertas: 3 },
  { id: "seguridad", nombre: "Seguridad", contratos: 156, monto_usd: 480000000, riesgo: "medio", alertas: 3 },
  { id: "tecnologia", nombre: "Transformación Digital", contratos: 96, monto_usd: 190000000, riesgo: "bajo", alertas: 1 },
];

export const contratos: Contrato[] = [
  {
    id: "VE-SAL-2026-0312",
    titulo: "Suministro de camas hospitalarias UCI",
    ministerio: "Salud",
    proveedor: "Suministros Médicos Andinos C.A.",
    monto_usd: 4200000,
    fecha: "2026-04-12",
    estado: "ALERTA",
    riesgo: "alto",
    hash: "0x7f3a9c2e8b1d4f6a0c5e9b2d8f1a4c7e3b6d9f2a5c8e1b4d7f0a3c6e9b2d5f8a",
    bloque: 4821093,
    analisis_ia: {
      veredicto: "Sobreprecio detectado",
      detalle:
        "Precio unitario por cama UCI: US$8.400. Precio de mercado verificado: US$2.100 (misma marca y modelo). Sobreprecio del 300%.",
      score: 92,
    },
    timeline: [
      { fecha: "2026-04-12 09:14", evento: "Contrato registrado en blockchain", tipo: "registro" },
      { fecha: "2026-04-12 09:14", evento: "Hash inmutable generado", tipo: "blockchain" },
      { fecha: "2026-04-12 09:15", evento: "IA inició análisis automático", tipo: "ia" },
      { fecha: "2026-04-12 09:15", evento: "ALERTA: sobreprecio 300% vs mercado", tipo: "alerta" },
      { fecha: "2026-04-12 11:32", evento: "Notificación enviada a Contraloría", tipo: "notif" },
    ],
  },
  {
    id: "VE-ENE-2026-0198",
    titulo: "Mantenimiento planta termoeléctrica",
    ministerio: "Energía y Petróleo",
    proveedor: "Servicios Energéticos del Caribe C.A.",
    monto_usd: 28500000,
    fecha: "2026-04-08",
    estado: "ALERTA",
    riesgo: "alto",
    hash: "0x3e8b1d4f6a0c5e9b2d8f1a4c7e3b6d9f2a5c8e1b4d7f0a3c6e9b2d5f8a7f3a9c",
    bloque: 4798221,
    analisis_ia: {
      veredicto: "Red de empresas vinculadas",
      detalle:
        "El proveedor comparte dirección fiscal y 2 directivos con otras 4 empresas que ganaron el 78% de las licitaciones de este ministerio en 2026.",
      score: 87,
    },
    timeline: [
      { fecha: "2026-04-08 14:02", evento: "Contrato registrado en blockchain", tipo: "registro" },
      { fecha: "2026-04-08 14:02", evento: "Hash inmutable generado", tipo: "blockchain" },
      { fecha: "2026-04-08 14:03", evento: "IA detectó red de empresas vinculadas", tipo: "alerta" },
      { fecha: "2026-04-08 16:45", evento: "Marcado para auditoría preventiva", tipo: "notif" },
    ],
  },
  {
    id: "VE-INF-2026-0264",
    titulo: "Rehabilitación vial Autopista Regional",
    ministerio: "Infraestructura",
    proveedor: "Constructora Vial Bolívar C.A.",
    monto_usd: 15800000,
    fecha: "2026-04-15",
    estado: "VERIFICADO",
    riesgo: "bajo",
    hash: "0x9b2d8f1a4c7e3b6d9f2a5c8e1b4d7f0a3c6e9b2d5f8a7f3a9c2e8b1d4f6a0c5e",
    bloque: 4835672,
    analisis_ia: {
      veredicto: "Sin anomalías",
      detalle: "Precio dentro del rango de mercado. Proveedor con historial limpio. Documentación completa. Aprobado.",
      score: 12,
    },
    timeline: [
      { fecha: "2026-04-15 10:20", evento: "Contrato registrado en blockchain", tipo: "registro" },
      { fecha: "2026-04-15 10:20", evento: "Hash inmutable generado", tipo: "blockchain" },
      { fecha: "2026-04-15 10:21", evento: "IA validó: sin anomalías", tipo: "ok" },
      { fecha: "2026-04-15 10:21", evento: "Disponible para verificación ciudadana", tipo: "ok" },
    ],
  },
  {
    id: "VE-EDU-2026-0221",
    titulo: "Dotación tecnológica escuelas rurales",
    ministerio: "Educación",
    proveedor: "Tecnología Educativa Nacional C.A.",
    monto_usd: 3400000,
    fecha: "2026-04-18",
    estado: "VERIFICADO",
    riesgo: "bajo",
    hash: "0x5c8e1b4d7f0a3c6e9b2d5f8a7f3a9c2e8b1d4f6a0c5e9b2d8f1a4c7e3b6d9f2a",
    bloque: 4841200,
    analisis_ia: {
      veredicto: "Sin anomalías",
      detalle: "Precios competitivos verificados contra 3 proveedores. Proceso transparente.",
      score: 8,
    },
    timeline: [
      { fecha: "2026-04-18 08:30", evento: "Contrato registrado en blockchain", tipo: "registro" },
      { fecha: "2026-04-18 08:30", evento: "Hash inmutable generado", tipo: "blockchain" },
      { fecha: "2026-04-18 08:31", evento: "IA validó: sin anomalías", tipo: "ok" },
    ],
  },
  {
    id: "VE-SAL-2026-0309",
    titulo: "Compra de medicamentos oncológicos",
    ministerio: "Salud",
    proveedor: "Farmacéutica Continental C.A.",
    monto_usd: 6700000,
    fecha: "2026-04-10",
    estado: "REVISION",
    riesgo: "medio",
    hash: "0x1a4c7e3b6d9f2a5c8e1b4d7f0a3c6e9b2d5f8a7f3a9c2e8b1d4f6a0c5e9b2d8f",
    bloque: 4810445,
    analisis_ia: {
      veredicto: "Revisión recomendada",
      detalle:
        "Proveedor registrado hace 3 meses. Sin historial previo. Monto elevado para empresa nueva. Recomendada verificación documental.",
      score: 58,
    },
    timeline: [
      { fecha: "2026-04-10 13:05", evento: "Contrato registrado en blockchain", tipo: "registro" },
      { fecha: "2026-04-10 13:05", evento: "Hash inmutable generado", tipo: "blockchain" },
      { fecha: "2026-04-10 13:06", evento: "IA marcó para revisión (proveedor nuevo)", tipo: "alerta" },
    ],
  },
];

export const alertaDestacada: AlertaDestacada = {
  contrato_id: "VE-SAL-2026-0312",
  titulo: "Sobreprecio en camas hospitalarias UCI",
  ministerio: "Salud",
  score: 92,
  comparativa: [
    { etiqueta: "Precio en este contrato", valor_usd: 8400, color: "rojo" },
    { etiqueta: "Precio de mercado (misma marca/modelo)", valor_usd: 2100, color: "verde" },
    { etiqueta: "Promedio otros hospitales (2026)", valor_usd: 2350, color: "verde" },
  ],
  cantidad: 500,
  sobrecosto_total_usd: 3150000,
  recomendacion:
    "Suspender ejecución y solicitar justificación de precio al proveedor antes del desembolso. Sobrecosto potencial evitable: US$3,15 millones.",
  como_lo_detecto: [
    "Comparó el precio unitario contra base de datos de precios de mercado",
    "Verificó la misma marca/modelo en otros 47 contratos hospitalarios",
    "Calculó desviación estadística: +300% sobre la media",
    "Generó alerta automática ANTES del desembolso",
  ],
};

export const verificacion: Verificacion = {
  contrato_id: "VE-INF-2026-0264",
  titulo: "Rehabilitación vial Autopista Regional",
  monto_usd: 15800000,
  ministerio: "Infraestructura",
  proveedor: "Constructora Vial Bolívar C.A.",
  hash: "0x9b2d8f1a4c7e3b6d9f2a5c8e1b4d7f0a3c6e9b2d5f8a7f3a9c2e8b1d4f6a0c5e",
  bloque: 4835672,
  fecha_registro: "2026-04-15 10:20",
  verificado: true,
};

// ---- Helpers de formato ----
export function fmtUSD(n: number): string {
  if (n >= 1e9) return "$" + (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return "$" + (n / 1e3).toFixed(0) + "K";
  return "$" + n.toLocaleString("en-US");
}

export function fmtUSDfull(n: number): string {
  return "US$" + n.toLocaleString("en-US");
}

export function riesgoColor(r: Riesgo | string): string {
  return ({ alto: "#e23b52", medio: "#e0a32e", bajo: "#3fae6f" } as Record<string, string>)[r] || "#6b7c93";
}

export function riesgoLabel(r: Riesgo | string): string {
  return ({ alto: "Alto", medio: "Medio", bajo: "Bajo" } as Record<string, string>)[r] || r;
}

export function estadoBadge(e: EstadoContrato | string): { txt: string; bg: string } {
  return (
    (
      {
        ALERTA: { txt: "Alerta", bg: "#e23b52" },
        REVISION: { txt: "En revisión", bg: "#e0a32e" },
        VERIFICADO: { txt: "Verificado", bg: "#3fae6f" },
      } as Record<string, { txt: string; bg: string }>
    )[e] || { txt: e, bg: "#6b7c93" }
  );
}

export function contratoById(id: string): Contrato {
  return contratos.find((c) => c.id === id) || contratos[0];
}
