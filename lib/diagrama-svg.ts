// ============================================================
// DIAGRAMA DE FLUJO SVG EN SERPIENTE (boustrophedon)
// Layout a medida: fila 1 izq→der, baja y dobla, fila 2 der→izq.
// Control total de posición → forma compacta "entre vertical y horizontal".
// Genérico: recibe un objeto de flujo y dibuja su serpiente.
// ============================================================

import { SERP_SALUD } from "./flujos";

// Tipos laxos para los nodos y edges del motor SVG. La forma real es muy
// dinámica (se compone con spreads en runtime), así que se tipa de forma
// permisiva para compilar en strict sin alterar la lógica.
export interface SvgNode {
  id?: string;
  tipo?: string;
  shape?: string;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  ic?: string;
  icScale?: number;
  icScaleTec?: number;
  l1?: string;
  l2?: string;
  l3?: string;
  tic?: string;
  tt1?: string;
  tt2?: string;
  tt3?: string;
  prec?: string;
  [key: string]: unknown;
}

export interface SvgEdge {
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  color?: string;
  path?: string;
  label?: string;
  labelColor?: string;
  lx?: number;
  ly?: number;
  [key: string]: unknown;
}

interface SvgColor {
  fill: string;
  stroke: string;
}

// Paleta por tipo de nodo
export const SVG_COLORES: Record<string, SvgColor> = {
  actor:   { fill: "#14253f", stroke: "#3fae6f" },
  sys:     { fill: "#102a4c", stroke: "#8b7fd1" },
  root:    { fill: "#0a1628", stroke: "#d4b87c" },
  chain:   { fill: "#102a4c", stroke: "#d4b87c" },
  citizen: { fill: "#163a28", stroke: "#3fae6f" },
  bad:     { fill: "#2a0e14", stroke: "#e23b52" },
  datos:   { fill: "#0e2438", stroke: "#5b9bd5" },
};

// Mini-iconos line-art (monocromos, estética institucional — NO emoji a color).
// Cada path está dibujado en una caja 24×24 centrada; se reescala y recolorea
// con el stroke del nodo. Reemplazan los emojis 🏥📋💊🏛👤🔍⛓ etc.
export const SVG_ICONS: Record<string, string> = {
  // hospital: edificio con cruz
  hospital: `<rect x="5" y="7" width="14" height="13" rx="1"/><path d="M12 10v5M9.5 12.5h5"/><path d="M9 20v-3h6v3"/>`,
  // clipboard: portapapeles (adquisiciones)
  clipboard: `<rect x="6" y="5" width="12" height="16" rx="1.5"/><path d="M9 5V4h6v1"/><path d="M9 10h6M9 13.5h6M9 17h4"/>`,
  // pill: cápsula (proveedores médicos)
  pill: `<rect x="5" y="9" width="14" height="6.5" rx="3.25" transform="rotate(-30 12 12)"/><path d="M9.6 8.2l4.8 8.3"/>`,
  // ai: chip / cerebro de circuito (motor IA) — dibujado aparte por estar en rombo
  ai: `<rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 4v3M14 4v3M10 17v3M14 17v3M4 10h3M4 14h3M17 10h3M17 14h3"/><circle cx="12" cy="12" r="2"/>`,
  // search: lupa (contraloría / auditoría)
  search: `<circle cx="11" cy="11" r="6"/><path d="M15.5 15.5L20 20"/>`,
  // building: edificio institucional con columnas (ministro firma)
  building: `<path d="M4 9l8-4 8 4"/><path d="M5 9v9M19 9v9M9 9v9M15 9v9M12 9v9"/><path d="M3 19h18"/>`,
  // chain: eslabones (blockchain)
  chain: `<rect x="4.5" y="9.5" width="8" height="5.5" rx="2.75"/><rect x="11.5" y="9.5" width="8" height="5.5" rx="2.75"/>`,
  // person: persona (ciudadano)
  person: `<circle cx="12" cy="8" r="3.2"/><path d="M6 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5"/>`,
  // star: estrella (raíz)
  star: `<path d="M12 4l2.3 5.1 5.5.5-4.1 3.6 1.2 5.3L12 16.4 7.1 18l1.2-5.3L4.2 9.6l5.5-.5z"/>`,
  // cross-x: rechazado
  xmark: `<path d="M7 7l10 10M17 7L7 17"/>`,
  // --- Iconos técnicos (capa de arquitectura) ---
  // browser: ventana de navegador / app web
  browser: `<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M4 9h16M7 7h.01M9.5 7h.01"/>`,
  // mobile: teléfono / app móvil
  mobile: `<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>`,
  // gateway: API gateway (entrada/distribuidor)
  gateway: `<path d="M4 8l8-4 8 4v8l-8 4-8-4z"/><path d="M4 8l8 4 8-4M12 12v8"/>`,
  // server: servidor / backend
  server: `<rect x="4" y="5" width="16" height="6" rx="1"/><rect x="4" y="13" width="16" height="6" rx="1"/><path d="M7.5 8h.01M7.5 16h.01"/>`,
  // database: base de datos (cilindro de datos)
  database: `<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>`,
  // brain: modelo IA / ML
  brain: `<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5.8A3 3 0 0 0 8 18a3 3 0 0 0 4 1 3 3 0 0 0 4-1 3 3 0 0 0 3-5.2A3 3 0 0 0 18 7a3 3 0 0 0-3-3 3 3 0 0 0-3 1 3 3 0 0 0-3-1z"/><path d="M12 5v14"/>`,
  // doc: documento (OCR / archivo)
  doc: `<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 15h5M10 18h3"/>`,
  // key: clave / credencial criptográfica
  key: `<circle cx="8" cy="8" r="4"/><path d="M11 11l8 8M16 16l2-2M18 18l2-2"/>`,
  // shield: PKI / seguridad / firma
  shield: `<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>`,
  // cloud: servicios cloud / oráculo
  cloud: `<path d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.5A3.5 3.5 0 0 1 17 18z"/>`,
  // globe: red pública / portal abierto
  globe: `<circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c2.5 2.5 2.5 13 0 16M12 4c-2.5 2.5-2.5 13 0 16"/>`,
  // link-out: oráculo / fuente externa
  oracle: `<circle cx="12" cy="12" r="3"/><path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M17.7 6.3l-2.1 2.1M8.4 15.6l-2.1 2.1"/>`,
  // pin: geolocalización (infraestructura)
  pin: `<path d="M12 21c4-4 6-7 6-10a6 6 0 0 0-12 0c0 3 2 6 6 10z"/><circle cx="12" cy="11" r="2.5"/>`,
};

// Renderiza un mini-icono vectorial centrado en (cx,cy), color = stroke del nodo.
export function svgIcono(key: string, cx: number, cy: number, color: string, scale: number = 0.92): string {
  const p = SVG_ICONS[key];
  if (!p) return "";
  // los paths están en caja 24×24 (centro 12,12); trasladamos y escalamos
  const t = `translate(${cx - 12 * scale}, ${cy - 12 * scale}) scale(${scale})`;
  return `<g class="svg-gicon" stroke="${color}" transform="${t}">${p}</g>`;
}

// Dibuja un nodo (rect redondeado o rombo para decisiones)
export function svgNodo(n: SvgNode): string {
  const c = SVG_COLORES[n.tipo as string] || SVG_COLORES.actor;
  const w = n.w || 168, h = n.h || 76;
  const x = (n.x as number) - w / 2, y = (n.y as number) - h / 2;

  if (n.shape === "diamond") {
    // rombo (decisión)
    const cx = n.x as number, cy = n.y as number, rx = w / 2 + 6, ry = h / 2 + 10;
    const pts = `${cx},${cy - ry} ${cx + rx},${cy} ${cx},${cy + ry} ${cx - rx},${cy}`;
    return `
      <g class="svg-node" data-node="${n.id}">
        <polygon points="${pts}" fill="${c.fill}" stroke="${c.stroke}" stroke-width="2"/>
        ${svgLabel(n, cx, cy)}
      </g>`;
  }
  if (n.shape === "stadium") {
    // cápsula (ciudadano)
    return `
      <g class="svg-node" data-node="${n.id}">
        <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h/2}" fill="${c.fill}" stroke="${c.stroke}" stroke-width="1.8"/>
        ${svgLabel(n, n.x as number, n.y as number)}
      </g>`;
  }
  if (n.shape === "cylinder") {
    // cilindro (blockchain)
    const ry = 9;
    return `
      <g class="svg-node" data-node="${n.id}">
        <path d="M${x},${y+ry} a${w/2},${ry} 0 0 1 ${w},0 v${h-ry*2} a${w/2},${ry} 0 0 1 -${w},0 Z" fill="${c.fill}" stroke="${c.stroke}" stroke-width="1.8"/>
        <ellipse cx="${n.x}" cy="${y+ry}" rx="${w/2}" ry="${ry}" fill="${c.fill}" stroke="${c.stroke}" stroke-width="1.8"/>
        ${svgLabel(n, n.x as number, (n.y as number)+3)}
      </g>`;
  }
  // rect redondeado (actor/normal)
  return `
    <g class="svg-node" data-node="${n.id}">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${c.fill}" stroke="${c.stroke}" stroke-width="1.8"/>
      ${svgLabel(n, n.x as number, n.y as number)}
    </g>`;
}

// Etiqueta de texto del nodo (mini-icono vectorial + 2 o 3 líneas).
// Con l3 presente (modo técnico), reorganiza para 3 líneas más compactas:
// l1 = título (serif), l2/l3 = detalle técnico (mono pequeño).
export function svgLabel(n: SvgNode, cx: number, cy: number): string {
  const c = SVG_COLORES[n.tipo as string] || SVG_COLORES.actor;
  const hasIcon = !!n.ic;
  const dia = n.shape === "diamond";  // en rombo el texto debe ir más al centro
  if (n.l3) {
    // 3 líneas: icono arriba, título, y dos líneas de detalle técnico.
    const icon = hasIcon ? svgIcono(n.ic as string, cx, cy - 26, c.stroke, n.icScale || 0.85) : "";
    const t1 = `<text x="${cx}" y="${cy - 6}" class="svg-t1" text-anchor="middle">${n.l1}</text>`;
    const t2 = `<text x="${cx}" y="${cy + 11}" class="svg-tt" text-anchor="middle">${n.l2}</text>`;
    const t3 = `<text x="${cx}" y="${cy + 25}" class="svg-tt" text-anchor="middle">${n.l3}</text>`;
    return icon + t1 + t2 + t3;
  }
  // Rombo: icono y líneas comprimidos hacia el centro (donde es más ancho) para
  // que la 2ª línea no toque el vértice inferior. Rect: espaciado normal.
  const iconDy = dia ? -13 : -16;
  const l1Dy = hasIcon ? (dia ? 4 : 9) : -2;
  const l2Dy = hasIcon ? (dia ? 18 : 25) : 14;
  const icon = hasIcon ? svgIcono(n.ic as string, cx, cy + iconDy, c.stroke, n.icScale || 0.9) : "";
  const l1 = n.l1 ? `<text x="${cx}" y="${cy + l1Dy}" class="svg-t1" text-anchor="middle">${n.l1}</text>` : "";
  const l2 = n.l2 ? `<text x="${cx}" y="${cy + l2Dy}" class="svg-t2" text-anchor="middle">${n.l2}</text>` : "";
  return icon + l1 + l2;
}

// El dibujo de una conexión se separa en DOS capas para evitar que la cajita
// de etiqueta tape la punta de flecha (las etiquetas van por encima de los
// nodos, las líneas por debajo):
//   svgEdgeLine  → solo el path + la cabeza de flecha
//   svgEdgeLabel → solo la cajita de etiqueta (fondo opaco que tapa la línea)
export function svgEdgeLine(e: SvgEdge): string {
  const { x1, y1, x2, y2, color = "#7a8ba0", path } = e;
  const d = path || `M${x1},${y1} L${x2},${y2}`;
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="1.8" marker-end="url(#arrow)"/>`;
}
export function svgEdgeLabel(e: SvgEdge): string {
  if (!e.label) return "";
  const mx = e.lx != null ? e.lx : ((e.x1 as number) + (e.x2 as number)) / 2;
  const my = e.ly != null ? e.ly : ((e.y1 as number) + (e.y2 as number)) / 2;
  const wBox = e.label.length * 6.6 + 12;
  return `
    <g>
      <rect x="${mx - wBox/2}" y="${my - 11}" width="${wBox}" height="22" rx="6" fill="#0a1628" stroke="${e.labelColor || '#7a8ba0'}" stroke-opacity="0.35" stroke-width="1"/>
      <text x="${mx}" y="${my + 4}" class="svg-edge-label" text-anchor="middle" fill="${e.labelColor || '#b8c2d0'}">${e.label}</text>
    </g>`;
}

// Badge circular de número de fase (sustituye los caracteres Unicode ①②③,
// que el navegador renderiza diminutos). Círculo del color de la fase + número.
export function svgBadgeFase(cx: number, cy: number, num: string, color: string): string {
  return `
    <circle cx="${cx}" cy="${cy}" r="9" fill="${color}"/>
    <text x="${cx}" y="${cy + 4.5}" class="svg-badge-fase" text-anchor="middle">${num}</text>`;
}

// Compat: Salud usa la firma vieja; internamente delega en el motor genérico.
export function svgSerpienteSalud(modo: string = "operativo"): string { return svgSerpienteMinisterio(SERP_SALUD, modo); }

// Motor genérico del diagrama serpiente por ministerio. Layout, ramas, zonas y
// posiciones son SIEMPRE iguales (ya pulidos); solo cambia el CONTENIDO de los
// nodos, que viene de `f` (objeto por ministerio: f.A, f.B, f.P, f.IA, f.AUD,
// f.MIN, f.BC, f.CIU — cada uno con ic/l1/l2 operativo + tic/tt1/tt2/tt3 técnico).
// modo="operativo": lenguaje de negocio. modo="tecnico": tecnología dentro de la caja.
export function svgSerpienteMinisterio(f: Record<string, any>, modo: string = "operativo"): string {
  const tec = modo === "tecnico";
  const W = 1000, H = 560;
  const NW = tec ? 188 : 172, NH = tec ? 88 : 78;
  const R1 = 130;
  // Mezcla el contenido del ministerio (f.X) con la posición/forma fija del nodo.
  const mk = (key: string, base: SvgNode): SvgNode => ({ ...f[key], ...base });
  const N: Record<string, SvgNode> = {
    A:    mk("A",   { id:"A", tipo:"actor", x:130, y:R1, w:NW, h:NH }),
    B:    mk("B",   { id:"B", tipo:"actor", x:375, y:R1, w:NW, h:NH }),
    P:    mk("P",   { id:"P", tipo:"actor", x:620, y:R1, w:NW, h:NH }),
    IA:   mk("IA",  { id:"IA", tipo:"sys", shape:"diamond", ic:"ai", icScale:0.8, icScaleTec:0.7, l1:"IA analiza", l2:"el contrato", tic:"brain", tt1:"Motor IA", tt2:"IQR·Benford·HHI", tt3:"grafos + LLM", x:865, y:R1, w:tec?150:128, h:tec?86:70 }),
    // rama de control (derecha) — común salvo el nombre del órgano auditor (f.AUD)
    AUD:  mk("AUD", { id:"AUD", tipo:"actor", ic:"search", tic:"search", tt1:"Panel de auditoría", tt2:"webhook abre caso,", tt3:"decisión logueada", x:885, y:330, w:NW, h:NH }),
    RECH: { id:"RECH", tipo:"bad", ic:"xmark", l1:"Rechazado",
            tic:"xmark", tt1:"Rechazado", tt2:"no se firma ni sella;", tt3:"fuera de la cadena", x:865, y:490, w:tec?172:150, h:tec?80:64 },
    // fila 2 (der→izq)
    RAIZ: { id:"RAIZ", tipo:"root", shape:"diamond", ic:"star", icScale:0.8, l1:"¿Autoriza", l2:"la Raíz?",
            tic:"shield", icScaleTec:0.7, tt1:"Verificación", tt2:"cadena ECDSA", tt3:"ministerio→raíz", x:620, y:330, w:tec?160:140, h:tec?88:74 },
    MIN:  { id:"MIN", tipo:"actor", ic:"building", l1:"Ministro", l2:"firma",
            tic:"key", tt1:"Firma ECDSA", tt2:"secp256k1 sobre", tt3:"el hash", x:375, y:330, w:NW, h:NH },
    BC:   { id:"BC", tipo:"chain", shape:"cylinder", ic:"chain", l1:"Sellado en", l2:"blockchain",
            tic:"chain", tt1:"Hash → Merkle", tt2:"anclado en Polygon", tt3:"documento → IPFS", x:130, y:330, w:NW, h:tec?96:86 },
    CIU:  { id:"CIU", tipo:"citizen", shape:"stadium", ic:"person", l1:"Ciudadano", l2:"verifica QR",
            tic:"globe", tt1:"Light client", tt2:"prueba Merkle", tt3:"vía QR", x:130, y:490, w:NW, h:NH },
  };
  // En modo técnico, sustituir el contenido dentro de cada caja (misma estructura).
  if (tec) Object.values(N).forEach(n => {
    n.l1 = n.tt1; n.l2 = n.tt2; n.l3 = n.tt3;
    if (n.tic) n.ic = n.tic;
    if (n.icScaleTec) n.icScale = n.icScaleTec;
  });

  // helper bordes (rectángulo nominal)
  const r = (id: string): SvgNode => N[id];
  const right = (n: SvgNode) => (n.x as number) + (n.w as number)/2, left = (n: SvgNode) => (n.x as number) - (n.w as number)/2, top = (n: SvgNode) => (n.y as number) - (n.h as number)/2, bot = (n: SvgNode) => (n.y as number) + (n.h as number)/2;
  // helper vértices de ROMBO (diamond): se dibuja con rx=w/2+6, ry=h/2+10,
  // MÁS grande que el rect nominal. Las flechas deben terminar en estos vértices
  // (no en los del rect) o la punta queda dentro del rombo y el nodo la tapa.
  const dTop = (n: SvgNode) => (n.y as number) - ((n.h as number)/2 + 10), dBot = (n: SvgNode) => (n.y as number) + ((n.h as number)/2 + 10);
  const dLeft = (n: SvgNode) => (n.x as number) - ((n.w as number)/2 + 6), dRight = (n: SvgNode) => (n.x as number) + ((n.w as number)/2 + 6);

  // --- Conexiones ---
  // Regla de ruteo: las flechas que cambian de fase cruzan el borde de la caja
  // PERPENDICULAR (vertical u horizontal puro en el punto de cruce), nunca en
  // diagonal. Cada etiqueta se centra SOBRE su propio tramo. Codos redondeados.
  // Etiquetas de las 2 ramas de decisión de la IA (varían por sector).
  const ram = f.ramas || {};
  const lblAnomalia = ram.anomalia || "sobreprecio";   // IA → auditoría
  const lblOk = ram.ok || "precio normal";             // IA → raíz directo
  const iaBot = R1 + (N.IA.h as number)/2 + 10;   // vértice inferior del rombo IA (punto de decisión) = 163
  const edges: SvgEdge[] = [
    // Fila 1 (rectas horizontales)
    { x1:right(r("A"))+2, y1:R1, x2:left(r("B"))-2, y2:R1 },
    { x1:right(r("B"))+2, y1:R1, x2:left(r("P"))-2, y2:R1 },
    { x1:right(r("P"))+2, y1:R1, x2:(N.IA.x as number)-(N.IA.w as number)/2-8, y2:R1 },

    // Ambas ramas nacen del vértice inferior del rombo IA y bajan en VERTICAL
    // puro. La rama "precio normal" dobla a la izquierda por un pasillo ALTO
    // (y=204) y "sobreprecio" sigue recta hacia abajo: así sus tramos no se
    // cruzan a la misma altura y cada etiqueta queda sobre línea despejada.
    // IA → AUD ("sobreprecio"): baja vertical puro y entra a Contraloría por arriba.
    // Etiqueta sobre el tramo vertical YA dentro de la zona ② (y=262), para dejar
    // libre el pasillo horizontal donde circula la rama "precio normal".
    { path:`M${N.IA.x},${iaBot} L${N.IA.x},${top(r("AUD"))-2}`,
      label:lblAnomalia, labelColor:"#e0a32e", lx:N.IA.x as number, ly:262 },
    // IA → RAIZ ("precio normal"): baja un poco, dobla a la izquierda por el
    // pasillo (y=204) y baja a la Raíz por su vértice superior. La flecha termina
    // 3px ARRIBA del vértice superior del rombo (dTop) para que la punta se vea.
    { path:`M${N.IA.x},${iaBot} L${N.IA.x},192 Q${N.IA.x},204 ${(N.IA.x as number)-40},204 L${(N.RAIZ.x as number)+30},204 Q${N.RAIZ.x},204 ${N.RAIZ.x},${dTop(r("RAIZ"))-16} L${N.RAIZ.x},${dTop(r("RAIZ"))-3}`,
      label:lblOk, labelColor:"#3fae6f", lx:(N.RAIZ.x as number)+70, ly:204 },

    // AUD → RECH ("no se justifica"): baja en VERTICAL puro (misma columna x).
    { path:`M${r("AUD").x},${bot(r("AUD"))+2} L${r("AUD").x},${top(r("RECH"))-2}`,
      label:"no se justifica", labelColor:"#e23b52", lx:r("AUD").x as number, ly:415 },
    // AUD → RAIZ ("corregido"): horizontal puro der→izq. La flecha termina 6px a la
    // DERECHA del vértice del rombo (dRight). La etiqueta se centra en el tramo
    // dejando gap visible a ambos lados (flecha↔cajita↔Contraloría).
    { x1:left(r("AUD"))-2, y1:330, x2:dRight(r("RAIZ"))+6, y2:330, label:"corregido", labelColor:"#3fae6f", lx:752, ly:330 },
    // RAIZ → RECH ("no"): baja del vértice INFERIOR real de la Raíz (dBot), codo y
    // entra a Rechazado por su lado izquierdo (cruce horizontal perpendicular).
    { path:`M${N.RAIZ.x},${dBot(r("RAIZ"))} L${N.RAIZ.x},458 Q${N.RAIZ.x},490 ${(N.RAIZ.x as number)+30},490 L${left(r("RECH"))-2},490`,
      label:"no", labelColor:"#e23b52", lx:N.RAIZ.x as number, ly:415 },
    // RAIZ → MIN ("sí"): horizontal puro, sale del vértice IZQUIERDO real (dLeft).
    { x1:dLeft(r("RAIZ")), y1:330, x2:right(r("MIN"))+2, y2:330, label:"sí", labelColor:"#3fae6f", lx:520, ly:330 },
    // MIN → BC ("Fila 2"): horizontal puro, cruza el hueco entre zona ② y ③.
    { x1:left(r("MIN"))-2, y1:330, x2:right(r("BC"))+2, y2:330 },
    // BC → CIU: baja en VERTICAL puro.
    { x1:130, y1:bot(r("BC"))+2, x2:130, y2:top(r("CIU"))-2 },
  ];

  const nodos = Object.values(N).map(svgNodo).join("");
  const lineas = edges.map(svgEdgeLine).join("");      // capa 1: paths + flechas (debajo de nodos)
  const etiquetas = edges.map(svgEdgeLabel).join("");  // capa 3: cajitas de etiqueta (encima de todo)

  const nom = f.nombre || "Ministerio";
  const aria = tec ? `Diagrama técnico del ${nom} (qué tecnología ejecuta cada paso)` : `Diagrama de flujo de certificación del ${nom}`;
  return `
  <svg viewBox="0 0 ${W} ${H}" class="flow-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${aria}">
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#7a8ba0"/>
      </marker>
    </defs>
    <!-- ZONAS DE FASE: recuadros de fondo que agrupan visualmente cada sección.
         El número de fase es un badge circular dibujado (no carácter Unicode). -->
    <!-- Fase 1 · Solicitud y oferta: franja superior (Hospital → IA) -->
    <g class="svg-zone">
      <rect x="44" y="74" width="900" height="126" rx="14" fill="rgba(63,174,111,0.05)" stroke="rgba(63,174,111,0.28)" stroke-width="1.5" stroke-dasharray="6 5"/>
      <rect x="58" y="61" width="218" height="26" rx="13" fill="#0a1628" stroke="rgba(63,174,111,0.4)" stroke-width="1"/>
      ${svgBadgeFase(75, 74, "1", "#3fae6f")}
      <text x="92" y="78" class="svg-zone-label" fill="#3fae6f">SOLICITUD Y OFERTA</text>
    </g>
    <!-- Fase 2 · Validación: Contraloría, Raíz, Ministro (firma), Rechazado -->
    <g class="svg-zone">
      <rect x="280" y="232" width="700" height="296" rx="14" fill="rgba(212,184,124,0.05)" stroke="rgba(212,184,124,0.28)" stroke-width="1.5" stroke-dasharray="6 5"/>
      <rect x="294" y="220" width="150" height="26" rx="13" fill="#0a1628" stroke="rgba(212,184,124,0.4)" stroke-width="1"/>
      ${svgBadgeFase(311, 233, "2", "#d4b87c")}
      <text x="328" y="237" class="svg-zone-label" fill="#d4b87c">VALIDACIÓN</text>
    </g>
    <!-- Fase 3 · Registro y ciudadano: Blockchain, Ciudadano (columna izquierda-abajo) -->
    <g class="svg-zone">
      <rect x="44" y="232" width="216" height="296" rx="14" fill="rgba(139,127,209,0.05)" stroke="rgba(139,127,209,0.28)" stroke-width="1.5" stroke-dasharray="6 5"/>
      <rect x="58" y="220" width="140" height="26" rx="13" fill="#0a1628" stroke="rgba(139,127,209,0.4)" stroke-width="1"/>
      ${svgBadgeFase(75, 233, "3", "#a99ee0")}
      <text x="92" y="237" class="svg-zone-label" fill="#a99ee0">REGISTRO</text>
    </g>
    ${lineas}
    ${nodos}
    ${etiquetas}
  </svg>`;
}
