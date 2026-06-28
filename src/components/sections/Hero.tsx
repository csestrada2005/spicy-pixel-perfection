import { ASSETS } from "@/config/assets";
import { PRODUCTS } from "@/config/products";
import { ProductCard } from "@/components/ProductCard";

export function Hero() {
  const heroPicks = PRODUCTS.slice(0, 4); // Fresh Lemon, Piña Colada, Cherry Lemon, Straw Melon

  return (
    <section
      id="sabores"
      className="relative min-h-screen w-full overflow-hidden bg-negro pb-[460px] md:pb-[520px]"
    >
      {/* ===== ABSOLUTE ACCENT LAYER ===== */}

      {/* Fruit explosion behind logo */}
      <img
        src={ASSETS.heroFruit}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-[10%] top-[2%] w-[120%] max-w-none opacity-90 md:left-[-8%] md:top-[4%] md:w-[70%]"
      />

      {/* Vertical neon "TU NUEVA ADICCIÓN" */}
      <span
        className="font-display neon-text-magenta pointer-events-none absolute left-1/2 top-[58%] hidden -translate-x-1/2 text-3xl tracking-[0.25em] md:block lg:text-4xl"
        style={{ writingMode: "vertical-rl", transform: "translateX(-50%) rotate(180deg)" }}
        aria-hidden
      >
        TU NUEVA ADICCIÓN
      </span>

      {/* Chica echando gomitas — top-left, arm coming from outside */}
      <img
        src={ASSETS.heroHandBag}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-[-60px] top-[48%] hidden w-[360px] rotate-[-12deg] md:block lg:w-[440px]"
      />

      {/* Orgullosamente mexicanos — note image, below chica on left */}
      <img
        src={ASSETS.orgulloText}
        alt="Orgullosamente mexicanos creamos los dulces enchilados más intensos y adictivos"
        aria-hidden
        className="pointer-events-none absolute bottom-[180px] left-4 hidden w-[260px] -rotate-3 md:block lg:bottom-[200px] lg:left-8 lg:w-[300px]"
      />

      {/* Boca abierta — bottom full-width, guy yelling */}
      <img
        src={ASSETS.guyEating}
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/4 w-[360px] max-w-none md:left-[28%] md:w-[520px] lg:w-[620px]"
      />

      {/* UNA BOMBA PICANTE — bottom-left, rotated, next to boca */}
      <span
        className="font-display neon-text-rojo pointer-events-none absolute bottom-10 left-2 z-20 text-2xl leading-none md:bottom-16 md:left-6 md:text-4xl lg:text-5xl"
        style={{ transform: "rotate(-20deg)" }}
        aria-hidden
      >
        UNA BOMBA<br />PICANTE!!!
      </span>

      {/* ===== MAIN GRID ===== */}
      <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 pt-10 md:grid-cols-2 md:gap-10 md:px-8 md:pt-16">
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

          {/* Mobile-only stack: products + chica + orgullo + bomba/boca */}
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

        {/* RIGHT COLUMN — desktop product chaos grid */}
        <div className="relative hidden md:block">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 pt-6 lg:gap-x-10">
            {heroPicks.map((p, i) => {
              const offsets = ["mt-0", "mt-16", "-mt-4", "mt-12"];
              return (
                <div
                  key={p.id}
                  className={`flex justify-center ${offsets[i]}`}
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
