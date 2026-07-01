import neonBanner from "@/assets/neon-pi-chili-banner.png.asset.json";

export function NeonBanner() {
  const items = Array.from({ length: 8 });
  return (
    <div className="group relative w-full overflow-hidden bg-negro">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {items.map((_, i) => (
          <img
            key={i}
            src={neonBanner.url}
            alt=""
            aria-hidden
            className="h-14 w-auto md:h-20 shrink-0 -mx-2"
          />
        ))}
        {items.map((_, i) => (
          <img
            key={`b-${i}`}
            src={neonBanner.url}
            alt=""
            aria-hidden
            className="h-14 w-auto md:h-20 shrink-0 -mx-2"
          />
        ))}
      </div>
    </div>
  );
}
