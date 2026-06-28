import { ShoppingCart } from "lucide-react";
import type { Product } from "@/config/products";
import chiliRedAsset from "@/assets/chili-red.png.asset.json";
import chiliEmptyAsset from "@/assets/chili-empty.png.asset.json";

function SpicyMeter({ level }: { level: number }) {
  const total = 5;
  return (
    <div className="flex items-center justify-center gap-1.5" aria-label={`Picante ${level} de ${total}`}>
      {Array.from({ length: total }).map((_, i) => {
        const active = i < level;
        return (
          <img
            key={i}
            src={active ? chiliRedAsset.url : chiliEmptyAsset.url}
            alt={active ? "Chile picante" : "Chile sin picante"}
            className="h-7 w-auto"
            loading="lazy"
          />
        );
      })}
    </div>
  );
}

export function ProductCard({ product, compact }: { product: Product; compact?: boolean }) {
  const href = product.shopifyUrl || "#tienda";
  return (
    <div className={`relative w-full rounded-2xl bg-amarillo-suave text-negro shadow-[6px_6px_0px_#CA8A04] ${compact ? "max-w-[224px] p-3 pb-5" : "max-w-[340px] p-5 pb-8"}`}>
      <div className={`relative flex items-center justify-center overflow-visible ${compact ? "h-32" : "h-44"}`}>
        <img
          src={product.image}
          alt={product.flavor}
          className={`w-auto object-contain drop-shadow-md ${product.id === "fresh-lemon" ? "absolute left-1/2 top-[42%] h-[420px] -translate-x-1/2 -translate-y-1/2" : product.id === "mixed-berries" ? "absolute left-1/2 top-[36%] h-[420px] -translate-x-1/2 -translate-y-1/2" : product.id === "cherry-lemon" ? "absolute left-1/2 top-[22%] h-[378px] -translate-x-1/2 -translate-y-1/2" : compact ? "h-44" : "h-44"}`}
          loading="lazy"
        />
      </div>
      <h3 className="font-display mt-4 text-center text-2xl tracking-wide">{product.name}</h3>
      <div className="mt-3">
        <SpicyMeter level={product.spicyLevel} />
      </div>
      <p className="mt-3 text-center text-xl font-bold">{product.priceLabel}</p>

      <a
        href={href}
        target={product.shopifyUrl ? "_blank" : undefined}
        rel="noopener noreferrer"
        aria-label={`Añadir ${product.flavor} al carrito`}
        className="absolute left-1/2 -bottom-6 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-negro text-white shadow-[0_4px_0_0_rgba(0,0,0,0.4)] transition hover:scale-105"
      >
        <ShoppingCart className="h-5 w-5" />
      </a>
    </div>
  );
}
