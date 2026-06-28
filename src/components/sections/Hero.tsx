import { ASSETS } from "@/config/assets";
import { PRODUCTS } from "@/config/products";
import { ProductCard } from "@/components/ProductCard";

export function Hero() {
  const heroPicks = PRODUCTS.slice(0, 4); // Fresh Lemon, Piña Colada, Cherry Lemon, Straw Melon

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
        className="pointer-events-none absolute -left-[10%] top-[2%] w-[120%] max-w-none opacity-90 md:left-[-8%] md:top-[4%] md:w-[70%]"
      />

      {/* Vertical neon "TU NUEVA ADICCIÓN" */}
      <span
        className="font-display neon-text-magenta pointer-events-none absolute right-2 top-24 hidden text-3xl tracking-[0.25em] md:block lg:right-6 lg:text-4xl"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        aria-hidden
      >
        TU NUEVA ADICCIÓN
      </span>

      {/* Hand bag coming from the side */}
      <img
        src={ASSETS.heroHandBag}
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-[-30px] top-[55%] hidden w-[180px] rotate-[12deg] md:block lg:w-[230px]"
      />

      {/* ===== MAIN GRID ===== */}
      <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 pb-32 pt-10 md:grid-cols-2 md:gap-10 md:px-8 md:pt-16">
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

          {/* Mobile-only: products inserted here, between CTA and neon frame */}
          <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:hidden">
            {heroPicks.map((p) => (
              <div key={p.id} className="flex justify-center">
                <ProductCard product={p} />
              </div>
            ))}
          </div>

          {/* Neon framed about block */}
          <div className="neon-border-cyan relative mt-2 max-w-md rounded-xl bg-negro/70 p-5 text-sm leading-relaxed text-white md:mt-4 md:text-base">
            Orgullosamente mexicanos 🌶️🇲🇽 creamos los dulces enchilados más
            intensos y adictivos. Cada bocado está cargado de chile, chamoy y
            sabor auténtico.
          </div>

          {/* Bomba picante + guy eating */}
          <div className="relative mt-6 flex items-end gap-2 md:mt-10">
            <span
              className="font-display neon-text-rojo text-2xl leading-none md:text-4xl"
              style={{ transform: "rotate(-15deg)" }}
            >
              UNA BOMBA<br />PICANTE!!!
            </span>
            <img
              src={ASSETS.guyEating}
              alt=""
              aria-hidden
              className="h-28 w-auto md:h-40"
            />
          </div>
        </div>

        {/* RIGHT COLUMN — desktop product chaos grid */}
        <div className="relative hidden md:block">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 pt-6 lg:gap-x-10">
            {heroPicks.map((p, i) => {
              // alternating vertical offset to break the grid
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
