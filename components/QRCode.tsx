"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

// QR escaneable real. Codifica `value` (una URL absoluta) sobre canvas.
// Colores alineados a la paleta: módulos navy sobre fondo crema.
export default function QRCodeCanvas({ value, size = 132 }: { value: string; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, value, {
      width: size,
      margin: 1,
      errorCorrectionLevel: "M",
      color: { dark: "#0a2540ff", light: "#f4f1eaff" },
    }).catch(() => {
      /* en demo, fallo silencioso no rompe la página */
    });
  }, [value, size]);

  return <canvas ref={canvasRef} width={size} height={size} aria-label="Código QR de verificación" />;
}
