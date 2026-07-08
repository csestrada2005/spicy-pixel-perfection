## Objetivo
Acomodar el neón "SPICY" para que quede pegado justo debajo de las cards de Bestsellers (sin encimarse) y sin dejar un hueco negro grande antes de la sección de Instagram.

## Problema actual
Al quitar el `-my-16` del `NeonBanner`, la banda quedó bien pero ahora hay demasiado padding vertical entre Bestsellers → NeonBanner → InstagramFeed, provocando un bloque negro vacío grande.

## Cambios

1. **`src/components/sections/NeonBanner.tsx`**
   - Reducir el padding vertical del contenedor (`py-6 md:py-8` → algo mínimo tipo `py-2 md:py-3`) para que la banda ocupe solo el alto del PNG.
   - Mantener `overflow-hidden` y sin margen negativo para evitar encimar con las cards.

2. **`src/components/sections/Bestsellers.tsx`**
   - Revisar y, si hace falta, reducir el `padding-bottom` para que la banda quede pegada a las cards.

3. **`src/components/sections/InstagramFeed.tsx`**
   - Revisar y, si hace falta, reducir el `padding-top` para que la sección arranque inmediatamente después de la banda neón.

## Verificación
Iterar con Playwright en viewport 1280×1800 tomando screenshots del tramo Bestsellers → NeonBanner → InstagramFeed hasta que:
- La banda "SPICY" quede visualmente pegada debajo de las cards amarillas.
- No haya franja negra vacía notable arriba ni abajo de la banda.
- El título "PICANTE EN TU FEED" arranque con espaciado natural, sin hueco.
