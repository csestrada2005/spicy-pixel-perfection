import { ASSETS } from "@/config/assets";
import { PRODUCTS } from "@/config/products";
import { ProductCard } from "@/components/ProductCard";

export function Hero() {
  const heroPicks = [
    PRODUCTS[0], // Fresh Lemon
    { ...PRODUCTS[1], name: "MIXED BERRIES" }, // Mixed Berries
    PRODUCTS[2], // Cherry Lemon
    PRODUCTS[3], // Straw Melon
    { ...PRODUCTS[1], id: "pina-colada-yellow", name: "PIÑA COLADA" }, // Piña Colada (amarilla)
  ];

  return (
    <section
      id="sabores"
      className="relative min-h-screen w-full overflow-hidden bg-negro"
    >
      {/* ===== ABSOLUTE ACCENT LAYER ===== */}

      {/* Fruit explosion behind logo */}
      <img
        src={ASSETS.heroFruit}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-[10%] top-[2%] z-0 w-[120%] max-w-none opacity-90 md:left-[-8%] md:top-[4%] md:w-[70%]"
      />

      {/* Vertical neon "TU NUEVA ADICCIÓN" */}
      <span
        className="font-display neon-text-magenta pointer-events-none absolute left-1/2 top-[58%] z-0 hidden -translate-x-1/2 text-3xl tracking-[0.25em] md:block lg:text-4xl"
        style={{ writingMode: "vertical-rl", transform: "translateX(-50%) rotate(180deg)" }}
        aria-hidden
      >
        TU NUEVA ADICCIÓN
      </span>

      {/* Chica echando gomitas — bigger, aligned to mouth */}
      <img
        src={ASSETS.heroHandBag}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-[8%] top-[18%] z-[5] hidden w-[460px] rotate-[-6deg] md:block lg:left-[12%] lg:w-[560px]"
      />

      {/* Orgullosamente mexicanos — note */}
      <img
        src={ASSETS.orgulloText}
        alt="Orgullosamente mexicanos creamos los dulces enchilados más intensos y adictivos"
        aria-hidden
        className="pointer-events-none absolute bottom-[240px] left-4 z-[5] hidden w-[260px] -rotate-3 md:block lg:bottom-[260px] lg:left-8 lg:w-[300px]"
      />

      {/* Boca abierta — bottom, horizontal, larger */}
      <img
        src={ASSETS.guyEating}
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-[8%] z-10 hidden w-[560px] max-w-none md:block lg:left-[10%] lg:w-[640px]"
      />

      {/* UNA BOMBA PICANTE — over guy */}
      <span
        className="font-display neon-text-rojo pointer-events-none absolute bottom-24 left-2 z-20 text-2xl leading-none md:bottom-32 md:left-6 md:text-4xl lg:bottom-40 lg:text-5xl"
        style={{ transform: "rotate(-20deg)" }}
        aria-hidden
      >
        UNA BOMBA<br />PICANTE!!!
      </span>

      {/* ===== MAIN GRID ===== */}
      <div className="relative z-[15] mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 pt-10 pb-24 md:grid-cols-2 md:gap-10 md:px-8 md:pt-16 md:pb-4">
        {/* LEFT COLUMN */}
        <div className="relative flex flex-col items-start gap-6 md:gap-8">
          <img
            src={ASSETS.logoNeon}
            alt="S-π-C Spicy"
            className="relative z-10 w-[280px] max-w-full drop-shadow-[0_0_18px_rgba(255,46,46,0.5)] md:w-[460px]"
          />

          <a
            href="#tienda"
            className="font-display rounded-full bg-amarillo px-10 py-3 text-lg tracking-[0.2em] text-negro shadow-[0_0_20px_rgba(244,197,24,0.7)] transition hover:scale-105"
          >
            ORDENAR AHORA
          </a>

          {/* Mobile-only stack */}
          <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:hidden">
            {heroPicks.map((p) => (
              <div key={p.id} className="flex justify-center">
                <ProductCard product={p} />
              </div>
            ))}
          </div>

          <img
            src={ASSETS.heroHandBag}
            alt=""
            aria-hidden
            className="mx-auto w-[260px] -rotate-6 md:hidden"
          />

          <img
            src={ASSETS.orgulloText}
            alt="Orgullosamente mexicanos creamos los dulces enchilados más intensos y adictivos"
            className="mx-auto w-[240px] -rotate-3 md:hidden"
          />
        </div>

        {/* RIGHT COLUMN — staggered zigzag (single column with alternating x offset) */}
        <div className="relative hidden md:block">
          <div className="flex flex-col items-center">
            {heroPicks.map((p, i) => {
              const xOffset = i % 2 === 0 ? "-translate-x-12" : "translate-x-12";
              const yGap = i === 0 ? "mt-0" : "mt-16";
              return (
                <div
                  key={p.id}
                  className={`relative w-[240px] ${xOffset} ${yGap}`}
                >
                  <ProductCard product={p} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
