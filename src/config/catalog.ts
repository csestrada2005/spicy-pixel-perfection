import type { Product } from "./products";

/**
 * CATÁLOGO COMPLETO DE CONSUMIDOR — 27 productos, 4 líneas.
 * Fuente: SPICY_CATALOGO_2026 (nombres leídos del catálogo oficial).
 *
 * Este archivo es INDEPENDIENTE de PRODUCTS (config/products.ts).
 * PRODUCTS lo siguen usando Hero/Bestsellers (no lo toques).
 * CATALOG lo usa la página de productos nueva (/productos).
 *
 * ⚠️ REVISAR ANTES DE PUBLICAR:
 *  - priceLabel: TODOS traen "$50.0" de placeholder. Pon precios reales
 *    (probablemente distintos por línea: 90 g Duo ≠ 80 g Organic ≠ 20 g Baked).
 *  - spicyLevel: los picantes están en 4 como placeholder (el catálogo NO
 *    especifica nivel, solo picante/no-picante). Ajusta el nivel real por sabor.
 *  - notSpicy:true → mostrar 0 chiles en el medidor (Lemon Mint y los 2 dried).
 *  - Imágenes en /public/assets/products/<slug>.png (archivos planos, NO .asset.json).
 *  - shopifyUrl: vacío hasta crear los productos en Shopify.
 */

export type LineId =
  | "gummies-duo"
  | "organic-fruits"
  | "baked-gummies"
  | "baked-caramel";

export type CatalogProduct = Product & {
  line: LineId;
  netWeight: string;
  notSpicy?: boolean;
};

export const LINES: {
  id: LineId;
  name: string;
  subtitle?: string;
  netWeight: string;
}[] = [
  { id: "gummies-duo", name: "Gummies Duo", netWeight: "90 g" },
  { id: "organic-fruits", name: "Organic Fruits", netWeight: "80 g" },
  { id: "baked-gummies", name: "Baked Gummies", netWeight: "20 g" },
  { id: "baked-caramel", name: "Baked Caramel", subtitle: "Nebulas", netWeight: "20 g" },
];

const img = (slug: string) => `/assets/products/${slug}.png`;

// Tienda Shopify (dominio myshopify). El handle de cada producto en Shopify
// es el mismo `id` de abajo, así que el link se arma solo.
const STORE = "https://iutpgz-pp.myshopify.com";

const CATALOG_RAW: CatalogProduct[] = [
  // ── GUMMIES DUO (90 g) ─────────────────────────────────────────────
  { id: "mixed-berries",    name: "MIXED BERRIES",    flavor: "Strawberry · Raspberry · Blueberry", line: "gummies-duo", netWeight: "90 g", image: img("mixed-berries"),    spicyLevel: 4, priceLabel: "$50.0", shopifyUrl: "" },
  { id: "apple-strawberry", name: "APPLE STRAWBERRY", flavor: "Apple · Strawberry",                 line: "gummies-duo", netWeight: "90 g", image: img("apple-strawberry"), spicyLevel: 4, priceLabel: "$50.0", shopifyUrl: "" },
  { id: "blueberry-grape",  name: "BLUEBERRY GRAPE",  flavor: "Blueberry · Grape",                  line: "gummies-duo", netWeight: "90 g", image: img("blueberry-grape"),  spicyLevel: 4, priceLabel: "$50.0", shopifyUrl: "" },
  { id: "cherry-lemon",     name: "CHERRY LEMON",     flavor: "Cherry · Lemon",                     line: "gummies-duo", netWeight: "90 g", image: img("cherry-lemon"),     spicyLevel: 4, priceLabel: "$50.0", shopifyUrl: "" },
  { id: "citrus-punch",     name: "CITRUS PUNCH",     flavor: "Mandarina · Naranja · Limón",        line: "gummies-duo", netWeight: "90 g", image: img("citrus-punch"),     spicyLevel: 4, priceLabel: "$50.0", shopifyUrl: "" },
  { id: "conga",            name: "CONGA",            flavor: "Mango · Strawberry · Pineapple",     line: "gummies-duo", netWeight: "90 g", image: img("conga"),            spicyLevel: 4, priceLabel: "$50.0", shopifyUrl: "" },
  { id: "fresh-lemon",      name: "FRESH LEMON",      flavor: "Pepino · Limón",                     line: "gummies-duo", netWeight: "90 g", image: img("fresh-lemon"),      spicyLevel: 4, priceLabel: "$50.0", shopifyUrl: "" },
  { id: "fresh-tangerine",  name: "FRESH TANGERINE",  flavor: "Mandarina · Pepino",                 line: "gummies-duo", netWeight: "90 g", image: img("fresh-tangerine"),  spicyLevel: 4, priceLabel: "$50.0", shopifyUrl: "" },
  { id: "guayaba",          name: "GUAYABA",          flavor: "Guayaba",                            line: "gummies-duo", netWeight: "90 g", image: img("guayaba"),          spicyLevel: 4, priceLabel: "$50.0", shopifyUrl: "" },
  { id: "pink-lemonade",    name: "PINK LEMONADE",    flavor: "Strawberry · Lemon",                 line: "gummies-duo", netWeight: "90 g", image: img("pink-lemonade"),    spicyLevel: 4, priceLabel: "$50.0", shopifyUrl: "" },
  { id: "mango-lemon",      name: "MANGO LEMON",      flavor: "Mango · Limón",                      line: "gummies-duo", netWeight: "90 g", image: img("mango-lemon"),      spicyLevel: 4, priceLabel: "$50.0", shopifyUrl: "" },
  { id: "peach-berry",      name: "PEACH BERRY",      flavor: "Durazno · Blueberry",                line: "gummies-duo", netWeight: "90 g", image: img("peach-berry"),      spicyLevel: 4, priceLabel: "$50.0", shopifyUrl: "" },
  { id: "pina-colada",      name: "PIÑA COLADA",      flavor: "Piña · Coco",                        line: "gummies-duo", netWeight: "90 g", image: img("pina-colada"),      spicyLevel: 4, priceLabel: "$50.0", shopifyUrl: "" },
  { id: "strawmelon",       name: "STRAWMELON",       flavor: "Strawberry · Watermelon",            line: "gummies-duo", netWeight: "90 g", image: img("strawmelon"),       spicyLevel: 4, priceLabel: "$50.0", shopifyUrl: "" },
  { id: "lemon-mint",       name: "LEMON MINT",       flavor: "Lemon · Mint",                       line: "gummies-duo", netWeight: "90 g", image: img("lemon-mint"),       spicyLevel: 1, notSpicy: true, priceLabel: "$50.0", shopifyUrl: "" },

  // ── ORGANIC FRUITS (80 g) ──────────────────────────────────────────
  { id: "organic-mango",            name: "MANGO ORGÁNICO",    flavor: "Mango enchilado",  line: "organic-fruits", netWeight: "80 g", image: img("organic-mango"),            spicyLevel: 4, priceLabel: "$50.0", shopifyUrl: "" },
  { id: "organic-mango-dried",      name: "MANGO DESHIDRATADO", flavor: "Mango natural",   line: "organic-fruits", netWeight: "80 g", image: img("organic-mango-dried"),      spicyLevel: 1, notSpicy: true, priceLabel: "$50.0", shopifyUrl: "" },
  { id: "organic-pineapple",        name: "PIÑA ORGÁNICA",     flavor: "Piña enchilada",   line: "organic-fruits", netWeight: "80 g", image: img("organic-pineapple"),        spicyLevel: 4, priceLabel: "$50.0", shopifyUrl: "" },
  { id: "organic-pineapple-dried",  name: "PIÑA DESHIDRATADA",  flavor: "Piña natural",    line: "organic-fruits", netWeight: "80 g", image: img("organic-pineapple-dried"),  spicyLevel: 1, notSpicy: true, priceLabel: "$50.0", shopifyUrl: "" },

  // ── BAKED GUMMIES (20 g) — solo Rainbow ───────────────────────────
  { id: "rainbow-mix", name: "RAINBOW MIX", flavor: "Strawberry · Cherry · Blueberry · Grape · Lemon · Mango · Naranja", line: "baked-gummies", netWeight: "20 g", image: img("rainbow-mix"), spicyLevel: 4, priceLabel: "$50.0", shopifyUrl: "" },

  // ── BAKED CARAMEL · NEBULAS (20 g) ─────────────────────────────────
  { id: "nebulas-sweet-mix",        name: "SWEET MIX",        flavor: "Mix de sabores", line: "baked-caramel", netWeight: "20 g", image: img("nebulas-sweet-mix"),        spicyLevel: 4, priceLabel: "$50.0", shopifyUrl: "" },
  { id: "nebulas-blueberry-grape",  name: "BLUEBERRY GRAPE",  flavor: "Blueberry · Grape", line: "baked-caramel", netWeight: "20 g", image: img("nebulas-blueberry-grape"),  spicyLevel: 4, priceLabel: "$50.0", shopifyUrl: "" },
  { id: "nebulas-cherry-grape",     name: "CHERRY GRAPE",     flavor: "Cherry · Grape",  line: "baked-caramel", netWeight: "20 g", image: img("nebulas-cherry-grape"),     spicyLevel: 4, priceLabel: "$50.0", shopifyUrl: "" },
  { id: "nebulas-cherry-lemon",     name: "CHERRY LEMON",     flavor: "Cherry · Lemon",  line: "baked-caramel", netWeight: "20 g", image: img("nebulas-cherry-lemon"),     spicyLevel: 4, priceLabel: "$50.0", shopifyUrl: "" },
  { id: "nebulas-cherry-orange",    name: "CHERRY ORANGE",    flavor: "Cherry · Orange", line: "baked-caramel", netWeight: "20 g", image: img("nebulas-cherry-orange"),    spicyLevel: 4, priceLabel: "$50.0", shopifyUrl: "" },
  { id: "nebulas-pineapple-orange", name: "PINEAPPLE ORANGE", flavor: "Piña · Naranja",  line: "baked-caramel", netWeight: "20 g", image: img("nebulas-pineapple-orange"), spicyLevel: 4, priceLabel: "$50.0", shopifyUrl: "" },
  { id: "nebulas-pink-lemonade",    name: "PINK LEMONADE",    flavor: "Fresa · Limón",   line: "baked-caramel", netWeight: "20 g", image: img("nebulas-pink-lemonade"),    spicyLevel: 4, priceLabel: "$50.0", shopifyUrl: "" },
];

// Arma el link de compra de cada producto: {tienda}/products/{handle}.
// Nota: el link funciona cuando el producto está publicado en Shopify
// (los draft no son visibles públicamente).
export const CATALOG: CatalogProduct[] = CATALOG_RAW.map((p) => ({
  ...p,
  shopifyUrl: `${STORE}/products/${p.id}`,
}));

/** Agrupa el catálogo por línea, en el orden de LINES. */
export function catalogByLine() {
  return LINES.map((line) => ({
    line,
    products: CATALOG.filter((p) => p.line === line.id),
  }));
}
