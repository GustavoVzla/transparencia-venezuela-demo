"use client";

import { useEffect, useState } from "react";
import { verificacion as v, fmtUSDfull } from "@/lib/data";
import QRCodeCanvas from "@/components/QRCode";

const STEPS = [
  { strong: "Escanea el QR", rest: " que aparece en cualquier obra, contrato o documento público." },
  { strong: "El sistema consulta la blockchain", rest: " y muestra el registro original e inmutable." },
  { strong: "Comparas", rest: " lo que dice el papel con lo que dice la cadena. Si no coinciden, hay manipulación." },
  { strong: "Reportas", rest: " cualquier discrepancia con un toque. Transparencia en manos de todos." },
];

export default function VerificarPage() {
  // El QR codifica la URL absoluta de la página de escaneo de ESTE registro.
  // Se resuelve el origin en cliente para que funcione en local y en producción.
  const [qrUrl, setQrUrl] = useState("");
  useEffect(() => {
    const origin = window.location.origin;
    setQrUrl(`${origin}/escanear?id=${v.contrato_id}`);
  }, []);

  return (
    <>
      <div className="page-title">Verificación ciudadana</div>
      <div className="page-sub">
        Cualquier ciudadano puede confirmar un registro público escaneando su código QR.
      </div>

      <div className="verify-hero">
        <div className="verify-qr">{qrUrl && <QRCodeCanvas value={qrUrl} />}</div>
        <div style={{ fontSize: 14, color: "var(--paper-dim)" }}>Escanéalo: lleva al registro en blockchain</div>
        <div className="verify-check">✓ Auténtico e inmutable</div>
      </div>

      <div className="card-box">
        <div
          style={{
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: 1,
            color: "var(--paper-mute)",
            fontWeight: 700,
            marginBottom: 6,
          }}
        >
          Contrato verificado
        </div>
        <div className="contract-title" style={{ fontSize: 16 }}>
          {v.titulo}
        </div>
        <div className="contract-id">{v.contrato_id}</div>
        <div className="contract-meta" style={{ marginTop: 10, fontSize: 14 }}>
          <span>
            <strong>Monto:</strong> {fmtUSDfull(v.monto_usd)}
          </span>
          <span>
            <strong>Ministerio:</strong> {v.ministerio}
          </span>
          <span>
            <strong>Proveedor:</strong> {v.proveedor}
          </span>
          <span>
            <strong>Registrado:</strong> {v.fecha_registro}
          </span>
        </div>
        <div className="bc-hash" style={{ marginTop: 12, color: "var(--paper-mute)", background: "var(--ink)" }}>
          {v.hash}
        </div>
      </div>

      <div className="section-head">Cómo funciona para el ciudadano</div>
      <div className="card-box">
        <div className="verify-steps">
          {STEPS.map((s, i) => (
            <div className="verify-step" key={i}>
              <div className="verify-step-num" />
              <div className="verify-step-text">
                <strong>{s.strong}</strong>
                {s.rest}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
