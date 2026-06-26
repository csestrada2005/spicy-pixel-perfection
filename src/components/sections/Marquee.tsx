const TEXT =
  "& LLENOS DE SABOR — HECHOS A MANO EN MEXICO — TEXTURA PERFECTA — UNA EXPERIENCIA PICANTE";

export function Marquee() {
  const items = Array.from({ length: 6 }, () => TEXT).join("   ★   ");
  return (
    <div className="relative w-full overflow-hidden bg-rojo py-3">
      <div className="animate-marquee flex w-max whitespace-nowrap font-display text-lg tracking-widest text-white md:text-2xl">
        <span className="px-6">{items}</span>
        <span className="px-6" aria-hidden>{items}</span>
      </div>
    </div>
  );
}
