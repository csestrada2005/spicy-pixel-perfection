import { Instagram, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Reveal } from "@/components/Reveal";
import { CONTACT } from "@/config/contact";

const POLICIES = [
  { label: "Términos y condiciones", href: "/politicas" },
  { label: "Aviso de privacidad", href: "/aviso-privacidad" },
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
                <Link
                  to="/unete"
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-negro px-6 py-3 font-display text-sm tracking-widest text-amarillo transition-transform duration-150 hover:-translate-y-0.5"
                >
                  ÚNETE
                </Link>
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
