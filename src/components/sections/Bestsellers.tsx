import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
      className="relative bg-rojo py-16"
      style={{
        backgroundImage: `url(${ASSETS.chilePatternBg})`,
        backgroundRepeat: "repeat",
        backgroundSize: "400px auto",
      }}
    >
      <div className="mx-auto max-w-[1280px] px-4">
        <h2 className="font-display text-center text-4xl tracking-wider text-negro sm:text-6xl">
          CONOCE NUESTROS BESTSELLERS
        </h2>

        <div className="relative mt-10">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Anterior"
            className="absolute -left-2 top-1/2 z-10 hidden -translate-y-1/2 bg-negro p-2 text-amarillo md:block"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Siguiente"
            className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 bg-negro p-2 text-amarillo md:block"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            ref={trackRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pb-4 md:grid md:grid-cols-3 md:overflow-visible"
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
