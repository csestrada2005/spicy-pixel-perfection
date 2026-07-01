import neonBanner from "@/assets/neon-pi-chili-banner.png.asset.json";

export function NeonBanner() {
  const items = Array.from({ length: 8 });
  return (
    <div className="group relative w-full overflow-hidden bg-negro py-4">
      <div className="flex w-max animate-marquee-reverse group-hover:[animation-play-state:paused]">
        {items.map((_, i) => (
          <img
            key={i}
            src={neonBanner.url}
            alt=""
            aria-hidden
            className="h-24 w-auto md:h-32 shrink-0"
          />
        ))}
        {items.map((_, i) => (
          <img
            key={`b-${i}`}
            src={neonBanner.url}
            alt=""
            aria-hidden
            className="h-24 w-auto md:h-32 shrink-0"
          />
        ))}
      </div>
    </div>
  );
}
