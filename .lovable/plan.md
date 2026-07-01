## Problema 1 — Calidad del splash al escalarlo

El splash se ve pixelado al ampliarlo. En vez de sólo subir opacidad (que apaga la imagen), combinar varios efectos que "esconden" la pérdida de nitidez sin matar el impacto visual:

**Opciones (elegir combinación):**

- **A. Opacidad + blend**: bajar `opacity-95` → `opacity-80` y añadir `mix-blend-screen` o `mix-blend-lighten` sobre el negro. Los pixeles duros se funden con el fondo.
- **B. Blur sutil global**: `filter: blur(1px) saturate(1.15) contrast(1.05)`. 1px es imperceptible como blur pero suaviza artefactos de escalado; saturación/contraste compensan el "lavado".
- **C. Grano/ruido encima**: capa `::after` con textura de noise SVG a `opacity-20 mix-blend-overlay`. El ruido rompe los bloques de pixels y da textura "editorial".
- **D. Reforzar el glow radial**: subir el `radial-gradient` central (más rojo/naranja saturado) para que la mirada vaya al centro luminoso y no a los bordes escalados.
- **E. Vignette más agresiva**: ampliar la máscara radial (`closest-side, #000 60%` en vez de `78%`) para desvanecer más los bordes donde más se nota el pixelado.

**Recomendación:** aplicar **B + C + E** juntos. Es lo que da mejor resultado sin apagar la imagen. Si aún se ve mal, sumar A.

---

## Problema 2 — La franja diagonal (`animate-hero-sweep`) se corta al hacer scroll

Es el `linear-gradient` con `mix-blend-screen` que barre la sección. Su contenedor termina donde termina `<HeroBackdrop>` (dentro del `<section>` del Hero), y al hacer scroll queda una línea flotante fea antes del marquee rojo.

**Opciones:**

1. **Quitar el sweep por completo** — la solución más limpia; el splash ya tiene glow + breathing, no lo necesita.
2. **Enmascarar el sweep con el mismo `bottom-fade**` — mover el `<div>` del fundido negro DESPUÉS del sweep en el DOM (ahora está después, pero el sweep usa `mix-blend-screen` que ignora el fade). Solución: aplicar la misma máscara radial/vertical al propio div del sweep con `WebkitMaskImage` para que se desvanezca antes del borde inferior del Hero.
3. **Extender el sweep hasta el marquee** — el marquee vive fuera del `<section>` del Hero. Habría que mover el `HeroBackdrop` a un contenedor padre que englobe Hero + Marquee, o duplicar el efecto. Más invasivo y no recomendado.

**Recomendación:** **Opción 2** — mantener el efecto (le da vida al fondo) pero enmascararlo verticalmente para que muera antes del borde del Hero. Cambio mínimo: añadir `maskImage: linear-gradient(to bottom, #000 0%, #000 60%, transparent 90%)` al div del sweep. Si el usuario prefiere lo más simple, ir por la **Opción 1**.

---

## Archivos afectados

- `src/components/HeroBackdrop.tsx` — únicos cambios, contenidos en el splash `<img>` y el div del sweep.
- `src/styles.css` — sin cambios (las animaciones ya existen).

## Preguntas antes de implementar

1. Para el splash: ¿voy con la combinación B+C+E, o prefieres empezar sólo con opacidad + blur (más conservador)? Aplica tu idea
2. Para el sweep: ¿lo quito completamente (Opción 1) o lo enmascaro para que se desvanezca dentro del Hero (Opción 2)? Enmascaralo.