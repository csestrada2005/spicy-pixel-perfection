import { createFileRoute } from "@tanstack/react-router";
import { NavBar } from "@/components/sections/NavBar";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Bestsellers } from "@/components/sections/Bestsellers";
import { ChileDivider, FruitBorder } from "@/components/sections/Dividers";
import { Reviews } from "@/components/sections/Reviews";
import { Footer } from "@/components/sections/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "S-π-C Spicy — Dulces Enchilados Mexicanos" },
      { name: "description", content: "Dulces enchilados intensos y adictivos. Cargados de chile, chamoy y sabor auténtico. Hechos a mano en México." },
      { property: "og:title", content: "S-π-C Spicy — Una Bomba Picante" },
      { property: "og:description", content: "Dulces enchilados mexicanos. Ordena tu nueva adicción." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-negro text-white">
      <NavBar />
      <Hero />
      <Marquee />
      <Bestsellers />
      <ChileDivider />
      <Reviews />
      <FruitBorder />
      <Footer />
    </main>
  );
}
