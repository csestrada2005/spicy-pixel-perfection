import { createFileRoute } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { NavBar } from "@/components/sections/NavBar";
import { Footer } from "@/components/sections/Footer";
import { Gallery, type GalleryItem } from "@/components/sections/Gallery";
import { ChileBackground } from "@/components/ChileBackground";
import { CONTACT } from "@/config/contact";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galería · S-π-C" },
      {
        name: "description",
        content:
          "Momentos S-π-C: nuestros dulces enchilados en acción. Síguenos en Instagram para más.",
      },
    ],
  }),
  component: Galeria,
});

// Galería curada estática. Las imágenes aún no existen: se muestran con un
// fallback de color on-brand hasta subir los archivos a /public/assets/gallery/.
// NOTA: feed de IG en vivo = fase posterior.
const GALLERY_ITEMS: GalleryItem[] = Array.from({ length: 12 }, (_, i) => ({
  src: `/assets/gallery/ph-${i + 1}.png`,
  alt: `Galería S-π-C ${i + 1}`,
}));

function Galeria() {
  return (
    <main className="min-h-screen bg-negro text-white">
      <NavBar />

      <section className="relative overflow-hidden bg-[#E11414] pt-28 pb-16 md:pt-32">
        <ChileBackground />
        <div className="relative z-10 mx-auto max-w-[900px] px-4 text-center">
          <h1
            className="animate-stamp font-display text-5xl tracking-wider text-white sm:text-7xl"
            style={{
              textShadow: "4px 4px 0 #FFD400, 5px 5px 0 #FFD400, 6px 6px 0 #FFD400",
            }}
          >
            GALERÍA
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-sans text-base font-semibold text-white/90 sm:text-lg">
            Puro sabor enchilado en acción. Etiquétanos y sal en la galería.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-14 md:py-16">
        <Gallery items={GALLERY_ITEMS} />

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

      <Footer />
    </main>
  );
}
