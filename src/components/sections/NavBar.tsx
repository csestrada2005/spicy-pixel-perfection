import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCartStore } from "@/stores/cartStore";
import { CartDrawer } from "@/components/CartDrawer";
import { cartUI } from "@/lib/cart-toast";

function NavLink({
  href,
  className,
  style,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const internal = href.startsWith("/") && !href.startsWith("//");
  if (internal) {
    return (
      <Link to={href} className={className} style={style} onClick={onClick} preload="intent">
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} style={style} onClick={onClick}>
      {children}
    </a>
  );
}

const LINKS_LEFT = [
  { label: "SABORES", href: "/productos" },
  { label: "NOSOTROS", href: "/nosotros" },
  { label: "GALERIA", href: "/galeria" },
];
const LINKS_RIGHT = [
  { label: "ÚNETE", href: "/unete" },
  { label: "CONTACTO", href: "/contacto" },
];

const YELLOW = "#FFD400";
const RED = "#E11414";
const CYAN = "#5BE9F2";

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cartCount = useCartStore((s) =>
    s.items.reduce((n, i) => n + i.quantity, 0),
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass =
    "relative font-sans font-extrabold text-sm md:text-base tracking-[0.18em] transition-colors duration-150 after:pointer-events-none after:absolute after:-bottom-1 after:left-1/2 after:h-[3px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-[#E11414] after:transition-[width] after:duration-200 hover:after:w-full";
  const linkStyle = { color: RED } as const;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.65)]" : ""
      }`}
    >
      <div className="mx-auto max-w-[1280px] px-3 pt-4 pb-2">
        <nav
          className="relative flex items-center justify-between rounded-full px-4 py-3 md:px-8 md:py-3"
          style={{ backgroundColor: YELLOW, border: `2px solid ${RED}` }}
        >
          <button
            type="button"
            className="rounded-full p-2 md:hidden"
            style={{ color: RED }}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <ul className="hidden flex-1 items-center justify-around gap-6 md:flex">
            {LINKS_LEFT.map((l) => (
              <li key={l.href}>
                <NavLink href={l.href} className={linkClass} style={linkStyle}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden w-28 shrink-0 md:block" aria-hidden />

          <ul className="hidden flex-1 items-center justify-around gap-6 md:flex">
            {LINKS_RIGHT.map((l) => (
              <li key={l.href}>
                <NavLink href={l.href} className={linkClass} style={linkStyle}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label="Tienda"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          >
            <div className="relative">
              <svg
                viewBox="0 0 100 120"
                className="h-[88px] w-[72px] md:h-[110px] md:w-[92px]"
                aria-hidden
              >
                <path
                  d="M35 38 Q35 14 50 14 Q65 14 65 38"
                  fill="none"
                  stroke={RED}
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                <rect x="14" y="36" width="72" height="76" rx="6" fill={RED} />
              </svg>
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
          </button>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative rounded-full p-2"
            style={{ color: RED }}
            aria-label={`Carrito (${cartCount})`}
          >
            <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" />
            {cartCount > 0 && (
              <span
                className="absolute -right-0.5 -top-0.5 grid h-4 w-4 min-w-4 place-items-center rounded-full px-1 text-[10px] font-black leading-none text-white md:h-5 md:w-5 md:text-[11px]"
                style={{ backgroundColor: RED }}
                aria-hidden
              >
                {cartCount}
              </span>
            )}
          </button>
        </nav>

        {open && (
          <div
            className="mt-2 overflow-hidden rounded-2xl border-2 md:hidden"
            style={{ backgroundColor: YELLOW, borderColor: RED }}
          >
            <ul className="flex flex-col">
              {[...LINKS_LEFT, ...LINKS_RIGHT].map((l) => (
                <li
                  key={l.href}
                  className="border-b last:border-b-0"
                  style={{ borderColor: `${RED}33` }}
                >
                  <NavLink
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-5 py-3 font-sans font-extrabold tracking-[0.18em]"
                    style={{ color: RED }}
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
