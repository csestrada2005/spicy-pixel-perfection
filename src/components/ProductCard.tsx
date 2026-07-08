import { Link } from "@tanstack/react-router";
import { Loader2, Flame } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { cleanTitle, formatPrice, type ShopifyProductNode } from "@/lib/shopify-catalog";

type Props = {
  product: ShopifyProductNode;
  compact?: boolean;
  index?: number;
  linkToDetail?: boolean;
};

export function ProductCard({ product, compact, index, linkToDetail = true }: Props) {
  const addByHandle = useCartStore((s) => s.addByHandle);
  const isLoading = useCartStore((s) => s.isLoading);

  const name = cleanTitle(product.title).toUpperCase();
  const image = product.featuredImage?.url ?? product.images.edges[0]?.node.url ?? "";
  const price = formatPrice(product.priceRange.minVariantPrice);
  const variant = product.variants.edges[0]?.node;
  const soldOut = variant ? !variant.availableForSale : false;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLoading || soldOut) return;
    addByHandle(product.handle, product.title, image);
  };

  const inner = (
    <div
      className={`group relative w-full rounded-2xl bg-amarillo-suave text-negro shadow-[6px_6px_0px_#CA8A04] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1.5 hover:rotate-[-1deg] hover:shadow-[10px_10px_0px_#CA8A04,0_0_26px_rgba(225,20,20,0.35)] ${
        compact ? "p-3 pb-4" : "p-4 pb-5 sm:p-5"
      }`}
    >
      {/* Badge Spicy */}
      <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-negro px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-amarillo shadow-[2px_2px_0_#CA8A04]">
        <Flame className="h-3 w-3" /> SPICY
      </div>
      {soldOut && (
        <div className="absolute right-3 top-3 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-negro">
          Agotado
        </div>
      )}
      <div
        className={`animate-float relative flex items-center justify-center overflow-visible ${
          compact ? "h-32" : "h-40 sm:h-44"
        }`}
        style={{ animationDelay: `${(index ?? 0) * 0.5}s` }}
      >
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-auto object-contain drop-shadow-md"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="h-full w-full rounded-lg bg-white/40" />
        )}
      </div>
      <h3 className="font-display mt-3 text-center text-lg tracking-wide sm:text-xl">{name}</h3>
      <p className="mt-0.5 text-center text-[10px] font-bold uppercase tracking-widest text-negro/60">
        Caja Display · 24 x 90 g
      </p>
      <p className="mt-2 text-center text-lg font-black sm:text-xl">{price}</p>

      <button
        type="button"
        onClick={handleAdd}
        disabled={isLoading || soldOut}
        aria-label={`Añadir al carrito ${name}`}
        className="font-display mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-negro py-2 text-sm tracking-widest text-amarillo transition hover:-translate-y-0.5 disabled:opacity-60 sm:text-base"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : soldOut ? "AGOTADO" : "COMPRAR"}
      </button>
    </div>
  );

  if (!linkToDetail) return inner;
  return (
    <Link
      to="/producto/$handle"
      params={{ handle: product.handle }}
      className="block"
      preload="intent"
    >
      {inner}
    </Link>
  );
}

export function ProductCardSkeleton({ compact }: { compact?: boolean }) {
  return (
    <div
      className={`w-full animate-pulse rounded-2xl bg-amarillo-suave/60 shadow-[6px_6px_0px_#CA8A04] ${
        compact ? "p-3 pb-4" : "p-5 pb-5"
      }`}
    >
      <div className={`${compact ? "h-32" : "h-44"} rounded-lg bg-white/40`} />
      <div className="mt-4 mx-auto h-4 w-2/3 rounded bg-negro/20" />
      <div className="mt-2 mx-auto h-3 w-1/2 rounded bg-negro/10" />
      <div className="mt-3 h-9 rounded-full bg-negro/20" />
    </div>
  );
}
