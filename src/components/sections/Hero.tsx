import { ASSETS } from "@/config/assets";
import { PRODUCTS } from "@/config/products";
import { ProductCard } from "@/components/ProductCard";

export function Hero() {
  const heroPicks = PRODUCTS.slice(0, 5);

  return (
    <section id="sabores" className="relative min-h-screen overflow-hidden bg-negro">
      {/* fruit explosion bg */}
      <img
        src={ASSETS.heroFruit}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -top-10 left-0 w-[80%] max-w-[700px] opacity-90 md:w-[55%]"
      />

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 pt-10 pb-20 md:grid-cols-2 md:gap-6 md:pt-16">
        {/* LEFT */}
        <div className="relative z-10 flex flex-col items-start gap-6">
          <img
            src={ASSETS.logoNeon}
            alt="S-π-C Spicy"
            className="w-[280px] max-w-full md:w-[420px]"
          />

          <a
            href="#tienda"
            className="rounded-full bg-amarillo px-8 py-3 font-display text-lg tracking-widest text-negro shadow-[0_0_20px_rgba(244,197,24,0.6)] transition hover:scale-105"
          >
            ORDENAR AHORA
          </a>

          {/* Neon framed about block */}
          <div className="neon-border-cyan mt-4 max-w-md rounded-xl bg-negro/70 p-5 text-sm leading-relaxed text-white md:text-base">
            Orgullosamente mexicanos 🌶️🇲🇽 creamos los dulces enchilados más intensos y
            adictivos. Cada bocado está cargado de chile, chamoy y sabor auténtico.
          </div>

          {/* Hand bag image */}
          <img
            src={ASSETS.heroHandBag}
            alt="Mano vertiendo dulces"
            className="mt-2 w-[60%] max-w-[280px] md:absolute md:-right-4 md:top-[42%] md:w-[220px]"
          />

          {/* Guy eating + neon text */}
          <div className="relative mt-4 flex items-center gap-3">
            <span className="font-display neon-text-rojo -rotate-6 text-2xl md:text-3xl">
              UNA BOMBA PICANTE!!!
            </span>
            <img src={ASSETS.guyEating} alt="" className="h-24 w-auto md:h-32" />
          </div>
        </div>

        {/* RIGHT — product stack */}
        <div className="relative z-10">
          {/* Vertical neon accent */}
          <span
            className="font-display neon-text-magenta absolute -left-2 top-10 hidden text-2xl md:block"
            style={{ writingMode: "vertical-rl" }}
          >
            TU NUEVA ADICCIÓN
          </span>

          <div className="ml-0 grid grid-cols-1 gap-10 sm:grid-cols-2 md:ml-8">
            {heroPicks.map((p, i) => (
              <div key={p.id} className={i % 2 === 1 ? "sm:mt-12" : ""}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
