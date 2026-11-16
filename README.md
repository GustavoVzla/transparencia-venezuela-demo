# Public Spending Transparency: Blockchain + AI Concept Demo

A technical concept demo of a public-procurement transparency system. It shows how a government contract could be anchored on a blockchain (only a SHA-256 hash is published, never the document), reviewed by an AI scoring step before funds move, and then verified by any citizen via QR code.

> **This is a conceptual prototype with simulated data.** No real blockchain is connected, no smart contract is deployed, and nothing here has been audited. Any institution, contract or amount shown is fictional and for illustration only.

## What the demo shows

- Contract lifecycle: creation, hash anchoring, AI risk score, multi-level digital signature, payment release
- Two-level PKI certification model and delegated signers per ministry
- Procurement selection modes with threshold bands
- Citizen verification flow: QR code, then the immutable record
- Architecture diagrams (layered system, PKI) generated as inline SVG
- Governance and precedents pages comparing the idea with existing real-world systems

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, GSAP for animation, `qrcode`. All data is static and lives in `lib/`.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

Built by Gustavo Tejera. MIT licensed.

---

**Resumen en espanol:** demo tecnica conceptual de un sistema de transparencia del gasto publico con blockchain (solo se ancla el hash del contrato) e IA que revisa el contrato antes del pago, con verificacion ciudadana por QR. Datos simulados; sin contratos desplegados ni auditoria.
