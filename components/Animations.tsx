"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

// Porta animations.js (demo vanilla) a un efecto que corre tras cada navegación.
// Respeta prefers-reduced-motion vía gsap.matchMedia().
export default function Animations() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

    // Contexto GSAP: aísla y limpia todo (tweens + ScrollTriggers) al cambiar de ruta.
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1) HEADER + NAV
        gsap.from(".demo-banner", { yPercent: -100, duration: 0.5, ease: "power2.out" });
        gsap.from(".app-header", { y: -16, opacity: 0, duration: 0.6, ease: "power2.out", delay: 0.05 });
        gsap.from(".nav-tab", { y: -10, opacity: 0, duration: 0.4, stagger: 0.06, ease: "power2.out", delay: 0.2 });

        // 2) TÍTULO: SplitText por palabras tras cargar fuentes.
        //    SIN `mask` — la máscara recorta las colas de los descendentes (j, g, p, y);
        //    el reveal se logra con desplazamiento + opacidad, sin overflow hidden.
        const titleEl = document.querySelector(".page-title");
        if (titleEl) {
          const animTitle = () => {
            const split = SplitText.create(titleEl as HTMLElement, { type: "words" });
            gsap.from(split.words, {
              y: 28,
              autoAlpha: 0,
              duration: 0.7,
              stagger: 0.06,
              ease: "power3.out",
            });
          };
          if (document.fonts && document.fonts.ready) document.fonts.ready.then(animTitle);
          else animTitle();
        }

        // 3) Subtítulo
        if (document.querySelector(".page-sub")) {
          gsap.from(".page-sub", { opacity: 0, y: 14, duration: 0.6, ease: "power2.out", delay: 0.4 });
        }

        // 4) KPIs en cascada + contador numérico
        const kpis = gsap.utils.toArray<HTMLElement>(".kpi");
        if (kpis.length) {
          gsap.from(kpis, { opacity: 0, y: 22, duration: 0.55, stagger: 0.09, ease: "back.out(1.4)", delay: 0.45 });
          kpis.forEach((kpi, i) => {
            const valEl = kpi.querySelector<HTMLElement>(".kpi-value");
            if (!valEl) return;
            const raw = (valEl.textContent || "").trim();
            const m = raw.match(/^([^\d]*)([\d.,]+)(.*)$/);
            if (!m) return;
            const prefix = m[1];
            const suffix = m[3];
            const target = parseFloat(m[2].replace(/,/g, ""));
            if (isNaN(target)) return;
            const decimals = (m[2].split(".")[1] || "").length;
            const obj = { v: 0 };
            gsap.to(obj, {
              v: target,
              duration: 1.4,
              delay: 0.6 + i * 0.09,
              ease: "power2.out",
              onUpdate() {
                const n = decimals ? obj.v.toFixed(decimals) : Math.round(obj.v).toLocaleString("es");
                valEl.textContent = prefix + n + suffix;
              },
            });
          });
        }

        // 5) MINISTERIOS y CONTRATOS: reveal en scroll
        ScrollTrigger.batch(".ministry, .contract-card", {
          start: "top 92%",
          onEnter: (els) =>
            gsap.from(els, { opacity: 0, y: 28, duration: 0.6, stagger: 0.08, ease: "power3.out", overwrite: true }),
        });

        // 6) HASH BLOCKCHAIN: efecto "descifrando"
        const hashEl = document.querySelector<HTMLElement>(".bc-hash");
        if (hashEl && (hashEl.textContent || "").trim()) {
          const finalHash = (hashEl.textContent || "").trim();
          ScrollTrigger.create({
            trigger: hashEl,
            start: "top 92%",
            once: true,
            onEnter: () => {
              gsap.to(hashEl, {
                duration: 1.6,
                scrambleText: { text: finalHash, chars: "0123456789abcdef", speed: 0.5 },
                ease: "none",
              });
            },
          });
        }

        // 7) La barra de score IA se anima en su propio componente (transición CSS).

        // 8) Bloques sueltos
        ScrollTrigger.batch(".section-head, .card-box, .blockchain-box, .ia-box, .reco-box, .verify-hero", {
          start: "top 92%",
          onEnter: (els) =>
            gsap.from(els, { opacity: 0, y: 24, duration: 0.6, stagger: 0.08, ease: "power2.out", overwrite: true }),
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".kpi, .ministry, .contract-card, .page-title, .page-sub", { clearProps: "all", opacity: 1 });
      });

      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
    });

    return () => ctx.revert();
  }, [pathname]);

  return null;
}
