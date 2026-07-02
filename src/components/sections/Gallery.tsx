import { useState } from "react";
import { Reveal } from "@/components/Reveal";

export type GalleryItem = {
  src: string;
  alt?: string;
};

// Colores de marca para el fallback cuando la imagen aún no existe.
const FALLBACKS = ["#E11414", "#FFD400", "#5BE9F2", "#FACC15", "#b026ff"];

function GalleryTile({ item, index }: { item: GalleryItem; index: number }) {
  const [failed, setFailed] = useState(false);
  const fallback = FALLBACKS[index % FALLBACKS.length];

  return (
    <div
      className="relative aspect-square overflow-hidden rounded-2xl shadow-[6px_6px_0px_#CA8A04]"
      style={{ backgroundColor: fallback }}
    >
      {!failed ? (
        <img
          src={item.src}
          alt={item.alt ?? `Galería S-π-C ${index + 1}`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      ) : (
        // Fallback de color on-brand con etiqueta discreta.
        <div className="flex h-full w-full items-center justify-center">
          <span className="font-display text-4xl tracking-widest text-white/70">S-π-C</span>
        </div>
      )}
    </div>
  );
}

// Grid responsivo reutilizable: 2 col en móvil, 3-4 en desktop.
export function Gallery({ items }: { items: GalleryItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
      {items.map((item, i) => (
        <Reveal key={item.src} delay={i * 60}>
          <GalleryTile item={item} index={i} />
        </Reveal>
      ))}
    </div>
  );
}
