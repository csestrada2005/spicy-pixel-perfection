import type { CSSProperties } from "react";

const GUMMIES = Array.from({ length: 12 });

export function FallingGummies() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {GUMMIES.map((_, i) => {
        const left = (i * 41) % 100;
        const delay = ((i * 0.37) % 3.2).toFixed(2);
        const dur = (2.6 + (i % 4) * 0.45).toFixed(2);
        const size = 10 + (i % 3) * 3;
        const drift = (i % 2 ? 1 : -1) * (5 + (i % 3) * 5);
        const style: CSSProperties = {
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          background: "radial-gradient(circle at 35% 30%, #b64a3a, #7c2318 72%)",
          boxShadow: "inset -1px -1px 2px rgba(0,0,0,.45)",
          animationDelay: `${delay}s`,
          animationDuration: `${dur}s`,
        };
        (style as Record<string, unknown>)["--drift"] = `${drift}px`;
        return (
          <div
            key={i}
            className="animate-gummy-fall absolute rounded-full"
            style={style}
          />
        );
      })}
    </div>
  );
}
