const TEXT =
  "& LLENOS DE SABOR — HECHOS A MANO EN MEXICO — TEXTURA PERFECTA — UNA EXPERIENCIA PICANTE";

function Row({ reverse }: { reverse?: boolean }) {
  const items = Array.from({ length: 6 }, () => TEXT).join("   ★   ");

  return (
    <div
      className={`flex w-max whitespace-nowrap font-display text-lg tracking-widest text-white md:text-2xl group-hover:[animation-play-state:paused] ${
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      }`}
    >
      <span className="px-6">{items}</span>
      <span className="px-6" aria-hidden>{items}</span>
    </div>
  );
}

export function Marquee() {
  return (
    <div className="group relative w-full overflow-hidden bg-rojo py-3">
      <Row />
      <div className="mt-1.5">
        <Row reverse />
      </div>
    </div>
  );
}
