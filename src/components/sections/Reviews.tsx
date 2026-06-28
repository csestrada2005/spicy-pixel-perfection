import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";
import { ASSETS } from "@/config/assets";
import igCitrus from "@/assets/ig-post-citrus.png.asset.json";
import igDuo from "@/assets/ig-post-duo.png.asset.json";
import igMango from "@/assets/ig-post-mango.png.asset.json";

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

const IG_POSTS = [igCitrus.url, igDuo.url, igMango.url] as const;

function IGPost({ src }: { src: string }) {
  return (
    <div className="overflow-hidden rounded-[28px] bg-white text-negro shadow-lg">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full border-2 border-[#FF8A00] bg-white p-[2px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
              <span className="font-display text-[11px] text-negro">S-π-C</span>
            </div>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">spic_mx</div>
            <div className="text-xs text-neutral-500">CDMX, MX</div>
          </div>
        </div>
        <MoreHorizontal className="h-5 w-5 text-neutral-500" />
      </div>

      <div className="aspect-square w-full bg-white p-3 pt-0">
        <div className="h-full w-full overflow-hidden rounded-[24px] bg-neutral-100">
          <img src={src} alt="Post de Instagram de Spicy" className="h-full w-full object-cover object-center" />
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-3 pt-1">
        <div className="flex items-center gap-3">
          <Heart className="h-6 w-6 fill-rojo text-rojo" />
          <MessageCircle className="h-6 w-6" />
          <Send className="h-6 w-6" />
        </div>
        <Bookmark className="h-6 w-6" />
      </div>
    </div>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="bg-negro py-16">
      <div className="mx-auto max-w-[1280px] px-4">
        <h2 className="font-display neon-text-amarillo text-center text-3xl tracking-wider sm:text-5xl">
          LO QUE DICEN EN REDES !
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {IG_POSTS.map((post, i) => (
            <IGPost key={i} src={post} />
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
