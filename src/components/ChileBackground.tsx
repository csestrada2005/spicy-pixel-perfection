import { ASSETS } from "@/config/assets";

/**
 * Fondo de chiles en movimiento, compuesto en GPU (transform, no background-position).
 * La capa interna sangra 960px por lado y se desplaza un tile completo (360×480),
 * así el loop es continuo y ningún borde queda expuesto. overflow-hidden recorta.
 *
 * El tile mide 360×480 (mismo tamaño que usaban las 7 copias originales), así que
 * el translate3d del keyframe `spic-bg-drift` (-360px, -480px) avanza exactamente
 * un tile en cada eje para que el corte no se note.
 */
export function ChileBackground({
  className = "",
  opacity = 0.9,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="animate-bg-drift absolute inset-[-960px] bg-repeat"
        style={{
          backgroundImage: `url(${ASSETS.chilePatternBlack})`,
          backgroundSize: "360px 480px",
          opacity,
        }}
      />
    </div>
  );
}
