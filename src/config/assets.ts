// All image assets live in /public/assets/. Replace files there; do not change keys.
import logoNeonAsset from "@/assets/logo-spic-neon.png.asset.json";
import logoSmallAsset from "@/assets/logo-spic-small.png.asset.json";
import chilePatternBgAsset from "@/assets/bestsellers-pattern.png.asset.json";
import chilePatternDarkAsset from "@/assets/chile-pattern-dark.jpg.asset.json";
import chilePatternBlackAsset from "@/assets/chile-pattern-black.png.asset.json";
import heroFruitAsset from "@/assets/hero-fruit-explosion.png.asset.json";
import bocaAbiertaAsset from "@/assets/boca-abierta.png.asset.json";
import chicaGomitasAsset from "@/assets/chica-gomitas.png.asset.json";
import orgulloTextAsset from "@/assets/orgullo-text.png.asset.json";

const base = "/assets";

export const ASSETS = {
  logoNeon: logoNeonAsset.url,
  logoSmall: logoSmallAsset.url,
  heroFruit: heroFruitAsset.url,
  heroHandBag: chicaGomitasAsset.url,
  guyEating: bocaAbiertaAsset.url,
  orgulloText: orgulloTextAsset.url,
  bags: {
    freshLemon: `${base}/bag-fresh-lemon.png`,
    pinaColada: `${base}/bag-pina-colada.png`,
    cherryLemon: `${base}/bag-cherry-lemon.png`,
    strawMelon: `${base}/bag-straw-melon.png`,
    mangoPasion: `${base}/bag-mango-pasion.png`,
    freshTangerine: `${base}/bag-fresh-tangerine.png`,
    pinkLemonade: `${base}/bag-pink-lemonade.png`,
    mixedBerries: `${base}/bag-mixed-berries.png`,
  },
  chileDivider: `${base}/chile-divider.png`,
  chilePatternBg: chilePatternBgAsset.url,
  chilePatternDark: chilePatternDarkAsset.url,
  chilePatternBlack: chilePatternBlackAsset.url,
  fruitBorder: `${base}/fruit-border.png`,
  ig: [`${base}/ig-post-1.png`, `${base}/ig-post-2.png`, `${base}/ig-post-3.png`],
  avatars: [`${base}/avatar-1.png`, `${base}/avatar-2.png`, `${base}/avatar-3.png`],
};

export const SHOPIFY_CART_URL = "";
