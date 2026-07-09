import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

import { ChileBackground } from "../components/ChileBackground";
import { NavBar } from "../components/sections/NavBar";
import { Footer } from "../components/sections/Footer";
import { Toaster } from "sonner";
import { useCartSync } from "../hooks/useCartSync";

function NotFoundComponent() {
  return (
    <>
    <NavBar />
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#E11414] px-4 pt-32 pb-24 text-white">

      {/* Patrón de chiles negros sobre fondo rojo (identidad de marca) */}
      <ChileBackground />
      <div className="relative z-10 max-w-lg text-center">
        {/* Chile triste */}
        <div className="mx-auto text-7xl sm:text-8xl" aria-hidden>
          🌶️😢
        </div>
        <h1
          className="animate-stamp font-display mt-4 text-6xl tracking-wider sm:text-8xl"
          style={{
            textShadow: "4px 4px 0 #FFD400, 5px 5px 0 #FFD400, 6px 6px 0 #FFD400",
          }}
        >
          404
        </h1>
        <h2 className="font-display mt-2 text-2xl tracking-wide sm:text-3xl">
          TE PERDISTE EL SABOR
        </h2>
        <p className="mx-auto mt-3 max-w-sm font-sans text-base font-semibold text-white/90">
          Esta página no existe o se la comieron. Regresa a lo bueno.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="rounded-full bg-amarillo px-7 py-3.5 font-display text-base tracking-widest text-negro shadow-[6px_6px_0px_#CA8A04] transition-transform duration-150 hover:-translate-y-0.5"
          >
            INICIO
          </Link>
          <Link
            to="/productos"
            className="rounded-full bg-negro px-7 py-3.5 font-display text-base tracking-widest text-amarillo shadow-[6px_6px_0px_#CA8A04] transition-transform duration-150 hover:-translate-y-0.5"
          >
            VER SABORES
          </Link>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}


function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "S-π-C Spicy — Dulces Enchilados Mexicanos" },
      {
        name: "description",
        content: "Dulces enchilados intensos y adictivos. Cargados de chile, chamoy y sabor auténtico. Hechos a mano en México.",
      },
      { property: "og:title", content: "S-π-C Spicy — Dulces Enchilados Mexicanos" },
      {
        property: "og:description",
        content: "Dulces enchilados intensos y adictivos. Cargados de chile, chamoy y sabor auténtico. Hechos a mano en México.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "S-π-C Spicy — Dulces Enchilados Mexicanos" },
      {
        name: "twitter:description",
        content: "Dulces enchilados intensos y adictivos. Cargados de chile, chamoy y sabor auténtico. Hechos a mano en México.",
      },
      {
        property: "og:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/2e059ff4-83f3-44cd-820a-5f207ae96738",
      },
      {
        name: "twitter:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/2e059ff4-83f3-44cd-820a-5f207ae96738",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/logo-square.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/logo-square.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800;900&family=Caveat:wght@700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useCartSync();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster
        position="top-center"
        toastOptions={{
          unstyled: true,
          className: "!bg-transparent !border-0 !p-0 !shadow-none",
        }}
      />
    </QueryClientProvider>
  );
}
