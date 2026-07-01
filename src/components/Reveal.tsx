import { useEffect, useState, type ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  // Evita quedarse invisible en SSR / si el observer nunca dispara.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setMounted((m) => m), 0);
    return () => clearTimeout(t);
  }, []);
  const show = !mounted || inView;
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity .55s ease ${delay}ms, transform .55s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

