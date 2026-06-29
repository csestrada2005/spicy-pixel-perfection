import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";

const LINKS_LEFT = [
  { label: "SABORES", href: "#sabores" },
  { label: "GALERIA", href: "#galeria" },
];
const LINKS_RIGHT = [
  { label: "REVIEWS", href: "#reviews" },
  { label: "ÚNETE", href: "#unete" },
];

const YELLOW = "#FFD400";
const RED = "#E11414";
const CYAN = "#5BE9F2";

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass =
    "font-sans font-extrabold text-sm md:text-base tracking-[0.18em] transition-colors duration-150 hover:opacity-80";
  const linkStyle = { color: RED } as const;

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.65)]" : ""
      }`}
    >
      <div className="mx-auto max-w-[1280px] px-3 pt-4 pb-2">
        {/* Pill */}
        <nav
          className="relative flex items-center justify-between rounded-full px-4 py-3 md:px-8 md:py-3"
          style={{
            backgroundColor: YELLOW,
            border: `2px solid ${RED}`,
          }}
        >
          {/* Mobile: hamburger left */}
          <button
            type="button"
            className="rounded-full p-2 md:hidden"
            style={{ color: RED }}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Desktop: left links */}
          <ul className="hidden flex-1 items-center justify-around gap-6 md:flex">
            {LINKS_LEFT.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={linkClass} style={linkStyle}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Spacer for central bag on desktop */}
          <div className="hidden w-28 shrink-0 md:block" aria-hidden />

          {/* Desktop: right links */}
          <ul className="hidden flex-1 items-center justify-around gap-6 md:flex">
            {LINKS_RIGHT.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={linkClass} style={linkStyle}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Central shopping bag — overflows pill top & bottom */}
          <a
            href="#"
            aria-label="Tienda"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          >
            <div className="relative">
              {/* Bag SVG */}
              <svg
                viewBox="0 0 100 120"
                className="h-[88px] w-[72px] md:h-[110px] md:w-[92px]"
                aria-hidden
              >
                {/* handle */}
                <path
                  d="M35 38 Q35 14 50 14 Q65 14 65 38"
                  fill="none"
                  stroke={RED}
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                {/* body */}
                <rect
                  x="14"
                  y="36"
                  width="72"
                  height="76"
                  rx="6"
                  fill={RED}
                />
              </svg>
              {/* tienda label */}
              <span
                className="animate-flicker absolute inset-0 flex items-center justify-center text-2xl md:text-3xl italic"
                style={{
                  fontFamily: "'Caveat', cursive",
                  color: CYAN,
                  textShadow:
                    "0 0 4px rgba(91,233,242,0.9), 0 0 10px rgba(91,233,242,0.7), 0 0 18px rgba(91,233,242,0.5)",
                  transform: "translateY(2px) rotate(-4deg)",
                }}
              >
                tienda
              </span>
            </div>
          </a>

          {/* Mobile: cart icon right */}
          <a
            href="#"
            className="rounded-full p-2 md:hidden"
            style={{ color: RED }}
            aria-label="Carrito"
          >
            <ShoppingBag className="h-5 w-5" />
          </a>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div
            className="mt-2 overflow-hidden rounded-2xl border-2 md:hidden"
            style={{ backgroundColor: YELLOW, borderColor: RED }}
          >
            <ul className="flex flex-col">
              {[...LINKS_LEFT, ...LINKS_RIGHT].map((l) => (
                <li key={l.href} className="border-b last:border-b-0" style={{ borderColor: `${RED}33` }}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-5 py-3 font-sans font-extrabold tracking-[0.18em]"
                    style={{ color: RED }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
