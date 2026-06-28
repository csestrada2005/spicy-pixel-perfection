import { useRef } from "react";
import { ASSETS } from "@/config/assets";
import { PRODUCTS } from "@/config/products";
import { ProductCard } from "@/components/ProductCard";

export function Bestsellers() {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = PRODUCTS.filter((p) =>
    ["mango-pasion", "fresh-tangerine", "pink-lemonade"].includes(p.id),
  );

  return (
    <section
      id="galeria"
      className="relative py-16"
      style={{
        backgroundColor: "var(--rojo)",
        backgroundImage: `url(${ASSETS.chilePatternBg})`,
        backgroundRepeat: "repeat",
        backgroundSize: "320px 320px",
      }}
    >
      <div className="mx-auto max-w-[1280px] px-4">
        <h2
          className="font-display text-center text-4xl tracking-wider text-white sm:text-6xl"
          style={{
            textShadow:
              "4px 4px 0 #FFD400, 5px 5px 0 #FFD400, 6px 6px 0 #FFD400",
          }}
        >
          CONOCE NUESTROS BESTSELLERS
        </h2>

        <div className="relative mt-14">
          {/* Doble flecha neón cyan detrás de las cards, atraviesa de lado a lado */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-1/2 z-0 hidden -translate-y-1/2 px-2 md:block"
            style={{
              filter:
                "drop-shadow(0 0 6px var(--neon-cyan)) drop-shadow(0 0 14px var(--neon-cyan)) drop-shadow(0 0 28px var(--neon-cyan))",
            }}
          >
            <svg
              viewBox="0 0 1000 60"
              preserveAspectRatio="none"
              className="h-16 w-full"
            >
              <g
                fill="none"
                stroke="var(--neon-cyan)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="40" y1="30" x2="960" y2="30" />
                <polyline points="70,5 30,30 70,55" />
                <polyline points="930,5 970,30 930,55" />
              </g>
            </svg>
          </div>

          <div
            ref={trackRef}
            className="no-scrollbar relative z-10 flex snap-x snap-mandatory gap-8 overflow-x-auto px-1 pb-10 md:grid md:grid-cols-3 md:overflow-visible md:pb-12"
          >
            {items.map((p) => (
              <div
                key={p.id}
                className="min-w-[66%] shrink-0 snap-start md:min-w-0"
              >
                <div className="flex justify-center">
                  <ProductCard product={p} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
