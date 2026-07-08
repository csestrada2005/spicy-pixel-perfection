import neonBanner from "@/assets/neon-pi-chili-banner.png.asset.json";

export function NeonBanner() {
  const items = Array.from({ length: 10 });
  return (
    <div className="group relative w-full overflow-hidden bg-negro">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {items.map((_, i) => (
          <img
            key={i}
            src={neonBanner.url}
            alt=""
            aria-hidden
            className="h-24 w-auto md:h-40 shrink-0 -mx-2"
          />
        ))}
      </div>
    </div>
  );
}
