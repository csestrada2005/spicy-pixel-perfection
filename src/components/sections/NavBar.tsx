import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { ASSETS, SHOPIFY_CART_URL } from "@/config/assets";

const LINKS = [
  { label: "SABORES", href: "#sabores" },
  { label: "GALERIA", href: "#galeria" },
  { label: "REVIEWS", href: "#reviews" },
  { label: "ÚNETE", href: "#unete" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);
  const cartHref = SHOPIFY_CART_URL || "#";

  return (
    <header className="sticky top-0 z-50 bg-negro/90 backdrop-blur">
      <div className="mx-auto max-w-[1280px] px-3 py-3">
        <nav className="flex items-center justify-between rounded-full border-2 border-amarillo bg-negro px-4 py-2 shadow-[0_0_18px_rgba(244,197,24,0.35)]">
          {/* Desktop links left */}
          <ul className="hidden flex-1 items-center justify-around md:flex">
            {LINKS.slice(0, 2).map((l) => (
              <li key={l.href}>
                <a href={l.href} className="font-display text-sm tracking-widest text-white hover:text-amarillo">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Center logo / cart */}
          <a href={cartHref} target={SHOPIFY_CART_URL ? "_blank" : undefined} rel="noopener noreferrer" className="relative mx-3 flex items-center gap-2">
            <img src={ASSETS.logoSmall} alt="S-π-C tienda" className="h-9 w-auto md:h-11" />
            <span className="sr-only">Ir a la tienda</span>
            <ShoppingBag className="hidden h-5 w-5 text-amarillo md:block" />
          </a>

          <ul className="hidden flex-1 items-center justify-around md:flex">
            {LINKS.slice(2).map((l) => (
              <li key={l.href}>
                <a href={l.href} className="font-display text-sm tracking-widest text-white hover:text-amarillo">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            type="button"
            className="rounded-full p-2 text-amarillo md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Abrir menú"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {open && (
          <ul className="mt-2 flex flex-col gap-1 rounded-2xl border border-amarillo/40 bg-negro p-3 md:hidden">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 font-display tracking-widest text-white hover:bg-amarillo/10"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}
