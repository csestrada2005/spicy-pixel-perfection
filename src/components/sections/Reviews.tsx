import { Reveal } from "@/components/Reveal";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Music2 } from "lucide-react";
import igGoodSpices from "@/assets/ig-good-spices.png.asset.json";
import igRedGummies from "@/assets/ig-red-gummies.png.asset.json";
import igPinaColada from "@/assets/ig-pina-colada.png.asset.json";


const POSTS = [
  { img: igGoodSpices.url, song: "Anna Graceman, TLN · Lemonade", likes: 132 },
  { img: igRedGummies.url, song: "Sound Gallery by Dmitry Taras · Tropi…", likes: 213 },
  { img: igPinaColada.url, song: "Sunny Egg · Fresh", likes: 158 },
] as const;

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

function IgCard({ img, song, likes }: { img: string; song: string; likes: number }) {
  return (
    <a href="https://instagram.com/s.pi.c_spicy" target="_blank" rel="noopener noreferrer" className="block w-full overflow-hidden rounded-[28px] bg-white text-black shadow-lg transition-all duration-300 hover:-translate-y-2 hover:rotate-[-0.5deg] hover:shadow-[0_0_0_2px_var(--neon-cyan),0_0_24px_rgba(25,224,255,0.6),0_20px_40px_rgba(0,0,0,0.5)] cursor-pointer">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 overflow-hidden rounded-full ring-1 ring-black/10">
            <img src="/logo-square.png" alt="" className="h-full w-full object-cover" />
          </div>
          <div className="leading-tight">
            <p className="text-[13px] font-semibold">s.pi.c_spicy</p>
            <p className="flex items-center gap-1 text-[11px] text-neutral-600">
              <Music2 className="h-3 w-3" /> {song}
            </p>
          </div>
        </div>
        <MoreHorizontal className="h-5 w-5 text-neutral-700" />
      </div>

      {/* Image */}
      <div className="aspect-square w-full overflow-hidden bg-neutral-100">
        <img src={img} alt="" className="h-full w-full object-cover" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-3 text-neutral-800">
          <Heart className="h-6 w-6 fill-rojo text-rojo" />
          <MessageCircle className="h-6 w-6" />
          <Send className="h-6 w-6" />
        </div>
        <Bookmark className="h-6 w-6 text-neutral-800" />
      </div>
      <p className="px-3 pb-3 text-[12px] font-semibold">{likes.toLocaleString()} likes</p>
    </a>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="bg-negro py-16">
      <div className="mx-auto max-w-[1280px] px-4">
        <h2 className="font-display neon-text-amarillo animate-flicker text-center text-3xl tracking-wider sm:text-5xl">
          LO QUE DICEN EN REDES !
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {POSTS.map((p, i) => (
            <Reveal key={i} delay={i * 120}>
              <IgCard {...p} />
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
