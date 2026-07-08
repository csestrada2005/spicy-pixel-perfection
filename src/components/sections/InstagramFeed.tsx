import { Instagram } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CONTACT } from "@/config/contact";

const PREVIEW_IMAGES = [
  "/gallery/WhatsApp Image 2026-06-14 at 18.39.56.jpeg",
  "/gallery/WhatsApp Image 2026-06-14 at 18.41.21.jpeg",
  "/gallery/WhatsApp Image 2026-06-14 at 18.41.54.jpeg",
  "/gallery/WhatsApp Image 2026-06-14 at 18.44.10.jpeg",
];

export function InstagramFeed() {
  return (
    <section className="relative overflow-hidden bg-negro py-16 md:py-24">
      <div className="relative z-10 mx-auto max-w-[1280px] px-4">
        <Reveal>
          <div className="text-center">
            <span className="inline-flex items-center justify-center rounded-full border-2 border-[#FFD400] bg-[#FFD400]/10 px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-widest text-[#FFD400]">
              @s.pi.c_spicy
            </span>
            <h2
              className="mt-4 font-display text-4xl tracking-wider text-white sm:text-5xl md:text-6xl"
              style={{
                textShadow: "4px 4px 0 #E11414, 5px 5px 0 #E11414, 6px 6px 0 #E11414",
              }}
            >
              PICANTE EN TU FEED
            </h2>
            <p className="mx-auto mt-4 max-w-md font-sans text-base font-medium text-white/80">
              Síguenos para ver cómo la comunidad disfruta el sabor enchilado.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {PREVIEW_IMAGES.map((src, i) => (
            <Reveal key={src} delay={i * 100}>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-2xl border-2 border-white/10 bg-white/5"
              >
                <img
                  src={src}
                  alt={`Instagram S-π-C ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Instagram className="h-8 w-8 text-white drop-shadow-lg md:h-10 md:w-10" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-10 flex justify-center">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#FFD400] px-6 py-3 font-sans text-sm font-black uppercase tracking-wider text-negro shadow-[4px_4px_0_#E11414] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#E11414]"
            >
              <Instagram className="h-5 w-5" />
              Síguenos en Instagram
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
