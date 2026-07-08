import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Copy, Check, Loader2 } from "lucide-react";
import { NavBar } from "@/components/sections/NavBar";
import { Footer } from "@/components/sections/Footer";
import { ChileBackground } from "@/components/ChileBackground";
import { toast } from "sonner";
import { storefrontApiRequest } from "@/lib/shopify";

export const Route = createFileRoute("/unete")({
  head: () => ({
    meta: [
      { title: "Únete al Club · S-π-C" },
      {
        name: "description",
        content:
          "Regístrate y llévate 10% off en tu primera caja. Sé el primero en los sabores nuevos.",
      },
    ],
  }),
  component: Unete,
});

const DISCOUNT_CODE = "BIENVENIDA10";

const schema = z.object({
  name: z.string().trim().min(2, "Nombre muy corto").max(60),
  email: z.string().trim().email("Email inválido").max(120),
});

const CUSTOMER_CREATE = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer { id email }
      customerUserErrors { code message field }
    }
  }
`;

function Unete() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ name, email });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Datos inválidos");
      return;
    }
    setStatus("loading");
    try {
      // Registra al cliente en Shopify (acepta marketing). No bloquea si falla (email duplicado, etc.).
      const [firstName, ...rest] = parsed.data.name.split(" ");
      await storefrontApiRequest(CUSTOMER_CREATE, {
        input: {
          email: parsed.data.email,
          firstName: firstName || parsed.data.name,
          lastName: rest.join(" ") || undefined,
          password: `SPC-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`,
          acceptsMarketing: true,
        },
      }).catch(() => null);
      setStatus("done");
    } catch {
      // Aún así entregamos el código al usuario.
      setStatus("done");
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(DISCOUNT_CODE);
      setCopied(true);
      toast.success("Código copiado");
      setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("No se pudo copiar");
    }
  };

  return (
    <main className="min-h-screen bg-negro text-white">
      <NavBar />

      <section className="relative overflow-hidden bg-[#E11414] pt-28 pb-20 md:pt-32">
        <ChileBackground opacity={1} />

        <div className="relative z-10 mx-auto max-w-[720px] px-4">
          <header className="text-center">
            <h1
              className="animate-stamp font-display text-4xl tracking-wider text-white sm:text-6xl"
              style={{
                textShadow: "4px 4px 0 #FFD400, 5px 5px 0 #FFD400, 6px 6px 0 #FFD400",
              }}
            >
              ÚNETE AL CLUB
            </h1>
            <p className="mx-auto mt-4 max-w-md text-sm font-semibold text-white/90 sm:text-base">
              10% off en tu primera caja · sabores nuevos primero que nadie · sin spam.
            </p>
          </header>

          <div className="mt-10 rounded-3xl bg-amarillo-suave p-6 text-negro shadow-[8px_8px_0_#000] sm:p-8">
            {status !== "done" ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="font-display text-xs uppercase tracking-widest text-negro/70">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    maxLength={60}
                    placeholder="Tu nombre"
                    className="mt-1 w-full rounded-full border-2 border-negro bg-white px-5 py-3 text-negro placeholder:text-negro/40 focus:outline-none focus:ring-2 focus:ring-negro"
                  />
                </div>
                <div>
                  <label className="font-display text-xs uppercase tracking-widest text-negro/70">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    maxLength={120}
                    placeholder="tu@correo.com"
                    className="mt-1 w-full rounded-full border-2 border-negro bg-white px-5 py-3 text-negro placeholder:text-negro/40 focus:outline-none focus:ring-2 focus:ring-negro"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="font-display flex w-full items-center justify-center gap-2 rounded-full bg-negro py-4 text-lg tracking-widest text-amarillo transition hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "QUIERO MI DESCUENTO"
                  )}
                </button>
                <p className="text-center text-[11px] text-negro/60">
                  Al registrarte aceptas recibir novedades. Puedes cancelar cuando quieras.
                </p>
              </form>
            ) : (
              <div className="text-center">
                <p className="font-display text-2xl tracking-wide">¡BIENVENID@! 🌶️</p>
                <p className="mt-2 text-sm font-semibold text-negro/80">
                  Usa este código en el checkout para tu 10% de descuento:
                </p>
                <div className="mt-5 flex items-center justify-center gap-3">
                  <div className="font-display rounded-2xl border-4 border-dashed border-negro bg-white px-6 py-4 text-3xl tracking-widest sm:text-4xl">
                    {DISCOUNT_CODE}
                  </div>
                  <button
                    type="button"
                    onClick={copyCode}
                    aria-label="Copiar código"
                    className="grid h-12 w-12 place-items-center rounded-full bg-negro text-amarillo transition hover:-translate-y-0.5"
                  >
                    {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  </button>
                </div>
                <p className="mt-4 text-xs text-negro/60">
                  Aplicable a una compra por cliente.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
