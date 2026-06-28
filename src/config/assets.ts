// All image assets live in /public/assets/. Replace files there; do not change keys.
import logoNeonAsset from "@/assets/logo-spic-neon.png.asset.json";
import logoSmallAsset from "@/assets/logo-spic-small.png.asset.json";
import chilePatternBgAsset from "@/assets/bestsellers-pattern.png.asset.json";
import chilePatternDarkAsset from "@/assets/chile-pattern-dark.jpg.asset.json";
import chilePatternBlackAsset from "@/assets/chile-pattern-black.png.asset.json";
import heroFruitAsset from "@/assets/hero-fruit-explosion.png.asset.json";
import bocaAbiertaAsset from "@/assets/boca-abierta-horizontal.png.asset.json";
import chicaGomitasAsset from "@/assets/chica-gomitas.png.asset.json";
import orgulloTextAsset from "@/assets/orgullo-text.png.asset.json";
import freshLemonFramedAsset from "@/assets/bag-fresh-lemon-framed-transparent.png.asset.json";
import mixedBerriesFramedAsset from "@/assets/bag-mixed-berries-framed-transparent.png.asset.json";
import cherryLemonFramedAsset from "@/assets/bag-cherry-lemon-framed-transparent.png.asset.json";
import strawMelonFramedAsset from "@/assets/bag-straw-melon-framed-transparent.png.asset.json";
import pinaColadaFramedAsset from "@/assets/bag-pina-colada-framed-transparent.png.asset.json";
import mangoPasionFramedAsset from "@/assets/bag-mango-pasion-framed-transparent.png.asset.json";
import freshTangerineFramedAsset from "@/assets/bag-fresh-tangerine-framed-transparent.png.asset.json";
import pinkLemonadeFramedAsset from "@/assets/bag-pink-lemonade-framed-transparent.png.asset.json";

const base = "/assets";

export const ASSETS = {
  logoNeon: logoNeonAsset.url,
  logoSmall: logoSmallAsset.url,
  heroFruit: heroFruitAsset.url,
  heroHandBag: chicaGomitasAsset.url,
  guyEating: bocaAbiertaAsset.url,
  orgulloText: orgulloTextAsset.url,
  bags: {
    freshLemon: freshLemonFramedAsset.url,
    pinaColada: pinaColadaFramedAsset.url,
    cherryLemon: cherryLemonFramedAsset.url,
    strawMelon: strawMelonFramedAsset.url,
    mangoPasion: mangoPasionFramedAsset.url,
    freshTangerine: freshTangerineFramedAsset.url,
    pinkLemonade: pinkLemonadeFramedAsset.url,
    mixedBerries: mixedBerriesFramedAsset.url,
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
