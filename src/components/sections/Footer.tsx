import { ArrowRight, Instagram, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { Reveal } from "@/components/Reveal";
import { CONTACT } from "@/config/contact";

const POLICIES = [
  { label: "Envíos y entregas", href: "/politicas", hash: "envios" },
  { label: "Cambios y devoluciones", href: "/politicas", hash: "devoluciones" },
  { label: "Términos y condiciones", href: "/politicas", hash: "terminos" },
  { label: "Aviso de privacidad", href: "/politicas", hash: "privacidad" },
];

const EXPLORE = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Sabores", href: "/productos" },
  { label: "Galería", href: "/galeria" },
  { label: "Contacto", href: "/contacto" },
  { label: "Preguntas frecuentes", href: "/faq" },
];

export function Footer() {
  return (
    <footer id="unete" className="bg-negro">
      <div className="mx-auto max-w-[1280px] px-4 pb-12">
        <Reveal>
          <div className="rounded-3xl bg-azul-footer p-8 text-negro md:p-12">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
              {/* Únete al club */}
              <div className="md:col-span-1">
                <h3 className="font-display text-3xl leading-tight tracking-wide text-[#0c2340] sm:text-4xl">
                  ÚNETE
                  <br />
                  AL CLUB
                </h3>
                <p className="mt-3 text-sm font-semibold text-negro/80">
                  Sé el primero en los nuevos sabores — [descuento de bienvenida].
                </p>

                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="mt-5 flex items-center gap-2 rounded-full bg-amarillo p-2 pl-5"
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

              {/* Explora */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider">Explora</h4>
                <ul className="mt-4 space-y-3 text-sm">
                  {EXPLORE.map((l) => (
                    <li key={l.href}>
                      <Link to={l.href} className="hover:underline">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Políticas */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider">Políticas</h4>
                <ul className="mt-4 space-y-3 text-sm">
                  {POLICIES.map((l) => (
                    <li key={l.href}>
                      {/* Rutas creadas en Fase 3 — enlace directo por ahora. */}
                      <a href={l.href} className="hover:underline">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contacto + redes */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider">Contacto</h4>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>
                    <Link to="/contacto" className="hover:underline">
                      Escríbenos
                    </Link>
                  </li>
                  <li>
                    <a
                      href={CONTACT.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      WhatsApp
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${CONTACT.email}`} className="hover:underline">
                      {CONTACT.email}
                    </a>
                  </li>
                </ul>
                <div className="mt-6 flex items-center gap-4 text-negro">
                  <a
                    href={CONTACT.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="inline-flex transition-transform duration-150 hover:-translate-y-0.5 hover:scale-110 hover:text-[#E11414]"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="inline-flex transition-transform duration-150 hover:-translate-y-0.5 hover:scale-110 hover:text-[#E11414]"
                  >
                    <MessageCircle className="h-6 w-6" />
                  </a>
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
