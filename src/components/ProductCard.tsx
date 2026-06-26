import { Flame, ShoppingCart } from "lucide-react";
import type { Product } from "@/config/products";

function SpicyMeter({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i} className={i < level ? "text-rojo" : "opacity-30"} aria-hidden>
          🌶️
        </span>
      ))}
      <Flame className="ml-1 h-4 w-4 text-neon-naranja" />
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const href = product.shopifyUrl || "#tienda";
  return (
    <div className="relative w-full max-w-[260px] rounded-2xl bg-amarillo p-4 pb-5 text-negro shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-center pt-2">
        <img
          src={product.image}
          alt={product.flavor}
          className="h-40 w-auto object-contain drop-shadow-md"
          loading="lazy"
        />
      </div>
      <h3 className="font-display mt-3 text-center text-xl tracking-wide">{product.name}</h3>
      <div className="mt-2 flex justify-center">
        <SpicyMeter level={product.spicyLevel} />
      </div>
      <p className="mt-1 text-center text-lg font-bold">{product.priceLabel}</p>
      <a
        href={href}
        target={product.shopifyUrl ? "_blank" : undefined}
        rel="noopener noreferrer"
        aria-label={`Comprar ${product.flavor}`}
        className="absolute -bottom-4 left-1/2 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full bg-negro text-amarillo ring-2 ring-amarillo transition hover:scale-110"
      >
        <ShoppingCart className="h-5 w-5" />
      </a>
    </div>
  );
}
