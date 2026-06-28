import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";
import { ASSETS } from "@/config/assets";

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

type IGPostData =
  | { kind: "text"; title: string }
  | { kind: "image"; src: string };

const IG_POSTS: IGPostData[] = [
  { kind: "text", title: "PICA CHIDO\nSABE RICO" },
  { kind: "text", title: "SWEET &\nCHILI MOOD" },
  { kind: "image", src: ASSETS.bags.freshTangerine },
];

function IGPost({ post }: { post: IGPostData }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white text-negro shadow-lg">
      {/* IG header */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-rojo via-amarillo to-rojo p-[2px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
              <span className="font-display text-[10px] text-negro">S-π-C</span>
            </div>
          </div>
          <div className="leading-tight">
            <div className="text-xs font-semibold">spic_mx</div>
            <div className="text-[10px] text-neutral-500">CDMX, MX</div>
          </div>
        </div>
        <MoreHorizontal className="h-4 w-4 text-neutral-500" />
      </div>

      {/* Square content */}
      <div className="relative aspect-square w-full bg-rojo">
        {post.kind === "text" ? (
          <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
            <h3 className="font-display text-3xl leading-tight tracking-wide text-white whitespace-pre-line sm:text-4xl">
              {post.title}
            </h3>
            <svg viewBox="0 0 120 20" className="mt-4 h-4 w-28 text-white" fill="none">
              <path d="M2 10 Q 17 0 32 10 T 62 10 T 92 10 T 118 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        ) : (
          <img src={post.src} alt="" className="h-full w-full object-contain p-4" />
        )}
      </div>

      {/* IG footer */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-3">
          <Heart className="h-5 w-5 fill-rojo text-rojo" />
          <MessageCircle className="h-5 w-5" />
          <Send className="h-5 w-5" />
        </div>
        <Bookmark className="h-5 w-5" />
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
            <IGPost key={i} post={post} />
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
