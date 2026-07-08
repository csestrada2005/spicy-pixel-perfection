import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Instagram, X } from "lucide-react";
import { NavBar } from "@/components/sections/NavBar";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/Reveal";
import { ChileBackground } from "@/components/ChileBackground";
import { CONTACT } from "@/config/contact";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galería · S-π-C" },
      {
        name: "description",
        content: "Momentos S-π-C. Nuestros dulces enchilados en acción.",
      },
    ],
  }),
  component: Galeria,
});

const IMAGES = [
  "/gallery/WhatsApp Image 2026-06-14 at 18.39.56.jpeg",
  "/gallery/WhatsApp Image 2026-06-14 at 18.41.21.jpeg",
  "/gallery/WhatsApp Image 2026-06-14 at 18.41.54.jpeg",
  "/gallery/WhatsApp Image 2026-06-14 at 18.44.10.jpeg",
];

function Galeria() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-negro text-white">
      <NavBar />

      <section className="relative overflow-hidden bg-[#E11414] pt-28 pb-14 md:pt-32">
        <ChileBackground opacity={1} />
        <div className="relative z-10 mx-auto max-w-[900px] px-4 text-center">
          <h1
            className="animate-stamp font-display text-4xl tracking-wider text-white sm:text-6xl md:text-7xl"
            style={{
              textShadow: "4px 4px 0 #FFD400, 5px 5px 0 #FFD400, 6px 6px 0 #FFD400",
            }}
          >
            GALERÍA
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm font-semibold text-white/90 sm:text-base">
            Puro sabor enchilado en acción. Etiquétanos y sal en la galería.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {IMAGES.map((src, i) => (
            <Reveal key={src} delay={i * 90}>
              <button
                type="button"
                onClick={() => setLightbox(src)}
                className="group block w-full overflow-hidden rounded-2xl shadow-[6px_6px_0_#CA8A04] transition hover:-translate-y-1"
              >
                <img
                  src={src}
                  alt={`Galería S-π-C ${i + 1}`}
                  className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </button>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-amarillo px-8 py-4 font-display text-lg tracking-widest text-negro shadow-[6px_6px_0px_#CA8A04] transition-transform duration-150 hover:-translate-y-0.5"
          >
            <Instagram className="h-6 w-6" />
            SÍGUENOS EN INSTAGRAM
          </a>
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={lightbox}
            alt=""
            className="max-h-[90vh] max-w-full rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </main>
  );
}
