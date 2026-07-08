import { createFileRoute } from "@tanstack/react-router";
import { NavBar } from "@/components/sections/NavBar";
import { Footer } from "@/components/sections/Footer";
import { ChileBackground } from "@/components/ChileBackground";

export const Route = createFileRoute("/aviso-privacidad")({
  head: () => ({
    meta: [
      { title: "Aviso de privacidad · S-π-C" },
      {
        name: "description",
        content:
          "Aviso de privacidad de S-π-C Spicy: qué datos recolectamos, cómo los usamos y tus derechos ARCO.",
      },
      { property: "og:title", content: "Aviso de privacidad · S-π-C" },
      {
        property: "og:description",
        content: "Cómo tratamos tus datos personales en S-π-C Spicy.",
      },
    ],
  }),
  component: AvisoPrivacidad,
});

const UPDATED = "Última actualización: julio 2026";

function AvisoPrivacidad() {
  return (
    <main className="min-h-screen bg-negro text-white">
      <NavBar />

      <section className="relative overflow-hidden bg-[#E11414] pt-28 pb-14 md:pt-32">
        <ChileBackground opacity={1} />
        <div className="relative z-10 mx-auto max-w-[900px] px-4 text-center">
          <h1
            className="animate-stamp font-display text-4xl tracking-wider text-white sm:text-6xl"
            style={{
              textShadow: "4px 4px 0 #FFD400, 5px 5px 0 #FFD400, 6px 6px 0 #FFD400",
            }}
          >
            AVISO DE PRIVACIDAD
          </h1>
          <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-white/80">
            {UPDATED}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[900px] px-4 py-14">
        <article className="space-y-10 text-white/90">
          <Block title="Responsable">
            <p>
              S-π-C Spicy (“nosotros”) es responsable del tratamiento de tus datos personales
              recabados a través de este sitio.
            </p>
          </Block>

          <Block title="Datos que recolectamos">
            <ul className="mt-1 list-disc space-y-1 pl-6 text-sm">
              <li>Nombre, correo electrónico, dirección de envío y teléfono.</li>
              <li>Datos de pedido y preferencias de producto.</li>
              <li>Información técnica anónima de navegación (cookies necesarias).</li>
            </ul>
          </Block>

          <Block title="Finalidades">
            <ul className="mt-1 list-disc space-y-1 pl-6 text-sm">
              <li>Procesar, enviar y dar seguimiento a tu pedido.</li>
              <li>Atender dudas, quejas o solicitudes de mayoreo.</li>
              <li>Enviar novedades o promociones si otorgaste tu consentimiento.</li>
            </ul>
          </Block>

          <Block title="Transferencias">
            <p>
              No compartimos tu información con terceros ajenos al servicio del pedido. Los pagos
              se procesan mediante proveedores certificados (Shopify Payments); no almacenamos
              datos de tarjeta.
            </p>
          </Block>

          <Block title="Derechos ARCO">
            <p>
              Puedes solicitar el acceso, rectificación, cancelación u oposición al tratamiento
              de tus datos escribiéndonos por WhatsApp o Instagram desde nuestra{" "}
              <a href="/contacto" className="text-amarillo hover:underline">
                página de contacto
              </a>
              .
            </p>
          </Block>

          <Block title="Cambios al aviso">
            <p>
              Este aviso puede actualizarse. Publicaremos cualquier cambio en esta misma página
              con su fecha de actualización.
            </p>
          </Block>
        </article>
      </section>

      <Footer />
    </main>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl tracking-wide text-amarillo sm:text-3xl">
        {title.toUpperCase()}
      </h2>
      <div className="mt-3 text-sm leading-relaxed sm:text-base">{children}</div>
    </section>
  );
}
