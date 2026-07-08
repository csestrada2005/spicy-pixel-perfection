import neonBanner from "@/assets/neon-pi-chili-banner.png.asset.json";

export function NeonBanner() {
  const items = Array.from({ length: 10 });
  return (
    <div className="group relative h-6 w-full overflow-hidden bg-negro md:h-10">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {items.map((_, i) => (
          <img
            key={i}
            src={neonBanner.url}
            alt=""
            aria-hidden
            className="h-24 w-auto shrink-0 -translate-y-[37px] -mx-2 md:h-40 md:-translate-y-[60px]"
          />
        ))}
      </div>
    </div>
  );
}
