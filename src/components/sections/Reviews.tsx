import { ASSETS } from "@/config/assets";
import igReal1 from "@/assets/ig-real-1.png.asset.json";
import igReal2 from "@/assets/ig-real-2.png.asset.json";
import igReal3 from "@/assets/ig-real-3.png.asset.json";

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

const IG_POSTS = [igReal1.url, igReal2.url, igReal3.url];

export function Reviews() {
  return (
    <section id="reviews" className="bg-negro py-16">
      <div className="mx-auto max-w-[1280px] px-4">
        <h2 className="font-display neon-text-amarillo text-center text-3xl tracking-wider sm:text-5xl">
          LO QUE DICEN EN REDES !
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {IG_POSTS.map((src, i) => (
            <div key={i} className="aspect-[4/5] w-full overflow-hidden rounded-xl shadow-lg">
              <img
                src={src}
                alt={`Instagram post ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
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
