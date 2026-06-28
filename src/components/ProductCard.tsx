import { Flame, ShoppingCart } from "lucide-react";
import type { Product } from "@/config/products";

function SpicyMeter({ level }: { level: number }) {
  const total = 5;
  return (
    <div className="flex items-center justify-center gap-1.5" aria-label={`Picante ${level} de ${total}`}>
      {Array.from({ length: total }).map((_, i) => {
        const active = i < level;
        return (
          <Flame
            key={i}
            className="h-6 w-6"
            color={active ? "#E11414" : "#ffffff"}
            fill={active ? "#E11414" : "#ffffff"}
            strokeWidth={2}
          />
        );
      })}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const href = product.shopifyUrl || "#tienda";
  return (
    <div className="relative w-full max-w-[320px] bg-amarillo p-5 pb-10 text-negro shadow-[8px_8px_0_0_rgba(0,0,0,0.85)]">
      <div className="flex items-center justify-center pt-2">
        <img
          src={product.image}
          alt={product.flavor}
          className="h-44 w-auto object-contain drop-shadow-md"
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
