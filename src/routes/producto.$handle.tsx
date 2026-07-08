import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { Flame, Loader2, ArrowLeft } from "lucide-react";
import { NavBar } from "@/components/sections/NavBar";
import { Footer } from "@/components/sections/Footer";
import { ChileBackground } from "@/components/ChileBackground";
import { cleanTitle, formatPrice, useShopifyProduct } from "@/lib/shopify-catalog";
import { useCartStore } from "@/stores/cartStore";

export const Route = createFileRoute("/producto/$handle")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.handle.replace(/-/g, " ")} · S-π-C` },
      { name: "description", content: "Gummies Duo enchilados de S-π-C. Caja Display de 24 x 90g." },
    ],
  }),
  component: ProductoDetalle,
});

function ProductoDetalle() {
  const { handle } = useParams({ from: "/producto/$handle" });
  const { data: product, isLoading, isError } = useShopifyProduct(handle);
  const addByHandle = useCartStore((s) => s.addByHandle);
  const isCartLoading = useCartStore((s) => s.isLoading);
  const [activeImg, setActiveImg] = useState(0);

  return (
    <main className="min-h-screen bg-negro text-white">
      <NavBar />

      <section className="relative overflow-hidden bg-[#E11414] pt-28 pb-16 md:pt-32">
        <ChileBackground opacity={1} />

        <div className="relative z-10 mx-auto max-w-[1200px] px-4">
          <Link
            to="/productos"
            className="inline-flex items-center gap-2 rounded-full bg-amarillo-suave px-4 py-2 font-display text-xs tracking-widest text-negro shadow-[3px_3px_0_#CA8A04] hover:-translate-y-0.5 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> VOLVER
          </Link>

          {isLoading && (
            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="aspect-square animate-pulse rounded-3xl bg-amarillo-suave/60" />
              <div className="space-y-4">
                <div className="h-10 w-3/4 animate-pulse rounded bg-white/20" />
                <div className="h-6 w-1/2 animate-pulse rounded bg-white/20" />
                <div className="h-32 w-full animate-pulse rounded bg-white/10" />
              </div>
            </div>
          )}

          {!isLoading && (isError || !product) && (
            <div className="mt-16 text-center">
              <p className="font-display text-3xl">Producto no encontrado</p>
              <Link
                to="/productos"
                className="mt-6 inline-block rounded-full bg-amarillo px-6 py-3 font-display tracking-widest text-negro shadow-[4px_4px_0_#CA8A04]"
              >
                VER SABORES
              </Link>
            </div>
          )}

          {!isLoading && product && (
            <div className="mt-8 grid grid-cols-1 gap-8 md:mt-10 md:grid-cols-2 md:gap-12">
              {/* Galería */}
              <div>
                <div className="aspect-square overflow-hidden rounded-3xl bg-amarillo-suave shadow-[8px_8px_0_#CA8A04]">
                  {product.images.edges[activeImg]?.node?.url ? (
                    <img
                      src={product.images.edges[activeImg].node.url}
                      alt={product.title}
                      className="h-full w-full object-contain p-6"
                    />
                  ) : product.featuredImage?.url ? (
                    <img
                      src={product.featuredImage.url}
                      alt={product.title}
                      className="h-full w-full object-contain p-6"
                    />
                  ) : null}
                </div>
                {product.images.edges.length > 1 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto">
                    {product.images.edges.map((e, i) => (
                      <button
                        key={e.node.url}
                        type="button"
                        onClick={() => setActiveImg(i)}
                        className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-amarillo-suave ${
                          activeImg === i ? "border-white" : "border-transparent"
                        }`}
                      >
                        <img src={e.node.url} alt="" className="h-full w-full object-contain p-1" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-negro border border-amarillo/40 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-amarillo">
                    <Flame className="h-3 w-3" /> SPICY
                  </span>
                  <span className="rounded-full bg-amarillo-suave px-3 py-1 text-[10px] font-black uppercase tracking-widest text-negro">
                    Gummies Duo
                  </span>
                </div>

                <h1
                  className="font-display mt-3 text-4xl leading-none tracking-wider text-white sm:text-5xl md:text-6xl"
                  style={{
                    textShadow: "3px 3px 0 #FFD400, 4px 4px 0 #FFD400",
                  }}
                >
                  {cleanTitle(product.title).toUpperCase()}
                </h1>

                <p className="mt-4 font-display text-3xl text-amarillo sm:text-4xl">
                  {formatPrice(product.priceRange.minVariantPrice)}
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-white/70">
                  Precio por caja Display (24 empaques individuales de 90 g)
                </p>

                {product.description && (
                  <p className="mt-6 max-w-prose text-sm leading-relaxed text-white/90 sm:text-base">
                    {product.description}
                  </p>
                )}

                <div className="mt-6 rounded-2xl border-2 border-amarillo/30 bg-negro/40 p-4">
                  <h3 className="font-display text-lg tracking-wide text-amarillo">
                    QUÉ INCLUYE
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm text-white/90">
                    <li>• 1 caja Display sellada</li>
                    <li>• 24 empaques individuales de 90 g (3.17 oz)</li>
                    <li>• Empaque metalizado con ziploc</li>
                    <li>• Sabor enchilado — hecho en México</li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => addByHandle(product.handle, product.title, product.featuredImage?.url)}
                  disabled={isCartLoading}
                  className="font-display mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-amarillo py-4 text-lg tracking-widest text-negro shadow-[6px_6px_0_#000] transition hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto sm:px-12"
                >
                  {isCartLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "AÑADIR AL CARRITO"
                  )}
                </button>

                <p className="mt-4 text-xs text-white/60">
                  Envíos a todo México · Pago seguro en Shopify
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
