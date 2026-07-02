import { createFileRoute } from "@tanstack/react-router";
import { NavBar } from "@/components/sections/NavBar";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChileBackground } from "@/components/ChileBackground";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Preguntas frecuentes · S-π-C" },
      {
        name: "description",
        content:
          "Todo lo que necesitas saber: picante, ingredientes, envíos, devoluciones y mayoreo.",
      },
    ],
  }),
  component: Faq,
});

// Respuestas DRAFT entre corchetes — reemplazables tras la junta.
const FAQS = [
  {
    q: "¿Qué tan pican?",
    a: "[Nivel/descripción del picante: del suave al bien enchilado].",
  },
  {
    q: "¿Qué ingredientes tienen? ¿Alérgenos?",
    a: "[Lista de ingredientes y alérgenos — pendiente].",
  },
  {
    q: "¿A dónde envían y en cuánto llegan?",
    a: "[Zonas de envío y tiempos de entrega].",
  },
  {
    q: "¿Puedo devolver?",
    a: "[Política de cambios y devoluciones].",
  },
  {
    q: "¿Venden mayoreo?",
    a: "[Sí/No + datos de contacto para pedidos de mayoreo].",
  },
  {
    q: "¿Todos pican?",
    a: "No: Lemon Mint y las versiones deshidratadas son sin chile.",
  },
];

function Faq() {
  return (
    <main className="min-h-screen bg-negro text-white">
      <NavBar />

      <section className="relative overflow-hidden bg-[#E11414] pt-28 pb-16 md:pt-32">
        <ChileBackground />
        <div className="relative z-10 mx-auto max-w-[900px] px-4 text-center">
          <h1
            className="animate-stamp font-display text-5xl tracking-wider text-white sm:text-7xl"
            style={{
              textShadow: "4px 4px 0 #FFD400, 5px 5px 0 #FFD400, 6px 6px 0 #FFD400",
            }}
          >
            PREGUNTAS FRECUENTES
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-sans text-base font-semibold text-white/90 sm:text-lg">
            Lo que más nos preguntan antes de picar.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[820px] px-4 py-14 md:py-16">
        <Reveal>
          <div className="rounded-3xl bg-amarillo-suave px-6 py-4 text-negro shadow-[6px_6px_0px_#CA8A04] md:px-8">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((item, i) => (
                <AccordionItem key={item.q} value={`item-${i}`} className="border-negro/15">
                  <AccordionTrigger className="font-display text-lg tracking-wide hover:no-underline sm:text-xl">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-sans text-base text-negro/80">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
