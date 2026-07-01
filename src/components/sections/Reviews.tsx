import { Reveal } from "@/components/Reveal";
import igCitrus from "@/assets/ig-citrus-v2.png.asset.json";

const QUOTES = [
  {
    text: "TIENEN ESE SABOR AUTÉNTICO A GOMITA ENCHILADA QUE BUSCABA, COMPRA OBLIGADA PARA CUALQUIER AMANTE DEL CHILE.",
    border: "neon-border-magenta",
    color: "var(--neon-magenta)",
  },
  {
    text: "EXCELENTES INGREDIENTES, DULZURA PERFECTA Y SIN CULPA. ¡MI FAVORITO!",
    border: "neon-border-cyan",
    color: "var(--neon-cyan)",
  },
  {
    text: "HABÍA LEÍDO BUENAS OPINIONES, PERO LOGRARON SORPRENDERME. SABOR DELICIOSO, GRAN TEXTURA Y YA ORDENÉ MÁS.",
    border: "neon-border-amarillo",
    color: "var(--neon-amarillo)",
  },
] as const;

const IG_POSTS = [igCitrus.url, igCitrus.url, igCitrus.url] as const;

export function Reviews() {
  return (
    <section id="reviews" className="bg-negro py-16">
      <div className="mx-auto max-w-[1280px] px-4">
        <h2 className="font-display neon-text-amarillo animate-flicker text-center text-3xl tracking-wider sm:text-5xl">
          LO QUE DICEN EN REDES !
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {IG_POSTS.map((src, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="aspect-[3/4] w-full overflow-hidden rounded-[28px] bg-white shadow-lg">
                <img
                  src={src}
                  alt={`Post de Instagram ${i + 1}`}
                  className="h-full w-full object-cover scale-125"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-14 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal key={i} delay={i * 150} className="flex justify-center">
              <div className={`${q.border} relative rounded-2xl bg-negro px-8 py-8 text-sm font-semibold uppercase tracking-wide text-white`}>
                <span
                  aria-hidden
                  className="font-display absolute -left-2 -top-10 text-7xl leading-none"
                  style={{
                    color: "#fff",
                    textShadow: `0 0 4px ${q.color}, 0 0 10px ${q.color}, 0 0 22px ${q.color}`,
                  }}
                >
                  “
                </span>
                <p className="text-center">{q.text}</p>
                <span
                  aria-hidden
                  className="font-display absolute -right-2 -bottom-14 text-7xl leading-none"
                  style={{
                    color: "#fff",
                    textShadow: `0 0 4px ${q.color}, 0 0 10px ${q.color}, 0 0 22px ${q.color}`,
                  }}
                >
                  ”
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
