import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { ASSETS } from "@/config/assets";

const LINKS_LEFT = [
  { label: "SABORES", href: "#sabores" },
  { label: "GALERIA", href: "#galeria" },
];
const LINKS_RIGHT = [
  { label: "REVIEWS", href: "#reviews" },
  { label: "ÚNETE", href: "#unete" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkBase =
    "font-display text-sm tracking-widest text-white transition-all duration-200 hover:text-[#fffbe0]";
  const linkHover =
    "hover:drop-shadow-[0_0_6px_rgba(255,232,61,0.55)] hover:drop-shadow-[0_0_12px_rgba(255,232,61,0.35)]";

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.65)]" : ""
      }`}
    >
      <div className="mx-auto max-w-[1280px] px-3 py-3">
        {/* Pill */}
        <nav className="flex items-center justify-between rounded-full border border-white/10 bg-negro/95 px-4 py-2 backdrop-blur md:px-6">
          {/* Mobile: hamburger left */}
          <button
            type="button"
            className="rounded-full p-2 text-white transition hover:text-amarillo md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Desktop: left links */}
          <ul className="hidden flex-1 items-center justify-center gap-8 md:flex">
            {LINKS_LEFT.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={`${linkBase} ${linkHover}`}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Center logo */}
          <a
            href="#"
            className="flex flex-shrink-0 items-center justify-center md:mx-6"
          >
            <img
              src={ASSETS.logoSmall}
              alt="S-π-C"
              className="h-10 w-auto md:h-14"
            />
          </a>

          {/* Desktop: right links */}
          <ul className="hidden flex-1 items-center justify-center gap-8 md:flex">
            {LINKS_RIGHT.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={`${linkBase} ${linkHover}`}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile: cart icon right */}
          <a
            href="#"
            className="rounded-full p-2 text-white transition hover:text-amarillo md:hidden"
            aria-label="Carrito"
          >
            <ShoppingBag className="h-5 w-5" />
          </a>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-negro/95 backdrop-blur md:hidden">
            <ul className="flex flex-col divide-y divide-white/5">
              {[...LINKS_LEFT, ...LINKS_RIGHT].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-5 py-3 font-display tracking-widest text-white transition hover:bg-white/5 hover:text-amarillo"
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
