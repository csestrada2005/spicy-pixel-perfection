import { ASSETS } from "@/config/assets";
import igCitrus from "@/assets/ig-citrus-v2.png.asset.json";
import igMango from "@/assets/ig-mango-v2.png.asset.json";
import igDuo from "@/assets/ig-duo-v2.png.asset.json";

const QUOTES = [
  {
    text: "TIENEN ESE SABOR AUTÉNTICO A GOMITA ENCHILADA QUE BUSCABA, COMPRA OBLIGADA PARA CUALQUIER AMANTE DEL CHILE.",
    border: "neon-border-magenta",
  },
  {
    text: "EXCELENTES INGREDIENTES, DULZURA PERFECTA Y SIN CULPA. ¡MI FAVORITO!",
    border: "neon-border-cyan",
  },
  {
    text: "HABÍA LEÍDO BUENAS OPINIONES, PERO LOGRARON SORPRENDERME. SABOR DELICIOSO, GRAN TEXTURA Y YA ORDENÉ MÁS.",
    border: "neon-border-amarillo",
  },
] as const;

const IG_POSTS = [igCitrus.url, igMango.url, igDuo.url] as const;

export function Reviews() {
  return (
    <section id="reviews" className="bg-negro py-16">
      <div className="mx-auto max-w-[1280px] px-4">
        <h2 className="font-display neon-text-amarillo text-center text-3xl tracking-wider sm:text-5xl">
          LO QUE DICEN EN REDES !
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {IG_POSTS.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Post de Instagram ${i + 1}`}
              className="aspect-[3/4] w-full rounded-[28px] object-contain bg-white shadow-lg"
            />
          ))}
        </div>


        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className={`${q.border} relative rounded-2xl bg-negro p-5 text-sm font-semibold uppercase tracking-wide text-white`}>
                {q.text}
              </div>
              <img
                src={ASSETS.avatars[i]}
                alt=""
                className="mt-6 h-16 w-16 rounded-full object-cover ring-2 ring-neon-magenta"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
