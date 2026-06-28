// All image assets live in /public/assets/. Replace files there; do not change keys.
import logoNeonAsset from "@/assets/logo-spic-neon.png.asset.json";
import logoSmallAsset from "@/assets/logo-spic-small.png.asset.json";
import chilePatternBgAsset from "@/assets/chile-pattern-bg.png.asset.json";

const base = "/assets";

export const ASSETS = {
  logoNeon: logoNeonAsset.url,
  logoSmall: logoSmallAsset.url,
  heroFruit: `${base}/hero-fruit-explosion.png`,
  heroHandBag: `${base}/hero-hand-bag.png`,
  guyEating: `${base}/guy-eating.png`,
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
  fruitBorder: `${base}/fruit-border.png`,
  ig: [`${base}/ig-post-1.png`, `${base}/ig-post-2.png`, `${base}/ig-post-3.png`],
  avatars: [`${base}/avatar-1.png`, `${base}/avatar-2.png`, `${base}/avatar-3.png`],
};

export const SHOPIFY_CART_URL = "";
