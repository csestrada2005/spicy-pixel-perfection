import { createFileRoute } from "@tanstack/react-router";
import { NavBar } from "@/components/sections/NavBar";
import { Footer } from "@/components/sections/Footer";
import { ChileBackground } from "@/components/ChileBackground";
import { CONTACT } from "@/config/contact";

export const Route = createFileRoute("/politicas")({
  head: () => ({
    meta: [
      { title: "Políticas · S-π-C" },
      {
        name: "description",
        content:
          "Envíos, devoluciones, términos y aviso de privacidad de S-π-C Spicy.",
      },
    ],
  }),
  component: Politicas,
});

const UPDATED = "Última actualización: julio 2026";

function Politicas() {
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
            POLÍTICAS
          </h1>
          <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-white/80">
            {UPDATED}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[900px] px-4 py-14">
        <article className="space-y-12 text-white/90">
          <Block id="envios" title="Envíos y entregas">
            <p>
              Realizamos envíos a toda la República Mexicana mediante paqueterías reconocidas
              (Estafeta, DHL, FedEx). Los pedidos se procesan en un plazo de 1 a 3 días
              hábiles después de confirmar el pago.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-6 text-sm">
              <li>Zona metropolitana: 2 a 4 días hábiles.</li>
              <li>Resto de México: 3 a 7 días hábiles.</li>
              <li>Recibirás un número de guía por correo una vez enviado tu pedido.</li>
              <li>Envíos internacionales bajo cotización — contáctanos por WhatsApp.</li>
            </ul>
          </Block>

          <Block id="devoluciones" title="Cambios y devoluciones">
            <p>
              Aceptamos cambios y devoluciones dentro de los <strong>15 días naturales</strong>{" "}
              posteriores a la entrega, siempre que el producto se encuentre{" "}
              <strong>sellado, sin abrir</strong> y en su empaque original.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-6 text-sm">
              <li>Por tratarse de un producto alimenticio, no se aceptan devoluciones de cajas abiertas.</li>
              <li>Si tu pedido llegó dañado, envíanos fotos a {CONTACT.email} en las primeras 48 horas.</li>
              <li>Los costos de envío de la devolución corren por cuenta del cliente, salvo error nuestro.</li>
            </ul>
          </Block>

          <Block id="terminos" title="Términos y condiciones">
            <p>
              Al realizar una compra en s-pi-c.com aceptas nuestros términos. Los precios están
              expresados en pesos mexicanos (MXN) e incluyen IVA. Nos reservamos el derecho de
              modificar precios, disponibilidad y descripciones sin previo aviso.
            </p>
            <p className="mt-3 text-sm text-white/70">
              Las imágenes son ilustrativas. El producto puede variar ligeramente por lote de
              producción sin afectar sus características ni calidad.
            </p>
          </Block>

          <Block id="privacidad" title="Aviso de privacidad">
            <p>
              S-π-C recolecta datos personales (nombre, correo, dirección, teléfono) con el único
              fin de procesar tu pedido, enviar tus productos y, si lo autorizas, mantenerte
              informado de novedades y promociones.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-6 text-sm">
              <li>Los pagos se procesan a través de Shopify Payments y proveedores certificados; no almacenamos datos de tarjeta.</li>
              <li>Puedes solicitar acceso, rectificación o eliminación de tus datos escribiendo a {CONTACT.email}.</li>
              <li>No compartimos tu información con terceros ajenos al servicio del pedido.</li>
            </ul>
          </Block>

          <Block id="cookies" title="Cookies">
            <p>
              Este sitio usa cookies necesarias para el carrito, el checkout y estadísticas
              anónimas de uso. Al continuar navegando aceptas su uso.
            </p>
          </Block>

          <p className="text-center text-xs text-white/50">
            Esta política aplica desde México · Dudas: {CONTACT.email}
          </p>
        </article>
      </section>

      <Footer />
    </main>
  );
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="font-display text-2xl tracking-wide text-amarillo sm:text-3xl">
        {title.toUpperCase()}
      </h2>
      <div className="mt-3 text-sm leading-relaxed sm:text-base">{children}</div>
    </section>
  );
}
