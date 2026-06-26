import { ASSETS } from "./assets";

export type Product = {
  id: string;
  name: string;
  flavor: string;
  priceLabel: string;
  image: string;
  spicyLevel: 1 | 2 | 3 | 4 | 5;
  shopifyUrl: string;
};

export const PRODUCTS: Product[] = [
  { id: "fresh-lemon",     name: "FRESH LEMON",     flavor: "Fresh Lemon",     priceLabel: "$50.0", image: ASSETS.bags.freshLemon,     spicyLevel: 4, shopifyUrl: "" },
  { id: "pina-colada",     name: "PIÑA COLADA",     flavor: "Piña Colada",     priceLabel: "$50.0", image: ASSETS.bags.pinaColada,     spicyLevel: 4, shopifyUrl: "" },
  { id: "cherry-lemon",    name: "CHERRY LEMON",    flavor: "Cherry Lemon",    priceLabel: "$50.0", image: ASSETS.bags.cherryLemon,    spicyLevel: 4, shopifyUrl: "" },
  { id: "straw-melon",     name: "STRAW MELON",     flavor: "Straw Melon",     priceLabel: "$50.0", image: ASSETS.bags.strawMelon,     spicyLevel: 4, shopifyUrl: "" },
  { id: "mango-pasion",    name: "MANGO PASIÓN",    flavor: "Mango Pasión",    priceLabel: "$50.0", image: ASSETS.bags.mangoPasion,    spicyLevel: 4, shopifyUrl: "" },
  { id: "fresh-tangerine", name: "FRESH TANGERINE", flavor: "Fresh Tangerine", priceLabel: "$50.0", image: ASSETS.bags.freshTangerine, spicyLevel: 4, shopifyUrl: "" },
  { id: "pink-lemonade",   name: "PINK LEMONADE",   flavor: "Pink Lemonade",   priceLabel: "$50.0", image: ASSETS.bags.pinkLemonade,   spicyLevel: 4, shopifyUrl: "" },
  { id: "mixed-berries",   name: "MIXED BERRIES",   flavor: "Mixed Berries",   priceLabel: "$50.0", image: ASSETS.bags.mixedBerries,   spicyLevel: 4, shopifyUrl: "" },
];
