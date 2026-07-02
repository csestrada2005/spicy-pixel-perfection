import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { NavBar } from "@/components/sections/NavBar";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/Reveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ASSETS } from "@/config/assets";
import { CONTACT } from "@/config/contact";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto · S-π-C" },
      {
        name: "description",
        content: "¿Dudas, mayoreo o solo saludar? Escríbenos por WhatsApp, Instagram o correo.",
      },
    ],
  }),
  component: Contacto,
});

function Contacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: conectar backend (Formspree/Shopify/email).
    // Stub: por ahora registramos en consola y abrimos el cliente de correo.
    console.log("Contacto S-π-C:", { nombre, email, mensaje });
    const subject = encodeURIComponent(`Contacto S-π-C — ${nombre}`);
    const body = encodeURIComponent(`${mensaje}\n\n— ${nombre} (${email})`);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setEnviado(true);
  };

  const contactLinks = [
    { label: "WhatsApp", href: CONTACT.whatsapp, Icon: MessageCircle },
    { label: "Instagram", href: CONTACT.instagram, Icon: Instagram },
    { label: "Correo", href: `mailto:${CONTACT.email}`, Icon: Mail },
  ];

  return (
    <main className="min-h-screen bg-negro text-white">
      <NavBar />

      <section className="relative overflow-hidden bg-[#E11414] pt-28 pb-16 md:pt-32">
        <div
          aria-hidden
          className="animate-bg-drift absolute inset-0 bg-repeat opacity-90"
          style={{
            backgroundImage: `url(${ASSETS.chilePatternBlack})`,
            backgroundSize: "360px 480px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[900px] px-4 text-center">
          <h1
            className="animate-stamp font-display text-5xl tracking-wider text-white sm:text-7xl"
            style={{
              textShadow: "4px 4px 0 #FFD400, 5px 5px 0 #FFD400, 6px 6px 0 #FFD400",
            }}
          >
            CONTACTO
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-sans text-base font-semibold text-white/90 sm:text-lg">
            ¿Dudas, mayoreo o solo antojito? Aquí andamos.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1000px] px-4 py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          {/* Formulario */}
          <Reveal className="md:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-amarillo-suave p-6 text-negro shadow-[6px_6px_0px_#CA8A04] md:p-8"
            >
              <h2 className="font-display text-2xl tracking-wide">ESCRÍBENOS</h2>

              <label className="mt-5 block text-sm font-bold uppercase tracking-wider">
                Nombre
                <Input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  placeholder="Tu nombre"
                  className="mt-1 border-negro/20 bg-white text-negro placeholder:text-negro/40"
                />
              </label>

              <label className="mt-4 block text-sm font-bold uppercase tracking-wider">
                Email
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="tu@correo.com"
                  className="mt-1 border-negro/20 bg-white text-negro placeholder:text-negro/40"
                />
              </label>

              <label className="mt-4 block text-sm font-bold uppercase tracking-wider">
                Mensaje
                <Textarea
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  required
                  rows={5}
                  placeholder="Cuéntanos qué se te antoja…"
                  className="mt-1 border-negro/20 bg-white text-negro placeholder:text-negro/40"
                />
              </label>

              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-negro px-8 py-4 font-display text-lg tracking-widest text-amarillo transition-transform duration-150 hover:-translate-y-0.5"
              >
                ENVIAR MENSAJE
              </button>

              {enviado && (
                <p className="mt-3 text-center text-sm font-semibold text-negro/70">
                  ¡Gracias! Abrimos tu correo para terminar de enviar. 🌶️
                </p>
              )}
            </form>
          </Reveal>

          {/* Links directos */}
          <Reveal delay={120} className="md:col-span-2">
            <div className="flex h-full flex-col justify-center gap-4">
              <h2 className="font-display text-2xl tracking-wide text-amarillo">O POR AQUÍ</h2>
              {contactLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl bg-[#1a1a1a] px-5 py-4 font-sans font-bold tracking-wide text-white shadow-[4px_4px_0px_#CA8A04] transition-transform duration-150 hover:-translate-y-0.5"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-amarillo text-negro">
                    <Icon className="h-5 w-5" />
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
