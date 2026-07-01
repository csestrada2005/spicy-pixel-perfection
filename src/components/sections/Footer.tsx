import { ArrowRight, Facebook, Instagram, Twitter } from "lucide-react";

import { Reveal } from "@/components/Reveal";

export function Footer() {
  return (
    <footer id="unete" className="bg-negro">
      <div className="mx-auto max-w-[1280px] px-4 pb-12">
        <Reveal>
          <div className="rounded-3xl bg-azul-footer p-8 text-negro md:p-12">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {/* Subscribe */}
            <div className="md:col-span-1">
              <h3 className="font-display text-3xl leading-tight tracking-wide text-[#0c2340] sm:text-4xl">
                SUSCRÍBETE
                <br />
                AL CLUB
              </h3>
              <img src="/logo-real.webp" alt="S-π-C Spicy" className="mt-3 h-16 w-auto rounded-xl shadow-md" />

              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-6 flex items-center gap-2 rounded-full bg-amarillo p-2 pl-5"
              >
                <input
                  type="email"
                  required
                  placeholder="correo electrónico"
                  className="flex-1 bg-transparent text-negro placeholder:text-negro/70 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Suscribirse"
                  className="grid h-10 w-10 place-items-center rounded-full bg-negro text-amarillo transition hover:scale-105"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider">Company</h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li><a href="#" className="hover:underline">Sobre nosotros</a></li>
                <li><a href="#" className="hover:underline">Contáctanos</a></li>
                <li><a href="#" className="hover:underline">Preguntas frecuentes</a></li>
                <li><a href="#reviews" className="hover:underline">Reseñas</a></li>
              </ul>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider">Links Rápidos</h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li><a href="#" className="hover:underline">Ubicacion de tiendas</a></li>
                <li><a href="#" className="hover:underline">Rastrear Pedido</a></li>
              </ul>
              <div className="mt-6 flex items-center gap-4 text-negro">
                <a href="#" aria-label="Facebook" className="inline-flex transition-transform duration-150 hover:-translate-y-0.5 hover:scale-110 hover:text-[#E11414]"><Facebook className="h-6 w-6" /></a>
                <a href="#" aria-label="Instagram" className="inline-flex transition-transform duration-150 hover:-translate-y-0.5 hover:scale-110 hover:text-[#E11414]"><Instagram className="h-6 w-6" /></a>
                <a href="#" aria-label="Twitter" className="inline-flex transition-transform duration-150 hover:-translate-y-0.5 hover:scale-110 hover:text-[#E11414]"><Twitter className="h-6 w-6" /></a>
              </div>
            </div>
          </div>
        </div>
        </Reveal>

        <p className="mt-6 text-center text-xs text-white/60">
          © {new Date().getFullYear()} S-π-C Spicy. Hecho en México con chile.
        </p>
      </div>
    </footer>
  );
}
