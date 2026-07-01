import { useEffect, useRef } from "react";

const SPLASH = "/hero-splash-wide.webp";

export function HeroBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const root = rootRef.current;
    const layer = parallaxRef.current;
    const cv = canvasRef.current;

    const onMove = (e: MouseEvent) => {
      if (!root || !layer) return;
      const r = root.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) {
        layer.style.transform = "";
        return;
      }
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      layer.style.transform = `translate(${(x * 16).toFixed(1)}px, ${(y * 16).toFixed(1)}px)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf = 0;
    let onResize: (() => void) | null = null;

    if (cv && root) {
      const ctx = cv.getContext("2d");
      if (ctx) {
        onResize = () => {
          cv.width = root.clientWidth;
          cv.height = root.clientHeight;
        };
        onResize();
        window.addEventListener("resize", onResize);

        const spawn = (reset: boolean) => ({
          x: Math.random() * cv.width,
          y: reset ? cv.height + 8 : Math.random() * cv.height,
          r: Math.random() * 2 + 0.6,
          vy: -(Math.random() * 0.5 + 0.22),
          vx: (Math.random() - 0.5) * 0.22,
          a: 0,
        });
        const parts = Array.from({ length: 30 }, () => spawn(false));
        const col = ["#ff7a1e", "#ff3b2e", "#ffd23d"];

        const tick = () => {
          ctx.clearRect(0, 0, cv.width, cv.height);
          ctx.globalCompositeOperation = "lighter";
          for (let i = 0; i < parts.length; i++) {
            const p = parts[i];
            p.x += p.vx;
            p.y += p.vy;
            p.a = Math.min(p.a + 0.012, 0.85);
            if (p.y < -8) {
              parts[i] = spawn(true);
              continue;
            }
            ctx.globalAlpha = p.a * (0.55 + 0.45 * Math.sin(Date.now() / 320 + i));
            ctx.fillStyle = col[i % 3];
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 7);
            ctx.fill();
          }
          ctx.globalAlpha = 1;
          ctx.globalCompositeOperation = "source-over";
          raf = requestAnimationFrame(tick);
        };
        tick();
      }
    }

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (onResize) window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Radial glow behind the splash */}
      <div
        className="animate-hero-glow absolute left-1/2 top-1/2 aspect-square w-[52%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(255,60,30,0.55), rgba(255,138,30,0.25) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Parallax layer holds the breathing splash */}
      <div ref={parallaxRef} className="absolute inset-0 will-change-transform">
        <div className="animate-hero-breathe absolute inset-0 flex items-center justify-center">
          <div
            className="absolute left-1/2 top-[12%] w-[135%] max-w-none -translate-x-1/2 -translate-y-1/2 md:w-[105%]"
            style={{ aspectRatio: "973 / 796" }}
          >
            <img
              src={SPLASH}
              alt=""
              className="h-full w-full object-contain opacity-95"
              style={{
                WebkitMaskImage:
                  "radial-gradient(closest-side, #000 78%, transparent 100%)",
                maskImage:
                  "radial-gradient(closest-side, #000 78%, transparent 100%)",
              }}
            />
          </div>
        </div>

        {/* Sweeping specular highlight */}
        <div
          className="animate-hero-sweep absolute inset-0 mix-blend-screen opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(115deg, transparent 40%, rgba(255,220,150,0.35) 50%, transparent 60%)",
            backgroundSize: "220% 220%",
          }}
        />
      </div>

      {/* Ember particles */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
