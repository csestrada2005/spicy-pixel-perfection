import { Link } from "@tanstack/react-router";
import { ASSETS } from "@/config/assets";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { useShopifyProducts } from "@/lib/shopify-catalog";

// Handles destacados del hero (ajústalos si el sufijo del handle cambia en Shopify).
const HERO_HANDLE_SUFFIXES = [
  "mixed-berries",
  "cherry-lemon",
  "pina-colada",
  "fresh-lemon",
  "strawmelon",
];

export function Hero() {
  const { data: products, isLoading } = useShopifyProducts();
  const list = products ?? [];
  const heroPicks = HERO_HANDLE_SUFFIXES.map((suffix) =>
    list.find((p) => p.handle.includes(suffix)),
  ).filter(Boolean).slice(0, 5) as NonNullable<(typeof list)[number]>[];

  return (
    <section id="sabores" className="relative min-h-screen w-full overflow-hidden bg-negro">
      <HeroBackdrop />

      <span
        className="font-display neon-text-magenta animate-flicker pointer-events-none absolute left-1/2 top-[58%] z-0 hidden -translate-x-1/2 text-3xl tracking-[0.25em] md:block lg:text-4xl"
        style={{ writingMode: "vertical-rl", transform: "translateX(-50%) rotate(180deg)" }}
        aria-hidden
      >
        TU NUEVA ADICCIÓN
      </span>

      <img
        src={ASSETS.heroHandBag}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-[-60px] top-[38%] hidden w-[518px] rotate-[-12deg] md:block lg:top-[36%] lg:w-[634px]"
      />

      <img
        src={ASSETS.orgulloText}
        alt="Orgullosamente mexicanos creamos los dulces enchilados más intensos y adictivos"
        aria-hidden
        className="pointer-events-none absolute left-2 top-[62%] z-[6] hidden w-[331px] -rotate-3 md:block lg:left-4 lg:top-[60%] lg:w-[387px]"
      />

      <img
        src={ASSETS.guyEating}
        alt=""
        aria-hidden
        className="animate-yell pointer-events-none absolute bottom-[-40px] left-[8%] z-10 hidden w-[560px] max-w-none md:block lg:left-[10%] lg:w-[640px]"
      />

      <div
        aria-hidden
        className="animate-heat pointer-events-none absolute bottom-10 left-[14%] z-[9] hidden h-72 w-72 rounded-full md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(255,46,46,0.5), rgba(255,138,30,0.25) 40%, transparent 70%)",
          animationDelay: "0.8s",
        }}
      />

      <span
        className="font-display neon-text-rojo animate-flicker pointer-events-none absolute bottom-40 left-2 z-20 text-2xl leading-none md:bottom-32 md:left-6 md:text-4xl lg:bottom-40 lg:text-5xl"
        style={{ transform: "rotate(-20deg)" }}
        aria-hidden
      >
        UNA BOMBA<br />PICANTE!!!
      </span>

      {/* Mobile-only neon "TU NUEVA ADICCIÓN" on the right */}
      <span
        className="font-display neon-text-magenta animate-flicker pointer-events-none absolute bottom-40 right-2 z-20 text-xl leading-none md:hidden"
        style={{ transform: "rotate(12deg)" }}
        aria-hidden
      >
        TU NUEVA<br />ADICCIÓN
      </span>


      <div className="relative z-[15] mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 pt-24 pb-16 md:grid-cols-2 md:gap-10 md:px-8 md:pt-36 md:pb-4">
        <div className="relative flex flex-col items-center gap-6 text-center md:items-start md:gap-8 md:text-left">
          <img
            src={ASSETS.logoNeon}
            alt="S-π-C Spicy"
            className="animate-power-on animate-flicker relative z-10 w-[240px] max-w-full drop-shadow-[0_0_18px_rgba(255,46,46,0.5)] sm:w-[280px] md:w-[460px]"
          />

          <Link
            to="/productos"
            className="group font-display animate-cta-pulse rounded-full bg-amarillo px-8 py-3 text-base tracking-[0.2em] text-negro transition-transform hover:scale-105 sm:px-10 sm:text-lg"
          >
            <span className="inline-block group-hover:animate-shake">ORDENAR AHORA</span>
          </Link>

          {/* Mobile stack */}
          <div className="grid w-full grid-cols-2 gap-4 md:hidden">
            {isLoading &&
              Array.from({ length: 2 }).map((_, i) => (
                <ProductCardSkeleton key={i} compact />
              ))}
            {!isLoading &&
              heroPicks.slice(0, 4).map((p, i) => (
                <div key={p.id} className="flex justify-center">
                  <ProductCard product={p} compact index={i} />
                </div>
              ))}
          </div>

          <img
            src={ASSETS.orgulloText}
            alt=""
            className="mx-auto w-[240px] -rotate-3 md:hidden"
          />
        </div>

        {/* Desktop staggered zigzag */}
        <div className="relative hidden md:block">
          <div className="animate-fade-in flex flex-col items-center" style={{ animationDelay: "0.4s" }}>
            {isLoading &&
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className={`relative w-[200px] ${i === 0 ? "mt-0" : "mt-16"}`}>
                  <ProductCardSkeleton compact />
                </div>
              ))}
            {!isLoading &&
              heroPicks.map((p, i) => {
                const xOffset =
                  i === 4 ? "-translate-x-20" : i % 2 === 0 ? "-translate-x-12" : "translate-x-12";
                const yGap = i === 0 ? "mt-0" : "mt-16";
                return (
                  <div key={p.id} className={`relative w-[200px] ${xOffset} ${yGap}`}>
                    <ProductCard product={p} compact index={i} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
