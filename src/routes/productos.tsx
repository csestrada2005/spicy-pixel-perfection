import { createFileRoute } from "@tanstack/react-router";
import { NavBar } from "@/components/sections/NavBar";
import { Footer } from "@/components/sections/Footer";
import { ASSETS } from "@/config/assets";
import { catalogByLine } from "@/config/catalog";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/productos")({
  head: () => ({
    meta: [
      { title: "Sabores · S-π-C" },
      { name: "description", content: "Todos nuestros sabores enchilados: 27 dulces en 4 líneas. Encuentra tu nivel de picante." },
    ],
  }),
  component: Productos,
});

function Productos() {
  const groups = catalogByLine();

  return (
    <main className="min-h-screen bg-negro text-white">
      <NavBar />

      <section className="relative overflow-hidden bg-[#E11414] pt-28 pb-24 md:pt-32">
        {/* Patrón de chiles negros en mosaico sobre fondo rojo (igual que Bestsellers) */}
        <div
          aria-hidden
          className="animate-bg-drift absolute inset-0 bg-repeat"
          style={{
            backgroundImage: `url(${ASSETS.chilePatternBlack})`,
            backgroundSize: "360px 480px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1280px] px-4">
          {/* Header de la página */}
          <header className="text-center">
            <h1
              className="animate-stamp font-display text-5xl tracking-wider text-white sm:text-7xl"
              style={{
                textShadow: "4px 4px 0 #FFD400, 5px 5px 0 #FFD400, 6px 6px 0 #FFD400",
              }}
            >
              NUESTROS SABORES
            </h1>
            <p className="mx-auto mt-5 max-w-xl font-sans text-base font-semibold text-white/90 sm:text-lg">
              27 sabores en 4 líneas. Del enchilado intenso al sin chile — elige tu nivel de picante.
            </p>
          </header>

          {/* Secciones por línea */}
          <div className="mt-16 space-y-20 md:mt-20">
            {groups.map(({ line, products }) => (
              <div key={line.id}>
                {/* Encabezado de la línea */}
                <div className="text-center">
                  <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                    <h2 className="font-display text-3xl tracking-wide text-white sm:text-5xl">
                      {line.name}
                    </h2>
                    {line.subtitle && (
                      <span
                        className="font-display rounded-full bg-amarillo-suave px-3 py-1 text-sm tracking-widest text-negro shadow-[3px_3px_0px_#CA8A04] sm:text-base"
                      >
                        {line.subtitle}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 font-sans text-sm font-bold uppercase tracking-[0.2em] text-white/80">
                    {line.netWeight}
                  </p>
                </div>

                {/* Grid responsivo de cards */}
                <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
                  {products.map((p, i) => (
                    <Reveal key={p.id} delay={i * 80} className="flex justify-center">
                      <ProductCard product={p} buyBelow uniformImage />
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
