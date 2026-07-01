const TEXT =
  "& LLENOS DE SABOR — HECHOS A MANO EN MEXICO — TEXTURA PERFECTA — UNA EXPERIENCIA PICANTE";

export function Marquee() {
  const items = Array.from({ length: 6 }, () => TEXT).join("   ★   ");
  return (
    <div className="group relative w-full overflow-hidden bg-rojo py-3">
      <div
        className="flex w-max whitespace-nowrap font-display text-lg tracking-widest text-white md:text-2xl group-hover:[animation-play-state:paused]"
        style={{ animation: "marquee 60s linear infinite reverse" }}
      >
        <span className="px-6">{items}</span>
        <span className="px-6" aria-hidden>{items}</span>
      </div>

      {/* Sweep diagonal sincronizado con el hero */}
      <div
        aria-hidden
        className="animate-hero-sweep pointer-events-none absolute inset-0 mix-blend-screen opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(115deg, transparent 40%, rgba(255,220,150,0.55) 50%, transparent 60%)",
          backgroundSize: "220% 220%",
        }}
      />
      {/* Sweep vertical sincronizado */}
      <div
        aria-hidden
        className="animate-hero-sweep pointer-events-none absolute inset-0 mix-blend-screen opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(180deg, transparent 42%, rgba(255,240,200,0.45) 50%, transparent 58%)",
          backgroundSize: "220% 220%",
        }}
      />
    </div>
  );
}
