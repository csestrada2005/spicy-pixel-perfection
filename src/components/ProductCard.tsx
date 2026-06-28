import { Flame, ShoppingCart } from "lucide-react";
import type { Product } from "@/config/products";

function SpicyMeter({ level }: { level: number }) {
  const total = 5;
  return (
    <div className="flex items-center justify-center gap-1" aria-label={`Picante ${level} de ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <Flame
          key={i}
          className="h-5 w-5 text-negro"
          fill={i < level ? "currentColor" : "none"}
          strokeWidth={2}
        />
      ))}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const href = product.shopifyUrl || "#tienda";
  return (
    <div className="relative w-full max-w-[320px] bg-amarillo p-5 pb-7 text-negro shadow-[8px_8px_0_0_rgba(0,0,0,0.85)]">
      <div className="flex items-center justify-center pt-2">
        <img
          src={product.image}
          alt={product.flavor}
          className="h-44 w-auto object-contain drop-shadow-md"
          loading="lazy"
        />
      </div>
      <h3 className="font-display mt-4 text-center text-2xl tracking-wide">{product.name}</h3>
      <div className="mt-2">
        <SpicyMeter level={product.spicyLevel} />
      </div>
      <p className="mt-2 text-center text-xl font-bold">{product.priceLabel}</p>
      <a
        href={href}
        target={product.shopifyUrl ? "_blank" : undefined}
        rel="noopener noreferrer"
        aria-label={`Añadir ${product.flavor} al carrito`}
        className="mt-4 flex items-center justify-center gap-2 bg-negro px-4 py-3 text-sm font-bold uppercase tracking-widest text-amarillo transition hover:bg-negro/80"
      >
        <ShoppingCart className="h-4 w-4" />
        Añadir al carrito
      </a>
    </div>
  );
}
