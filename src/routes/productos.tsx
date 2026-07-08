import { createFileRoute } from "@tanstack/react-router";
import { NavBar } from "@/components/sections/NavBar";
import { Footer } from "@/components/sections/Footer";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { ChileBackground } from "@/components/ChileBackground";
import { useShopifyProducts } from "@/lib/shopify-catalog";

export const Route = createFileRoute("/productos")({
  head: () => ({
    meta: [
      { title: "Sabores · S-π-C" },
      {
        name: "description",
        content:
          "Gummies Duo enchilados: sabores intensos en caja Display de 24 empaques individuales de 90g.",
      },
    ],
  }),
  component: Productos,
});

function Productos() {
  const { data: products, isLoading, isError } = useShopifyProducts();

  return (
    <main className="min-h-screen bg-negro text-white">
      <NavBar />

      <section className="relative overflow-hidden bg-[#E11414] pt-28 pb-20 md:pt-32">
        <ChileBackground opacity={1} />

        <div className="relative z-10 mx-auto max-w-[1280px] px-4">
          <header className="text-center">
            <h1
              className="animate-stamp font-display text-4xl tracking-wider text-white sm:text-6xl md:text-7xl"
              style={{
                textShadow: "4px 4px 0 #FFD400, 5px 5px 0 #FFD400, 6px 6px 0 #FFD400",
              }}
            >
              NUESTROS SABORES
            </h1>
            <p className="mx-auto mt-5 max-w-xl font-sans text-sm font-semibold text-white/90 sm:text-lg">
              Todos vienen en <span className="font-black">caja Display de 24</span> empaques
              individuales de 90 g. Sabor intenso, chile de verdad.
            </p>
          </header>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 md:mt-16 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
            {isLoading &&
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="mx-auto w-full max-w-[280px]">
                  <ProductCardSkeleton />
                </div>
              ))}
            {!isLoading && !isError && products && products.length > 0 &&
              products.map((p, i) => (
                <Reveal key={p.id} delay={i * 60} className="mx-auto w-full max-w-[280px]">
                  <ProductCard product={p} index={i} />
                </Reveal>
              ))}
            {!isLoading && (isError || (products && products.length === 0)) && (
              <div className="col-span-full py-16 text-center text-white/80">
                <p className="font-display text-2xl">No pudimos cargar los sabores.</p>
                <p className="mt-2 text-sm">Intenta recargar la página en un momento.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
