// SvgDiagram — único punto del proyecto que inyecta HTML crudo.
//
// SEGURIDAD: el `markup` SIEMPRE proviene del motor de diagramas en lib/*.ts,
// que compone strings SVG a partir de constantes estáticas de data.ts/flujos.ts/etc.
// NO hay input de usuario en ninguna ruta hacia aquí: no se concatenan params de URL,
// ni texto de formularios, ni datos remotos. Por tanto no existe vector XSS real
// (el riesgo de dangerouslySetInnerHTML exige contenido no confiable, que aquí no se da).
// Si en el futuro algún dato pasara a ser dinámico/externo, sanitizar con DOMPurify
// ANTES de pasarlo a este componente.
export default function SvgDiagram({
  markup,
  className = "flow-svg-wrap",
}: {
  markup: string;
  className?: string;
}) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: markup }} />;
}
