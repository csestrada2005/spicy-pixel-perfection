import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useInView } from "@/hooks/use-in-view";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { ChileBackground } from "@/components/ChileBackground";
import { useShopifyProducts } from "@/lib/shopify-catalog";


// Handles destacados como bestsellers (ajusta desde Shopify si cambian).
const BESTSELLER_HANDLES = [
  "s-p-c-mixed-berries-gummies-duo",
  "s-p-c-cherry-lemon-gummies-duo",
  "s-p-c-pina-colada-gummies-duo",
];

export function Bestsellers() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { ref: titleRef, inView: titleIn } = useInView();
  const { data: products, isLoading } = useShopifyProducts();

  // Buscar por sufijo del handle para tolerar prefijos distintos.
  const items = (products ?? []).filter((p) =>
    BESTSELLER_HANDLES.some((h) => p.handle.endsWith(h.split("-").slice(-4).join("-"))),
  ).slice(0, 3);

  // Fallback: primeros 3 si no hay match
  const shown = items.length > 0 ? items : (products ?? []).slice(0, 3);

  return (
    <section id="galeria" className="relative overflow-hidden pt-16 pb-4 bg-[#E11414]">
      <ChileBackground opacity={1} />
      <div className="relative z-10 mx-auto max-w-[1280px] px-4">
        <h2
          ref={titleRef}
          className={`font-display text-center text-4xl tracking-wider text-white sm:text-6xl ${
            titleIn ? "animate-stamp" : "opacity-0"
          }`}
          style={{
            textShadow: "4px 4px 0 #FFD400, 5px 5px 0 #FFD400, 6px 6px 0 #FFD400",
          }}
        >
          CONOCE NUESTROS BESTSELLERS
        </h2>
      </div>

      <div className="relative mt-16 md:mt-24">
        <div
          aria-hidden
          className="animate-glow-pulse pointer-events-none absolute inset-x-0 top-1/2 z-0 hidden -translate-y-1/2 md:block"
          style={{
            filter:
              "drop-shadow(0 0 6px var(--neon-cyan)) drop-shadow(0 0 14px var(--neon-cyan)) drop-shadow(0 0 28px var(--neon-cyan))",
          }}
        >
          <svg viewBox="0 0 1000 60" preserveAspectRatio="none" className="h-16 w-full">
            <g
              fill="none"
              stroke="var(--neon-cyan)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="40" y1="30" x2="960" y2="30" strokeDasharray="16 12" className="animate-dash" />
              <polyline points="70,5 30,30 70,55" />
              <polyline points="930,5 970,30 930,55" />
            </g>
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-4">
          <div
            ref={trackRef}
            className="no-scrollbar grid grid-cols-1 gap-6 pb-8 sm:grid-cols-2 md:grid-cols-3 md:gap-8 md:pb-12"
          >
            {isLoading &&
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="mx-auto w-full max-w-[300px]">
                  <ProductCardSkeleton />
                </div>
              ))}
            {!isLoading &&
              shown.map((p, i) => (
                <Reveal key={p.id} delay={i * 120} className="mx-auto w-full max-w-[300px]">
                  <ProductCard product={p} index={i} />
                </Reveal>
              ))}
          </div>

          <div className="mt-8 flex justify-center md:mt-12">
            <Link
              to="/productos"
              className="font-display inline-flex items-center justify-center rounded-full bg-amarillo px-8 py-3 text-sm tracking-[0.2em] text-negro transition-transform duration-150 hover:-translate-y-0.5 hover:scale-105 sm:text-base"
            >
              VER TODOS LOS SABORES
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}
