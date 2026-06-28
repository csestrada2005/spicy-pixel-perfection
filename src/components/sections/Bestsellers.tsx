import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ASSETS } from "@/config/assets";
import { PRODUCTS } from "@/config/products";
import { ProductCard } from "@/components/ProductCard";

export function Bestsellers() {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = PRODUCTS.filter((p) =>
    ["mango-pasion", "fresh-tangerine", "pink-lemonade"].includes(p.id),
  );

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

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
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Anterior"
            className="absolute -left-2 top-1/2 z-10 hidden -translate-y-1/2 text-[var(--neon-cyan)] md:block"
            style={{
              filter:
                "drop-shadow(0 0 4px var(--neon-cyan)) drop-shadow(0 0 10px var(--neon-cyan)) drop-shadow(0 0 18px var(--neon-cyan))",
            }}
          >
            <ArrowLeft className="h-16 w-16" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Siguiente"
            className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-[var(--neon-cyan)] md:block"
            style={{
              filter:
                "drop-shadow(0 0 4px var(--neon-cyan)) drop-shadow(0 0 10px var(--neon-cyan)) drop-shadow(0 0 18px var(--neon-cyan))",
            }}
          >
            <ArrowRight className="h-16 w-16" strokeWidth={2.5} />
          </button>

          <div
            ref={trackRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto px-1 pb-10 md:grid md:grid-cols-3 md:overflow-visible md:pb-12"
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
