// ============================================================
// CAPA TÉCNICA · Arquitectura del sistema · Transparencia Venezuela
// Diagrama de ARQUITECTURA (capas) del chasis transversal + modelo PKI.
// Reutiliza el motor SVG (svgNodo, svgIcono, svgEdgeLine/Label) de diagrama-svg.
// OPSEC: arquitectura CONCEPTUAL con tecnologías nombradas. NO código, NO secretos,
// NO endpoints reales. Datos simulados.
// ============================================================

import { SVG_COLORES, svgNodo, svgEdgeLine, svgEdgeLabel, svgBadgeFase, type SvgNode, type SvgEdge } from "./diagrama-svg";

interface ArqStackItem {
  capa: string;
  tec: string;
  nota: string;
  color: string;
}

interface Arquitectura {
  stack: ArqStackItem[];
  notaIA: string;
}

export const ARQUITECTURA: Arquitectura = {
  // Stack tecnológico nombrado (tarjetas bajo el diagrama)
  stack: [
    { capa: "Cliente", tec: "Next.js · React · Tailwind", nota: "Portal público web + app móvil ciudadana (PWA)", color: "#3fae6f" },
    { capa: "API", tec: "API REST · Edge Functions", nota: "Puerta única, autenticación, rate limiting, validación de esquema", color: "#8b7fd1" },
    { capa: "Servicios", tec: "Motor IA (ML + LLM) · Servicio PKI · Indexador on-chain", nota: "Lógica de detección, firma criptográfica y lectura de eventos blockchain", color: "#e0a32e" },
    { capa: "Confianza", tec: "Polygon (L2 Ethereum) · Solidity · viem", nota: "Smart contract de registro inmutable. Hash on-chain, evento público", color: "#d4b87c" },
    { capa: "Datos", tec: "PostgreSQL (Supabase) · IPFS", nota: "Metadatos consultables + almacenamiento documental descentralizado", color: "#5b9bd5" },
  ],

  // Las 4 capas de la arquitectura (bandas horizontales). Cada una agrupa nodos.
  // El flujo es vertical: una petición baja Cliente→API→Servicios→Confianza/Datos.
  notaIA: "El Motor IA combina dos enfoques: modelos de ML para detección de anomalías cuantitativas (sobreprecio, patrones atípicos) y un LLM auditor para análisis cualitativo de documentos y justificaciones.",
};

// ------------------------------------------------------------
// Diagrama de ARQUITECTURA EN CAPAS (layered).
// 4 bandas horizontales apiladas; nodos dentro; flujo vertical descendente
// y de retorno (consulta pública) ascendente.
// ------------------------------------------------------------
export function svgArquitecturaChasis(modo: string = "descriptivo"): string {
  const tec = modo === "tecnico";
  const W = 1000, H = 640;
  const NW = tec ? 184 : 168, NH = tec ? 82 : 70;

  // Y de cada banda/capa
  const Y = { cliente: 95, api: 235, serv: 380, datos: 545 };

  // Cada nodo: descriptivo (l1/l2, qué ES la pieza) y técnico (tt1/tt2/tt3, la
  // tecnología/protocolo concreto). En modo técnico se sustituye dentro de la caja.
  const N: Record<string, SvgNode> = {
    // Capa cliente
    WEB:  { id:"WEB",  tipo:"actor",  ic:"browser", l1:"Portal público", l2:"web (Next.js)",
            tt1:"Next.js + React", tt2:"SSR/ISR · Vercel edge", tt3:"Tailwind", x:300, y:Y.cliente, w:NW, h:NH },
    APP:  { id:"APP",  tipo:"actor",  ic:"mobile",  l1:"App ciudadana", l2:"móvil (PWA)",
            tt1:"PWA instalable", tt2:"service worker", tt3:"escáner QR nativo", x:540, y:Y.cliente, w:NW, h:NH },
    // Capa API
    API:  { id:"API",  tipo:"sys",    ic:"gateway", l1:"API Gateway", l2:"REST · Edge",
            tt1:"REST + Edge Functions", tt2:"auth JWT · rate limit", tt3:"validación zod", x:420, y:Y.api, w:tec?220:200, h:NH },
    // Capa servicios (3 servicios en fila)
    IA:   { id:"IA",   tipo:"sys",    ic:"brain",   l1:"Motor IA", l2:"ML + LLM auditor",
            tt1:"Cardinal (OCDS)", tt2:"IQR·Benford·HHI·grafos", tt3:"LLM auditor (Claude)", x:200, y:Y.serv, w:NW, h:NH },
    PKI:  { id:"PKI",  tipo:"chain",  ic:"shield",  l1:"Servicio PKI", l2:"firma de credenciales",
            tt1:"ECDSA secp256k1", tt2:"raíz firma delegados", tt3:"verificación on-chain", x:420, y:Y.serv, w:NW, h:NH },
    IDX:  { id:"IDX",  tipo:"sys",    ic:"server",  l1:"Indexador", l2:"eventos on-chain",
            tt1:"escucha eventos", tt2:"del smart contract", tt3:"→ tablas consultables", x:640, y:Y.serv, w:NW, h:NH },
    // Capa confianza + datos — ALINEADOS bajo su servicio para evitar cruces:
    // IA(200)→DB(200) · PKI(420)→BC(420) · IDX(640)→IPFS(640)
    DB:   { id:"DB",   tipo:"datos",  ic:"database", l1:"PostgreSQL", l2:"metadatos (Supabase)",
            tt1:"PostgreSQL", tt2:"RLS · solo lectura", tt3:"pública (Supabase)", x:200, y:Y.datos, w:NW, h:NH },
    BC:   { id:"BC",   tipo:"chain",  shape:"cylinder", ic:"chain", l1:"Polygon (L2)", l2:"smart contract",
            tt1:"Solidity en Polygon", tt2:"hash + Merkle root", tt3:"anclaje a Ethereum", x:420, y:Y.datos, w:NW, h:tec?92:84 },
    IPFS: { id:"IPFS", tipo:"datos",  ic:"doc",     l1:"IPFS", l2:"docs descentralizados",
            tt1:"IPFS", tt2:"PDF por content-hash", tt3:"sin servidor central", x:640, y:Y.datos, w:NW, h:NH },
  };
  if (tec) Object.values(N).forEach(n => { n.l1 = n.tt1; n.l2 = n.tt2; n.l3 = n.tt3; });

  const right = (n: SvgNode)=>(n.x as number)+(n.w as number)/2, left=(n: SvgNode)=>(n.x as number)-(n.w as number)/2, top=(n: SvgNode)=>(n.y as number)-(n.h as number)/2, bot=(n: SvgNode)=>(n.y as number)+(n.h as number)/2;
  const r = (id: string): SvgNode => N[id];

  const edges: SvgEdge[] = [
    // Cliente → API (ambos bajan al gateway)
    { path:`M${N.WEB.x},${bot(r("WEB"))+2} L${N.WEB.x},${Y.api} Q${N.WEB.x},${top(r("API"))-2} ${left(r("API"))-2},${top(r("API"))-2}`, color:"#5d7494" },
    { path:`M${N.APP.x},${bot(r("APP"))+2} L${N.APP.x},${Y.api} Q${N.APP.x},${top(r("API"))-2} ${right(r("API"))+2},${top(r("API"))-2}`, color:"#5d7494" },
    // API → 3 servicios (baja a un pasillo común y reparte en horizontal)
    { path:`M${N.API.x},${bot(r("API"))+2} L${N.API.x},${Y.serv-58} Q${N.API.x},${Y.serv-48} ${(N.API.x as number)-20},${Y.serv-48} L${(N.IA.x as number)+20},${Y.serv-48} Q${N.IA.x},${Y.serv-48} ${N.IA.x},${top(r("IA"))-2}`, color:"#5d7494" },
    { x1:N.API.x as number, y1:bot(r("API"))+2, x2:N.PKI.x as number, y2:top(r("PKI"))-2, color:"#5d7494", label:"orquesta", labelColor:"#8b7fd1", lx:N.PKI.x as number, ly:318 },
    { path:`M${N.API.x},${bot(r("API"))+2} L${N.API.x},${Y.serv-58} Q${N.API.x},${Y.serv-48} ${(N.API.x as number)+20},${Y.serv-48} L${(N.IDX.x as number)-20},${Y.serv-48} Q${N.IDX.x},${Y.serv-48} ${N.IDX.x},${top(r("IDX"))-2}`, color:"#5d7494" },
    // Servicios → capa inferior (VERTICAL puro, cada servicio sobre su dato)
    // IA → DB (lee base de precios de referencia)
    { x1:N.IA.x as number, y1:bot(r("IA"))+2, x2:N.DB.x as number, y2:top(r("DB"))-2, color:"#5d7494", label:"consulta precios", labelColor:"#5b9bd5", lx:N.IA.x as number, ly:462 },
    // PKI → BC (la firma se sella on-chain)
    { x1:N.PKI.x as number, y1:bot(r("PKI"))+2, x2:N.BC.x as number, y2:top(r("BC"))-2, color:"#5d7494", label:"sella", labelColor:"#d4b87c", lx:N.PKI.x as number, ly:462 },
    // IDX → IPFS (referencia documental indexada)
    { x1:N.IDX.x as number, y1:bot(r("IDX"))+2, x2:N.IPFS.x as number, y2:top(r("IPFS"))-2, color:"#5d7494", label:"indexa", labelColor:"#3fae6f", lx:N.IDX.x as number, ly:462 },
  ];

  const lineas = edges.map(svgEdgeLine).join("");
  const etiquetas = edges.map(svgEdgeLabel).join("");
  const nodos = Object.values(N).map(svgNodo).join("");

  // Bandas de capa (zonas horizontales) — dibujadas al fondo
  const banda = (y1: number, y2: number, label: string, color: string, num: string): string => {
    const h = y2 - y1;
    return `
    <g class="svg-zone">
      <rect x="40" y="${y1}" width="920" height="${h}" rx="14" fill="${color}0d" stroke="${color}44" stroke-width="1.5" stroke-dasharray="6 5"/>
      <rect x="54" y="${y1-13}" width="${label.length*7.4+44}" height="26" rx="13" fill="#0a1628" stroke="${color}66" stroke-width="1"/>
      ${svgBadgeFase(71, y1, num, color)}
      <text x="88" y="${y1+4}" class="svg-zone-label" fill="${color}">${label}</text>
    </g>`;
  };

  return `
  <svg viewBox="0 0 ${W} ${H}" class="flow-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Arquitectura técnica del sistema en capas">
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#5d7494"/>
      </marker>
    </defs>
    ${banda(60, 165, "CLIENTE", "#3fae6f", "1")}
    ${banda(200, 290, "API · PUERTA ÚNICA", "#8b7fd1", "2")}
    ${banda(325, 435, "SERVICIOS", "#e0a32e", "3")}
    ${banda(490, 600, "CONFIANZA Y DATOS", "#d4b87c", "4")}
    ${lineas}
    ${nodos}
    ${etiquetas}
  </svg>`;
}

// ------------------------------------------------------------
// Diagrama PKI · certificación de 2 niveles (raíz + delegados)
// Arriba: Autoridad Raíz (Gobierno) con su par de claves.
// Medio: credenciales firmadas para cada ministerio (delegados).
// Abajo: verificador público que comprueba la cadena de confianza.
// ------------------------------------------------------------
export function svgArquitecturaPKI(): string {
  const W = 1000, H = 520;
  const NW = 168, NH = 72;

  const N: Record<string, SvgNode> = {
    // Nivel 0 · Autoridad Raíz
    RAIZ: { id:"RAIZ", tipo:"root", shape:"diamond", ic:"star", icScale:0.8, l1:"Autoridad Raíz", l2:"Gobierno Central", x:500, y:90, w:188, h:80 },
    // Nivel 1 · Ministerios delegados (credenciales firmadas por la raíz)
    M1: { id:"M1", tipo:"chain", ic:"key", l1:"Min. Salud", l2:"cred. delegada", x:200, y:280, w:NW, h:NH },
    M2: { id:"M2", tipo:"chain", ic:"key", l1:"Min. Educación", l2:"cred. delegada", x:410, y:280, w:NW, h:NH },
    M3: { id:"M3", tipo:"chain", ic:"key", l1:"Min. Energía", l2:"cred. delegada", x:620, y:280, w:NW, h:NH },
    MN: { id:"MN", tipo:"sys", ic:"shield", l1:"… +3 ministerios", l2:"misma raíz", x:825, y:280, w:NW, h:NH },
    // Nivel 2 · Verificación pública de la cadena
    VER: { id:"VER", tipo:"citizen", shape:"stadium", ic:"globe", l1:"Verificador público", l2:"comprueba la cadena", x:500, y:445, w:240, h:NH },
  };

  const left=(n: SvgNode)=>(n.x as number)-(n.w as number)/2, right=(n: SvgNode)=>(n.x as number)+(n.w as number)/2, top=(n: SvgNode)=>(n.y as number)-(n.h as number)/2, bot=(n: SvgNode)=>(n.y as number)+(n.h as number)/2;
  const r=(id: string): SvgNode=>N[id];
  const dBot = (n: SvgNode) => (n.y as number) + ((n.h as number)/2 + 10);  // vértice inferior de rombo

  const edges: SvgEdge[] = [
    // Raíz → cada ministerio (firma la credencial). Bajan en abanico.
    { path:`M${N.RAIZ.x},${dBot(r("RAIZ"))} C${(N.RAIZ.x as number)-120},190 ${N.M1.x},210 ${N.M1.x},${top(r("M1"))-2}`, color:"#d4b87c", label:"firma", labelColor:"#d4b87c", lx:300, ly:200 },
    { path:`M${N.RAIZ.x},${dBot(r("RAIZ"))} C${(N.RAIZ.x as number)-30},195 ${N.M2.x},205 ${N.M2.x},${top(r("M2"))-2}`, color:"#d4b87c" },
    { path:`M${N.RAIZ.x},${dBot(r("RAIZ"))} C${(N.RAIZ.x as number)+60},195 ${N.M3.x},205 ${N.M3.x},${top(r("M3"))-2}`, color:"#d4b87c" },
    { path:`M${N.RAIZ.x},${dBot(r("RAIZ"))} C${(N.RAIZ.x as number)+160},190 ${N.MN.x},210 ${N.MN.x},${top(r("MN"))-2}`, color:"#d4b87c" },
    // Ministerios → verificador (la cadena se comprueba hacia la raíz). Bajan al verificador.
    { path:`M${N.M2.x},${bot(r("M2"))+2} L${N.M2.x},${(N.VER.y as number)-55} Q${N.M2.x},${N.VER.y} ${left(r("VER"))-2},${N.VER.y}`, color:"#3fae6f", label:"valida cadena", labelColor:"#3fae6f", lx:N.M2.x as number, ly:(N.VER.y as number)-72 },
    { path:`M${N.M3.x},${bot(r("M3"))+2} L${N.M3.x},${(N.VER.y as number)-55} Q${N.M3.x},${N.VER.y} ${right(r("VER"))+2},${N.VER.y}`, color:"#3fae6f" },
  ];

  const lineas = edges.map(svgEdgeLine).join("");
  const etiquetas = edges.map(svgEdgeLabel).join("");
  const nodos = Object.values(N).map(svgNodo).join("");

  return `
  <svg viewBox="0 0 ${W} ${H}" class="flow-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Modelo PKI de certificación de dos niveles">
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#5d7494"/>
      </marker>
    </defs>
    ${lineas}
    ${nodos}
    ${etiquetas}
  </svg>`;
}

// ============================================================
// DIAGRAMAS DE PROCESO PROFUNDOS (el "cómo funciona por dentro" real).
// No son cajas estáticas: muestran el recorrido paso a paso con la técnica
// concreta de cada etapa, y cada nodo lleva un SELLO de precedente probado.
// ============================================================

// Datos de los 3 procesos. Cada nodo: {ic, l1, l2, tipo, shape?, prec?}
// prec = sello "probado en" que ancla la técnica a un sistema real.
interface ProcesoNodo {
  ic: string;
  l1: string;
  l2: string;
  tipo: string;
  shape?: string;
  prec?: string;
}

interface Proceso {
  titulo: string;
  intro: string;
  nodos: ProcesoNodo[];
  edges: string[];
}

export const PROCESOS: Record<string, Proceso> = {

  // 1) Pipeline del Motor IA — cómo se detecta el sobreprecio/fraude de verdad
  ia: {
    titulo: "Pipeline del Motor IA · de un contrato a una alerta",
    intro: "Un contrato no recibe un veredicto de una caja negra. Pasa por capas acumulativas, de la más barata y explicable (reglas) a la más fina (grafos y LLM). Cada capa replica una técnica ya probada.",
    nodos: [
      { ic:"clipboard", l1:"Contrato entrante", l2:"monto, ítems, oferentes", tipo:"actor" },
      { ic:"server", l1:"Extracción de features", l2:"precio unit., nº ofertas, plazo", tipo:"sys", prec:"OCDS · estándar abierto" },
      { ic:"brain", l1:"Capa de reglas", l2:"IQR · Benford · HHI", tipo:"sys", prec:"OCP / Cardinal" },
      { ic:"oracle", l1:"Capa de grafos", l2:"socios · testaferros", tipo:"bad", prec:"UK NFI · WB GRAS" },
      { ic:"doc", l1:"LLM auditor", l2:"lee pliego y justificación", tipo:"sys", prec:"Brasil ChatTCU" },
      { ic:"search", l1:"Score + decisión", l2:"aprueba · alerta · rechaza", tipo:"root", shape:"diamond", prec:"Brasil Alice" },
    ],
    edges: ["normaliza", "z-score vs mercado", "cruza bases", "señales", "combina"],
  },

  // 2) Recorrido del dato — qué pasa on-chain vs off-chain, paso a paso
  dato: {
    titulo: "Recorrido de un contrato · on-chain vs off-chain",
    intro: "Regla de oro de todos los gobiernos que usan blockchain: el documento NUNCA se sube a la cadena. Se sube su huella. Así se prueba integridad sin exponer datos ni saturar la red.",
    nodos: [
      { ic:"doc", l1:"PDF del contrato", l2:"documento completo", tipo:"actor" },
      { ic:"database", l1:"IPFS", l2:"guarda el documento", tipo:"datos", prec:"off-chain" },
      { ic:"key", l1:"Hash SHA-256", l2:"huella única del doc", tipo:"chain", shape:"diamond", prec:"Estonia KSI · keyless" },
      { ic:"chain", l1:"Árbol Merkle", l2:"raíz anclada on-chain", tipo:"chain", shape:"cylinder", prec:"Georgia · ancla a Bitcoin" },
      { ic:"globe", l1:"Verificación ciudadana", l2:"prueba Merkle vía QR", tipo:"citizen", prec:"Exonum light client" },
    ],
    edges: ["se guarda en", "se calcula", "se sella", "cualquiera verifica"],
  },

  // 3) Firma y verificación PKI — cómo se confía sin servidor central
  pki: {
    titulo: "Firma y cadena de confianza · sin servidor central",
    intro: "El sistema no confía en 'quién dice ser' un ministerio: confía en una firma criptográfica encadenada hasta la raíz. El mismo algoritmo de Ethereum, verificable on-chain.",
    nodos: [
      { ic:"star", l1:"Autoridad Raíz", l2:"clave del Gobierno", tipo:"root", shape:"diamond" },
      { ic:"key", l1:"Credencial delegada", l2:"clave del ministerio", tipo:"chain", prec:"ECDSA secp256k1" },
      { ic:"shield", l1:"Firma del contrato", l2:"firma el hash, no el PDF", tipo:"chain" },
      { ic:"search", l1:"Verificación de cadena", l2:"ministerio → raíz", tipo:"sys", shape:"diamond", prec:"on-chain, sin servidor" },
    ],
    edges: ["firma la credencial", "firma con su clave", "se comprueba"],
  },
};

// Sello de precedente: pastilla pequeña bajo un nodo ("✓ probado en X").
export function svgSelloPrec(cx: number, cy: number, texto: string, color: string): string {
  const w = texto.length * 6.0 + 26;
  return `
    <g class="svg-sello">
      <rect x="${cx - w/2}" y="${cy}" width="${w}" height="19" rx="9.5" fill="#0a1628" stroke="${color}" stroke-opacity="0.55" stroke-width="1"/>
      <text x="${cx - w/2 + 10}" y="${cy + 13.5}" class="svg-sello-check" fill="${color}">✓</text>
      <text x="${cx + 6}" y="${cy + 13.5}" class="svg-sello-txt" text-anchor="middle" fill="${color}">${texto}</text>
    </g>`;
}

// Generador genérico de pipeline de proceso en SERPIENTE adaptativo (4-6 nodos).
// Cada nodo con su sello de precedente debajo. Reutiliza el motor SVG.
export function svgArqProceso(key: string): string {
  const p = PROCESOS[key];
  if (!p) return "";
  const n = p.nodos.length;
  const W = 1000, NW = 172, NH = 72;
  const perRow = Math.ceil(n / 2);
  const dosFilas = n > perRow;
  const R1 = 95, R2 = 305;
  const H = dosFilas ? 430 : 235;
  const xsFor = (count: number): number[] => {
    const margin = 115, usable = W - margin * 2;
    if (count === 1) return [W / 2];
    return Array.from({ length: count }, (_, i) => margin + (usable * i) / (count - 1));
  };
  const row1 = p.nodos.slice(0, perRow);
  const row2 = p.nodos.slice(perRow);
  const xs1 = xsFor(row1.length);
  const xs2 = [...xsFor(row2.length)].reverse(); // fila 2 va der→izq

  const N: SvgNode[] = [];
  row1.forEach((nd, i) => N.push({ ...nd, id: "n" + i, x: xs1[i], y: R1, w: NW, h: nd.shape === "cylinder" ? 84 : NH }));
  row2.forEach((nd, i) => N.push({ ...nd, id: "n" + (perRow + i), x: xs2[i], y: R2, w: NW, h: nd.shape === "cylinder" ? 84 : NH }));

  const top = (m: SvgNode) => (m.y as number) - (m.h as number) / 2, bot = (m: SvgNode) => (m.y as number) + (m.h as number) / 2, left = (m: SvgNode) => (m.x as number) - (m.w as number) / 2, right = (m: SvgNode) => (m.x as number) + (m.w as number) / 2;
  const isDia = (i: number) => N[i].shape === "diamond";
  const dT = (m: SvgNode) => (m.y as number) - ((m.h as number) / 2 + 10), dB = (m: SvgNode) => (m.y as number) + ((m.h as number) / 2 + 10), dL = (m: SvgNode) => (m.x as number) - ((m.w as number) / 2 + 6), dR = (m: SvgNode) => (m.x as number) + ((m.w as number) / 2 + 6);

  const E: SvgEdge[] = [];
  for (let i = 0; i < n - 1; i++) {
    const a = N[i], b = N[i + 1], lbl = p.edges[i] || "";
    const giro = (i + 1) === perRow && dosFilas;
    if (giro) {
      const sB = isDia(i) ? dB(a) : bot(a);
      const eT = isDia(i + 1) ? dT(b) : top(b);
      E.push({ path: `M${a.x},${sB + 2} C${a.x},${(R1 + R2) / 2} ${(b.x as number) + 40},${(R1 + R2) / 2} ${b.x},${eT - 2}`, color: "#5d7494", label: lbl, labelColor: "#8b7fd1", lx: ((a.x as number) + (b.x as number)) / 2 + 28, ly: (R1 + R2) / 2 });
    } else {
      const dir = (b.x as number) > (a.x as number) ? 1 : -1;
      const x1 = dir > 0 ? (isDia(i) ? dR(a) : right(a)) + 2 : (isDia(i) ? dL(a) : left(a)) - 2;
      const x2 = dir > 0 ? (isDia(i + 1) ? dL(b) : left(b)) - 2 : (isDia(i + 1) ? dR(b) : right(b)) + 2;
      E.push({ x1, y1: a.y as number, x2, y2: b.y as number, color: "#5d7494", label: lbl, labelColor: "#8b7fd1", lx: (x1 + x2) / 2, ly: (a.y as number) - 26 });
    }
  }

  const lineas = E.map(svgEdgeLine).join("");
  const etiquetas = E.map(svgEdgeLabel).join("");
  const nodos = N.map(svgNodo).join("");
  const sellos = N.map(m => {
    if (!m.prec) return "";
    const c = SVG_COLORES[m.tipo as string] || SVG_COLORES.actor;
    return svgSelloPrec(m.x as number, bot(m) + 8, m.prec as string, c.stroke);
  }).join("");

  return `
  <svg viewBox="0 0 ${W} ${H}" class="flow-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${p.titulo}">
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#5d7494"/>
      </marker>
    </defs>
    ${lineas}
    ${nodos}
    ${etiquetas}
    ${sellos}
  </svg>`;
}
