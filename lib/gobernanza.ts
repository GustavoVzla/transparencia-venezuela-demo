// ============================================================
// MODELO DE GOBERNANZA JERÁRQUICA · Transparencia Venezuela
// Datos SIMULADOS. Modela el sistema de certificación en 2 niveles:
//   Nivel 0 — Gobierno Central = Autoridad Certificadora RAÍZ
//   Nivel 1 — Ministerios      = Certificadores DELEGADOS
// Inspirado en PKI (jerarquía de certificados) y el modelo e-Estonia.
// ============================================================

interface GobernanzaRaiz {
  nombre: string;
  rol: string;
  descripcion: string;
  clave_publica: string;
  hash_genesis: string;
  bloque_genesis: number;
  fecha_constitucion: string;
  ministerios_autorizados: number;
  ministerios_revocados: number;
  poderes: string[];
}

interface GobernanzaCertificador {
  id: string;
  nombre: string;
  rol: string;
  estado: string;
  credencial: string;
  firmado_por_raiz: boolean;
  fecha_autorizacion: string;
  vigencia: string;
  contratos_certificados: number;
  contratos_firmados_validos: number;
  contratos_en_alerta: number;
  responsable_tecnico: string;
  ambito: string;
  riesgo: string;
  nota_supervision?: string;
}

interface GobernanzaFlujoPaso {
  paso: number;
  titulo: string;
  actor: string;
  responsable: string;
  accion: string;
  herramienta: string;
  resultado: string;
  nivel: string;
}

interface GobernanzaEvento {
  fecha: string;
  evento: string;
  tipo: string;
}

interface Gobernanza {
  raiz: GobernanzaRaiz;
  certificadores: GobernanzaCertificador[];
  flujo_certificacion: GobernanzaFlujoPaso[];
  eventos_raiz: GobernanzaEvento[];
}

export const GOBERNANZA: Gobernanza = {

  // ---- NIVEL 0: AUTORIDAD CERTIFICADORA RAÍZ ----
  raiz: {
    nombre: "Gobierno Central de Venezuela",
    rol: "Autoridad Certificadora Raíz del Estado",
    descripcion: "No registra contratos directamente. Autoriza, supervisa y puede revocar la autoridad de cada ministerio. Es la raíz de confianza de todo el sistema.",
    clave_publica: "0xROOT_4f8a2c9e1b7d3a6f0c5e9b2d8f1a4c7e3b6d9f2a", // raíz simbólica
    hash_genesis: "0x000000a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9",
    bloque_genesis: 1,
    fecha_constitucion: "2026-02-01",
    ministerios_autorizados: 6,
    ministerios_revocados: 0,
    poderes: [
      "Emitir credenciales certificadoras a ministerios",
      "Supervisar la actividad certificadora de toda la red",
      "Revocar la autoridad de un ministerio ante corrupción sistémica",
      "Garantizar que cada contrato lleve doble validación (ministerio + raíz)"
    ],
  },

  // ---- NIVEL 1: CERTIFICADORES DELEGADOS (MINISTERIOS) ----
  // Cada uno tiene su propia credencial, firmada por la raíz.
  certificadores: [
    {
      id: "salud",
      nombre: "Ministerio de Salud",
      rol: "Certificador Delegado",
      estado: "ACTIVO",
      credencial: "0xCERT_SAL_8b1d4f6a0c5e9b2d8f1a4c7e3b6d9f2a5c8e1b4d",
      firmado_por_raiz: true,
      fecha_autorizacion: "2026-02-10",
      vigencia: "2027-02-10",
      contratos_certificados: 312,
      contratos_firmados_validos: 303,
      contratos_en_alerta: 9,
      responsable_tecnico: "Dirección de Sistemas · Min. Salud",
      ambito: "Infraestructura hospitalaria, equipos médicos, insumos, medicinas",
      riesgo: "medio",
    },
    {
      id: "energia",
      nombre: "Ministerio de Energía y Petróleo",
      rol: "Certificador Delegado",
      estado: "ACTIVO · BAJO SUPERVISIÓN",
      credencial: "0xCERT_ENE_2c9e1b7d3a6f0c5e9b2d8f1a4c7e3b6d9f2a5c8e",
      firmado_por_raiz: true,
      fecha_autorizacion: "2026-02-10",
      vigencia: "2027-02-10",
      contratos_certificados: 198,
      contratos_firmados_validos: 184,
      contratos_en_alerta: 14,
      responsable_tecnico: "Oficina de Transparencia · Min. Energía",
      ambito: "Contratos petroleros, proyectos eléctricos y mineros",
      riesgo: "alto",
      nota_supervision: "14 alertas activas. La raíz incrementó el nivel de supervisión sobre este certificador.",
    },
    {
      id: "infraestructura",
      nombre: "Ministerio de Infraestructura",
      rol: "Certificador Delegado",
      estado: "ACTIVO · BAJO SUPERVISIÓN",
      credencial: "0xCERT_INF_1b7d3a6f0c5e9b2d8f1a4c7e3b6d9f2a5c8e1b4d",
      firmado_por_raiz: true,
      fecha_autorizacion: "2026-02-12",
      vigencia: "2027-02-12",
      contratos_certificados: 264,
      contratos_firmados_validos: 256,
      contratos_en_alerta: 8,
      responsable_tecnico: "Unidad de Obras Públicas Digital",
      ambito: "Obras públicas, mantenimiento vial, reconstrucción",
      riesgo: "alto",
      nota_supervision: "Concentración de contratos en pocos proveedores. Vigilancia reforzada.",
    },
    {
      id: "educacion",
      nombre: "Ministerio de Educación",
      rol: "Certificador Delegado",
      estado: "ACTIVO",
      credencial: "0xCERT_EDU_3a6f0c5e9b2d8f1a4c7e3b6d9f2a5c8e1b4d7f0a",
      firmado_por_raiz: true,
      fecha_autorizacion: "2026-02-15",
      vigencia: "2027-02-15",
      contratos_certificados: 221,
      contratos_firmados_validos: 218,
      contratos_en_alerta: 3,
      responsable_tecnico: "Dirección de Tecnología Educativa",
      ambito: "Infraestructura escolar y universitaria, dotación",
      riesgo: "bajo",
    },
    {
      id: "seguridad",
      nombre: "Ministerio de Seguridad",
      rol: "Certificador Delegado",
      estado: "ACTIVO",
      credencial: "0xCERT_SEG_6f0c5e9b2d8f1a4c7e3b6d9f2a5c8e1b4d7f0a3c",
      firmado_por_raiz: true,
      fecha_autorizacion: "2026-02-18",
      vigencia: "2027-02-18",
      contratos_certificados: 156,
      contratos_firmados_validos: 153,
      contratos_en_alerta: 3,
      responsable_tecnico: "Oficina de Adquisiciones Transparentes",
      ambito: "Equipamiento de fuerzas de seguridad",
      riesgo: "medio",
    },
    {
      id: "tecnologia",
      nombre: "Ministerio de Transformación Digital",
      rol: "Certificador Delegado",
      estado: "ACTIVO",
      credencial: "0xCERT_TEC_0c5e9b2d8f1a4c7e3b6d9f2a5c8e1b4d7f0a3c6e",
      firmado_por_raiz: true,
      fecha_autorizacion: "2026-02-20",
      vigencia: "2027-02-20",
      contratos_certificados: 96,
      contratos_firmados_validos: 95,
      contratos_en_alerta: 1,
      responsable_tecnico: "Dirección General de Gobierno Digital",
      ambito: "Transformación digital gubernamental",
      riesgo: "bajo",
    },
  ],

  // ---- FLUJO DE CERTIFICACIÓN (los pasos del proceso) ----
  // Cada paso con su actor, responsable y herramienta. Para el diagrama.
  flujo_certificacion: [
    {
      paso: 1,
      titulo: "Autorización del certificador",
      actor: "Gobierno Central (Raíz)",
      responsable: "Autoridad Certificadora Raíz",
      accion: "El gobierno central emite una credencial digital firmada al ministerio, autorizándolo a certificar contratos en su ámbito.",
      herramienta: "Smart contract de roles (AccessControl)",
      resultado: "El ministerio queda registrado como certificador delegado válido.",
      nivel: "raiz",
    },
    {
      paso: 2,
      titulo: "Registro del contrato",
      actor: "Ministerio (Delegado)",
      responsable: "Funcionario autorizado del ministerio",
      accion: "El ministerio registra un contrato (proveedor, monto, objeto) y lo firma con su credencial certificadora.",
      herramienta: "Portal del ministerio + firma digital",
      resultado: "El contrato entra al sistema con la firma del ministerio.",
      nivel: "ministerio",
    },
    {
      paso: 3,
      titulo: "Doble validación",
      actor: "Sistema (automático)",
      responsable: "Smart contract de certificación",
      accion: "El sistema verifica que (a) el ministerio está autorizado por la raíz y (b) la firma del ministerio es válida. Sin ambas, el contrato se rechaza.",
      herramienta: "Smart contract de verificación de cadena de certificación",
      resultado: "Contrato con doble firma: ministerio + garantía de la raíz.",
      nivel: "sistema",
    },
    {
      paso: 4,
      titulo: "Sellado inmutable en blockchain",
      actor: "Blockchain (Polygon)",
      responsable: "Red descentralizada",
      accion: "El contrato validado se sella en blockchain con un hash único. Imposible de borrar o modificar.",
      herramienta: "Blockchain pública (Polygon)",
      resultado: "Registro permanente y verificable por cualquiera.",
      nivel: "sistema",
    },
    {
      paso: 5,
      titulo: "Análisis de IA",
      actor: "Motor de IA",
      responsable: "Sistema de detección automática",
      accion: "La IA compara el contrato contra precios de mercado, históricos y redes de proveedores. Asigna un score de riesgo.",
      herramienta: "Modelo de IA anti-corrupción",
      resultado: "Score de riesgo + alerta automática si hay anomalía.",
      nivel: "sistema",
    },
    {
      paso: 6,
      titulo: "Supervisión de la raíz",
      actor: "Gobierno Central (Raíz)",
      responsable: "Autoridad Certificadora Raíz",
      accion: "La raíz monitorea las alertas de todos los ministerios. Si un certificador acumula corrupción sistémica, puede revocar su autoridad.",
      herramienta: "Panel consolidado nacional + facultad de revocación",
      resultado: "Supervisión continua. Revocación si es necesario.",
      nivel: "raiz",
    },
    {
      paso: 7,
      titulo: "Verificación ciudadana",
      actor: "Ciudadano",
      responsable: "Cualquier persona",
      accion: "El ciudadano escanea un QR o consulta el portal público y verifica el contrato y su cadena de certificación completa.",
      herramienta: "Portal público + app móvil",
      resultado: "Transparencia total. La confianza no depende de creer, sino de verificar.",
      nivel: "ciudadano",
    },
  ],

  // ---- EVENTOS DE GOBERNANZA (para mostrar la raíz en acción) ----
  eventos_raiz: [
    { fecha: "2026-02-01", evento: "Constitución de la Autoridad Certificadora Raíz", tipo: "genesis" },
    { fecha: "2026-02-10", evento: "Autorizados Salud y Energía como certificadores delegados", tipo: "autorizacion" },
    { fecha: "2026-02-12", evento: "Autorizado Infraestructura", tipo: "autorizacion" },
    { fecha: "2026-02-15", evento: "Autorizado Educación", tipo: "autorizacion" },
    { fecha: "2026-02-18", evento: "Autorizado Seguridad", tipo: "autorizacion" },
    { fecha: "2026-02-20", evento: "Autorizado Transformación Digital", tipo: "autorizacion" },
    { fecha: "2026-04-08", evento: "Supervisión reforzada sobre Energía (14 alertas activas)", tipo: "supervision" },
    { fecha: "2026-04-15", evento: "Supervisión reforzada sobre Infraestructura (concentración de proveedores)", tipo: "supervision" },
  ],
};

// Helpers gobernanza
export function estadoCertColor(estado: string): string {
  if (estado.includes("REVOCADO")) return "#e23b52";
  if (estado.includes("SUPERVISIÓN")) return "#e0a32e";
  return "#3fae6f"; // ACTIVO
}
