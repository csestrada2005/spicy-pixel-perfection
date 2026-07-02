import { createFileRoute, Link } from "@tanstack/react-router";
import { NavBar } from "@/components/sections/NavBar";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/Reveal";
import { ASSETS } from "@/config/assets";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros · S-π-C" },
      {
        name: "description",
        content:
          "Nacimos en México para los que creen que lo dulce sabe mejor con un toque de chile. Conoce la historia de S-π-C.",
      },
    ],
  }),
  component: Nosotros,
});

// DRAFT — copy reemplazable tras la junta.
const VALORES = [
  {
    title: "Hecho en México",
    body: "Sabor mexicano de raíz, hecho a mano con orgullo.",
  },
  {
    title: "Dulce + Enchilado",
    body: "El punto exacto entre lo dulce y el golpe de chile.",
  },
  {
    title: "Ingredientes que sí reconoces",
    body: "Nada raro: fruta, chile y ganas de picar.",
  },
  {
    title: "Sabor sin miedo",
    body: "Hecho para quienes le suben al picante sin pedir permiso.",
  },
];

function Nosotros() {
  return (
    <main className="min-h-screen bg-negro text-white">
      <NavBar />

      {/* Hero corto sobre fondo rojo con patrón de chiles */}
      <section className="relative overflow-hidden bg-[#E11414] pt-28 pb-20 md:pt-32">
        <div
          aria-hidden
          className="animate-bg-drift absolute inset-0 bg-repeat opacity-90"
          style={{
            backgroundImage: `url(${ASSETS.chilePatternBlack})`,
            backgroundSize: "360px 480px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[900px] px-4 text-center">
          <h1
            className="animate-stamp font-display text-5xl tracking-wider text-white sm:text-7xl"
            style={{
              textShadow: "4px 4px 0 #FFD400, 5px 5px 0 #FFD400, 6px 6px 0 #FFD400",
            }}
          >
            SPICED WITH LOVE
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-base font-semibold leading-relaxed text-white/90 sm:text-lg">
            S-π-C nació en México para los que creen que lo dulce sabe mejor con un toque de chile.{" "}
            <span className="text-white/70">
              [Historia real pendiente: cómo/por qué nació, año].
            </span>
          </p>
        </div>
      </section>

      {/* Historia + valores */}
      <section className="mx-auto max-w-[1100px] px-4 py-16 md:py-20">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl tracking-wide text-amarillo sm:text-4xl">
              NUESTRA HISTORIA
            </h2>
            <p className="mt-5 font-sans text-base leading-relaxed text-white/80 sm:text-lg">
              Todo empezó con una idea simple: que el dulce no tiene por qué ser aburrido.{" "}
              <span className="text-white/60">
                [Placeholder: aquí va la historia real de la marca — el origen, el año y el porqué
                del chile].
              </span>
            </p>
          </div>
        </Reveal>

        {/* Valores */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALORES.map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <div className="h-full rounded-2xl bg-amarillo-suave p-6 text-negro shadow-[6px_6px_0px_#CA8A04]">
                <h3 className="font-display text-xl tracking-wide">{v.title}</h3>
                <p className="mt-2 text-sm font-medium text-negro/80">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Cierre + CTA */}
        <Reveal>
          <div className="mt-16 text-center">
            <p className="font-display text-2xl tracking-wide text-white sm:text-3xl">
              ¿List@ para picar?
            </p>
            <Link
              to="/productos"
              className="animate-cta-pulse mt-6 inline-block rounded-full bg-amarillo px-8 py-4 font-display text-lg tracking-widest text-negro shadow-[6px_6px_0px_#CA8A04] transition-transform duration-150 hover:-translate-y-0.5"
            >
              VER TODOS LOS SABORES
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
