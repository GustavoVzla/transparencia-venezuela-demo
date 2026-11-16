import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // En Vercel, Next se sirve nativamente: todas nuestras rutas son estáticas (SSG),
  // así que se prerenderizan en el build sin necesidad de `output: "export"`
  // (export genera out/ que el adaptador de Vercel no sirve por defecto → 404).
  // Las rutas con query (?id, ?m) se resuelven en cliente con useSearchParams.
  images: { unoptimized: true },
  // Este proyecto es la raíz del workspace (evita confusión por lockfiles externos).
  turbopack: { root: __dirname },
};

export default nextConfig;
