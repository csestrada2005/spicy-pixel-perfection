
import { useInView } from "@/hooks/use-in-view";
import type { Product } from "@/config/products";
import chiliRedAsset from "@/assets/chili-red.png.asset.json";
import chiliEmptyAsset from "@/assets/chili-empty.png.asset.json";

function SpicyMeter({ level }: { level: number }) {
  const total = 5;
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className="flex items-center justify-center gap-1.5" aria-label={`Picante ${level} de ${total}`}>
      {Array.from({ length: total }).map((_, i) => {
        const active = i < level;
        return (
          <img
            key={i}
            src={active ? chiliRedAsset.url : chiliEmptyAsset.url}
            alt={active ? "Chile picante" : "Chile sin picante"}
            className={`h-7 w-auto ${active ? (inView ? "animate-chili-pop" : "opacity-0") : ""}`}
            style={active ? { animationDelay: `${i * 0.08}s` } : undefined}
            loading="lazy"
          />
        );
      })}
    </div>
  );
}

export function ProductCard({ product, compact, index, hideBuy, buyBelow, uniformImage }: { product: Product & { notSpicy?: boolean; netWeight?: string }; compact?: boolean; index?: number; hideBuy?: boolean; buyBelow?: boolean; uniformImage?: boolean }) {
  const href = product.shopifyUrl || "#tienda";
  // No-picantes (catálogo): 0 chiles en el medidor. PRODUCTS no trae notSpicy,
  // así que su comportamiento no cambia.
  const level = product.notSpicy ? 0 : product.spicyLevel;
  // El catálogo nuevo usa tamaño uniforme y evita el posicionamiento por-id
  // (algunos ids del catálogo coinciden con los viejos, p.ej. mixed-berries).
  const imgClass = uniformImage
    ? "h-44 w-auto object-contain drop-shadow-md"
    : `w-auto object-contain drop-shadow-md ${product.id === "fresh-lemon" ? "absolute left-1/2 top-[42%] h-[420px] -translate-x-1/2 -translate-y-1/2" : product.id === "pina-colada" || product.id === "pina-colada-yellow" ? "absolute left-1/2 top-[18%] h-[420px] -translate-x-1/2 -translate-y-1/2" : product.id === "mixed-berries" ? "absolute left-1/2 top-[36%] h-[420px] -translate-x-1/2 -translate-y-1/2" : product.id === "cherry-lemon" ? "absolute left-1/2 top-[22%] h-[300px] -translate-x-1/2 -translate-y-1/2" : product.id === "straw-melon" ? "absolute left-1/2 top-[24%] h-[340px] -translate-x-1/2 -translate-y-1/2" : product.id === "mango-pasion" ? "absolute left-1/2 top-[24%] h-[256px] -translate-x-1/2 -translate-y-1/2" : product.id === "fresh-tangerine" ? "absolute left-1/2 top-[24%] h-[256px] -translate-x-1/2 -translate-y-1/2" : product.id === "pink-lemonade" ? "absolute left-1/2 top-[24%] h-[256px] -translate-x-1/2 -translate-y-1/2" : compact ? "h-44" : "h-44"}`;
  return (
    <div className="relative w-full">
      <div className={`group hover:z-20 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1.5 hover:rotate-[-1deg] hover:shadow-[10px_10px_0px_#CA8A04,0_0_26px_rgba(225,20,20,0.35)] relative w-full rounded-2xl bg-amarillo-suave text-negro shadow-[6px_6px_0px_#CA8A04] ${compact ? "max-w-[224px] p-3 pb-5" : "max-w-[340px] p-5 pb-8"}`}>
        <div
          className={`animate-float relative flex items-center justify-center overflow-visible ${compact ? "h-32" : "h-44"}`}
          style={{ animationDelay: `${(index ?? 0) * 0.5}s` }}
        >
          <img
            src={product.image}
            alt={product.flavor}
            className={imgClass}
            loading="lazy"
            decoding="async"
          />
        </div>
        <h3 className="font-display mt-4 text-center text-2xl tracking-wide">{product.name}</h3>
        {product.netWeight && (
          <p className="mt-0.5 text-center text-xs font-semibold uppercase tracking-widest text-negro/60">{product.netWeight}</p>
        )}
        <div className="mt-3">
          <SpicyMeter level={level} />
        </div>
        {product.notSpicy && (
          <p className="mt-2 text-center text-[11px] font-bold uppercase tracking-widest text-negro/70">Sin chile</p>
        )}
        <p className="mt-3 text-center text-xl font-bold">{product.priceLabel}</p>

        {!hideBuy && !buyBelow && (
          <a
            href={href}
            target={product.shopifyUrl ? "_blank" : undefined}
            rel="noopener noreferrer"
            aria-label={`Comprar ${product.flavor}`}
            className="font-display pointer-events-none absolute left-full top-1/2 z-20 ml-3 -translate-y-1/2 translate-x-2 whitespace-nowrap text-xl tracking-widest opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100"
            style={{
              color: "#fff",
              textShadow: "0 0 4px #19e0ff, 0 0 12px #19e0ff, 0 0 24px rgba(25,224,255,0.7)",
            }}
          >
            COMPRAR
          </a>
        )}
      </div>

      {buyBelow && (
        <a
          href={href}
          target={product.shopifyUrl ? "_blank" : undefined}
          rel="noopener noreferrer"
          aria-label={`Comprar ${product.flavor}`}
          className="font-display mt-5 block text-center text-2xl tracking-[0.25em]"
          style={{
            color: "#fff",
            textShadow:
              "0 0 4px #b026ff, 0 0 12px #b026ff, 0 0 24px rgba(176,38,255,0.7), 0 0 40px rgba(176,38,255,0.5)",
          }}
        >
          COMPRAR
        </a>
      )}
    </div>
  );
}
