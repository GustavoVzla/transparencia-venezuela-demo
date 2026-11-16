// ============================================================
// PRECEDENTES REALES · Transparencia Venezuela
// "No es un experimento": cada pieza de nuestro sistema replica un MECANISMO
// que ya funciona en producción en otro gobierno. Robustez por precedente.
// Fuente: investigación de mecanismos reales (Guardtime/KSI, Exonum, Stellar,
// CGU-TCU Alice, UK NFI, World Bank GRAS, OCP Cardinal/OCDS).
// ============================================================

// Una pieza de la arquitectura mapeada a su mecanismo real y dónde se probó.
export interface PrecedentePieza {
  pieza: string;
  mecanismo: string;
  precedente: string;
  desde: string;
  prueba: string;
  replica: string;
  color: string;
}

// Pieza open-source / estándar que se ADOPTA tal cual.
export interface PrecedenteReutilizado {
  nombre: string;
  desc: string;
}

export interface Precedentes {
  blockchain: PrecedentePieza[];
  ia: PrecedentePieza[];
  reutilizado: PrecedenteReutilizado[];
}

// Mapeo: cada PIEZA de nuestra arquitectura → mecanismo real + dónde está probado.
// Usado por los diagramas (badges "= X") y por la sección "Probado en el mundo".
export const PRECEDENTES: Precedentes = {

  // ---- BLOQUE BLOCKCHAIN (integridad + inmutabilidad + trazabilidad) ----
  blockchain: [
    {
      pieza: "Sellado por hash (integridad)",
      mecanismo: "Nunca se sube el documento a la cadena: se sube su huella digital (hash SHA-256). Las huellas se agrupan en un árbol Merkle y se publica solo la raíz. Para probar que un contrato no cambió, se recalcula su hash y se compara con la raíz — sin guardar ninguna clave secreta (keyless).",
      precedente: "Estonia · KSI Blockchain",
      desde: "2012",
      prueba: "Sella la integridad de registros y logs de acceso de todo el Estado (e-Health, justicia, registros). Primer país con blockchain en producción gubernamental.",
      replica: "Cada contrato, modificado y log de acceso se sella por hash. Imposible alterar un monto o backdatear un sobrecosto sin que la verificación falle.",
      color: "#d4b87c",
    },
    {
      pieza: "Registro inmutable + anclaje público",
      mecanismo: "Blockchain permisionada con validadores independientes (consenso BFT: hay que corromper a 2/3 de las entidades, no a un solo administrador) que ancla periódicamente su estado a una cadena pública (Bitcoin). Ni el gobierno de turno puede reescribir la historia.",
      precedente: "Georgia · Land Registry + Bitfury (Exonum)",
      desde: "2016",
      prueba: "Registro nacional de títulos de propiedad anclado a Bitcoin. Pionero mundial en registro de propiedad sobre blockchain.",
      replica: "Validadores = Contraloría + ente independiente + universidad/ONG. El registro de contratos queda fuera del alcance de cualquier gobierno.",
      color: "#d4b87c",
    },
    {
      pieza: "Verificación ciudadana sin permiso",
      mecanismo: "Un 'light client' (la app del ciudadano) verifica un contrato concreto con una prueba Merkle (el camino de hashes hoja→raíz), sin confiar en el servidor del Estado ni pedir autorización.",
      precedente: "Georgia · Exonum light clients",
      desde: "2016",
      prueba: "Cualquiera comprueba criptográficamente que su título está anclado, con timestamp que ni el registro puede alterar.",
      replica: "El QR del ciudadano contiene la prueba Merkle: verifica el contrato contra la cadena pública, no contra nuestra base de datos.",
      color: "#3fae6f",
    },
    {
      pieza: "Pago condicionado a hito verificado",
      mecanismo: "Smart contract que libera el pago de una certificación de obra solo cuando un oráculo/inspector confirma el avance real. Atomicidad: pago y registro ocurren juntos.",
      precedente: "Dubái · Dubai Land Department",
      desde: "2018",
      prueba: "Contratos inmobiliarios con liberación automática condicionada a pago, integrados cross-agencia, sin papel.",
      replica: "El pago por avance de obra no se libera hasta que el hito está verificado on-chain. Ataca el fraude clásico: pagar obra no ejecutada.",
      color: "#8b7fd1",
    },
    {
      pieza: "Pagos trazables a contratistas",
      mecanismo: "Cada pago es una transacción pública en una cadena de pagos (stablecoin estable 1:1 USD), auditable en tiempo real, sin intermediarios opacos y a prueba de devaluación. Cash-out a moneda local cuando se quiera.",
      precedente: "Ucrania · UNHCR + Stellar",
      desde: "2022",
      prueba: "Distribución de ayuda directa a wallets sin banco, cada disburso trazable on-chain, cash-out en red MoneyGram.",
      replica: "Pagos de tesorería al contratista trazables por cualquiera, en tiempo real, sin que se 'pierdan' en intermediarios.",
      color: "#3fae6f",
    },
    {
      pieza: "Puente con la banca/tesorería existente",
      mecanismo: "Un oráculo conecta la verificación on-chain con el riel de pago tradicional: 'hito verificado on-chain' → 'autorizar pago en tesorería'. No obliga a migrar toda la banca a cripto (pre-conditioning).",
      precedente: "Singapur · Project Guardian (MAS, Swift/UBS)",
      desde: "2022",
      prueba: "Liquidación de fondos tokenizados con la pata de pago por Swift (11.500+ instituciones). Blockchain como capa de verdad, pago por riel tradicional.",
      replica: "Venezuela verifica contratos on-chain pero puede liquidar por el sistema bancario existente, reduciendo fricción de adopción.",
      color: "#8b7fd1",
    },
  ],

  // ---- BLOQUE IA ANTI-CORRUPCIÓN (detección antes de la firma) ----
  ia: [
    {
      pieza: "Detección automática pre-firma",
      mecanismo: "Un robot rastrea cada día el portal de compras y el diario oficial, extrae objeto/valor/órgano de cada licitación, aplica reglas de riesgo + ML + cruce de datos, y alerta al auditor MIENTRAS el proceso sigue abierto — antes de la firma, para poder frenarlo.",
      precedente: "Brasil · Alice (CGU/TCU)",
      desde: "2015",
      prueba: "Procesa ~90.000 licitaciones/año. Alerta preventiva diaria a las 19:00 a los auditores. Híbrido explícito: ML + Regex + cruce de datos sobre 77 bases interconectadas (LabContas).",
      replica: "Mismo patrón: ingesta diaria del portal de compras VE + Gaceta → reglas+ML+cruce → alerta antes de adjudicar.",
      color: "#e0a32e",
    },
    {
      pieza: "Indicadores de riesgo (red flags)",
      mecanismo: "El motor calcula indicadores objetivos con fórmula exacta: sobreprecio (valor fuera de Q3+1.5·IQR de su categoría), oferta única, plazo demasiado corto, Ley de Benford sobre montos, concentración de mercado (HHI). Reglas estadísticas explicables, no caja negra.",
      precedente: "Banco Mundial · GRAS + OCP red flags",
      desde: "2019",
      prueba: "GRAS: ~200 red flags en 4 familias (ciclo, colusión, proveedor, conexión política). OCP estandarizó 73 indicadores con fórmula sobre datos abiertos (OCDS).",
      replica: "Adoptamos las fórmulas estándar OCP/GRAS — no las inventamos. 80% del valor son reglas estadísticas (IQR, Benford, HHI), no ML pesado.",
      color: "#e0a32e",
    },
    {
      pieza: "Cruce funcionario ↔ proveedor (grafos)",
      mecanismo: "Cruza bases de datos heterogéneas para detectar contradicciones: socios compartidos entre oferentes (colusión), funcionario que es dueño oculto de un proveedor (testaferro/conflicto de interés), empresas fantasma. El cruce señala, no decide.",
      precedente: "Reino Unido · National Fraud Initiative",
      desde: "1996",
      prueba: "Cruce bienal de ~1.300 organismos: detecta pagos duplicados, conflictos de interés no declarados, pensiones a fallecidos. Ahora con risk scores.",
      replica: "Cruce funcionarios ↔ socios (SAREN) + RIF (SENIAT) → detecta testaferros 'boliburgueses'. El mayor diferenciador para VE.",
      color: "#e23b52",
    },
    {
      pieza: "LLM auditor (copiloto, no juez)",
      mecanismo: "Un modelo de lenguaje lee los pliegos para detectar cláusulas direccionadas (requisitos a medida de un proveedor) y la justificación de las enmiendas/sobrecostos, y resume el caso para el auditor humano. Apoya la decisión; no la toma.",
      precedente: "Brasil · ChatTCU (+ OCDE: UE usa LLMs de apoyo)",
      desde: "2023",
      prueba: "ChatTCU resume procesos y responde jurisprudencia para 1.400+ auditores. La OCDE: los LLMs se usan de apoyo, el scoring de fraude lo hacen los indicadores.",
      replica: "LLM (Claude API) lee contratos largos y justificaciones de sobrecostos, resume para el analista. El humano decide; la IA señala.",
      color: "#8b7fd1",
    },
  ],

  // No reinventar la rueda: piezas open-source / estándar que ADOPTAMOS
  reutilizado: [
    { nombre: "OCDS", desc: "Open Contracting Data Standard — esquema abierto para estructurar datos de contratación pública. Estándar internacional, no propietario." },
    { nombre: "Cardinal (OCP + Microsoft)", desc: "Librería open-source que ya calcula las red flags de contratación sobre OCDS. La adoptamos como base del motor — no reprogramamos los cálculos." },
    { nombre: "Polygon (L2 Ethereum)", desc: "Red pública con anclaje a Ethereum, EVM, gas bajo y finalidad rápida. Verificación de firmas ECDSA nativa on-chain." },
    { nombre: "ECDSA secp256k1", desc: "El mismo algoritmo de firma de Ethereum/Bitcoin: las credenciales ministeriales se verifican on-chain sin servidor central." },
  ],
};
