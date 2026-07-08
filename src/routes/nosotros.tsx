import { createFileRoute, Link } from "@tanstack/react-router";
import { NavBar } from "@/components/sections/NavBar";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/Reveal";
import { ChileBackground } from "@/components/ChileBackground";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nuestra Historia · S-π-C" },
      {
        name: "description",
        content:
          "S-π-C nació en una cocina mexicana obsesionada con el balance perfecto entre lo dulce y el chile. Conoce nuestra historia.",
      },
    ],
  }),
  component: Nosotros,
});

const VALORES = [
  {
    title: "Chile de verdad",
    body: "Nada de sabores artificiales que no piquen. Si dice Spicy, pica.",
  },
  {
    title: "Hecho a mano",
    body: "Cada caja se enchila, se pesa y se sella en lotes pequeños.",
  },
  {
    title: "Recetas propias",
    body: "Mezcla de chiles secretos, punto exacto entre dulce, ácido y golpe.",
  },
  {
    title: "Sin miedo al picante",
    body: "Producto para gente que ya sabe lo que quiere. No hay versión suave.",
  },
];

function Nosotros() {
  return (
    <main className="min-h-screen bg-negro text-white">
      <NavBar />

      <section className="relative overflow-hidden bg-[#E11414] pt-28 pb-20 md:pt-32">
        <ChileBackground opacity={1} />
        <div className="relative z-10 mx-auto max-w-[900px] px-4 text-center">
          <h1
            className="animate-stamp font-display text-4xl tracking-wider text-white sm:text-6xl md:text-7xl"
            style={{
              textShadow: "4px 4px 0 #FFD400, 5px 5px 0 #FFD400, 6px 6px 0 #FFD400",
            }}
          >
            SPICED WITH LOVE
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base font-semibold leading-relaxed text-white/90 sm:text-lg">
            Somos una marca mexicana obsesionada con una sola cosa: el equilibrio perfecto entre
            lo dulce y el chile.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1000px] px-4 py-14 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <Reveal>
            <div className="rounded-2xl bg-amarillo-suave p-6 text-negro shadow-[6px_6px_0_#CA8A04]">
              <h3 className="font-display text-xl tracking-wide">ORIGEN</h3>
              <p className="mt-3 text-sm font-medium leading-relaxed text-negro/80">
                Empezamos en una cocina de casa, mezclando chiles molidos con dulces que
                comprábamos por kilo en el mercado. Los repartíamos entre amigos y familia,
                hasta que se acabaron pidiendo por bolsa. Ese fue el clic.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-2xl bg-amarillo-suave p-6 text-negro shadow-[6px_6px_0_#CA8A04]">
              <h3 className="font-display text-xl tracking-wide">PRODUCTO</h3>
              <p className="mt-3 text-sm font-medium leading-relaxed text-negro/80">
                Desarrollamos nuestra propia mezcla de chile en polvo — con ácido, sal y calor
                justo — y la aplicamos a gomitas premium de sabores atrevidos. Nada
                artificial en el picor: chile real, molido y mezclado en casa.
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="rounded-2xl bg-amarillo-suave p-6 text-negro shadow-[6px_6px_0_#CA8A04]">
              <h3 className="font-display text-xl tracking-wide">PROMESA</h3>
              <p className="mt-3 text-sm font-medium leading-relaxed text-negro/80">
                Cada caja Display se prepara en lotes pequeños. Sellamos el mismo día que se
                enchila para que llegue al cliente igual de intenso que salió de nuestra mesa.
                Si no pica, no lo mandamos.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {VALORES.map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <h4 className="font-display text-base tracking-wide text-amarillo">
                  {v.title.toUpperCase()}
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-white/80 sm:text-sm">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 text-center">
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
