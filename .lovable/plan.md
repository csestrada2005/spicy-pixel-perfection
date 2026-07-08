## Objetivo

Cerrar el diseño de S-π-C: catálogo dinámico desde Shopify limitado a Gummies Duo (caja Display de 24), páginas de producto, galería con las 4 fotos reales, nueva página "Únete", reescritura de nosotros/políticas, mejor toast del carrito, hero con productos reales, y pulido mobile. Reglas de picante: solo empaques que dicen "Spicy" tienen chile (todos los Gummies Duo lo dicen → todos con chile, sin niveles).

## Cambios por área

### 1. Catálogo dinámico desde Shopify (fuente de verdad)

- Crear `src/lib/shopify-catalog.ts` con query GraphQL que trae `products(first: 20, query: "product_type:'Gummies Duo'")` con: `title`, `handle`, `descriptionHtml`, `images(first: 10)`, `featuredImage`, `priceRange`, `variants(first: 5)` (id, title, price, availableForSale, selectedOptions).
- Envolver con TanStack Query (`useQuery` client-side, `staleTime: 5min`) en un hook `useShopifyProducts()` y `useShopifyProduct(handle)`.
- Cambios de nombre/precio/imagen en Shopify se reflejan sin tocar código.
- Retirar `src/config/products.ts` y `src/config/catalog.ts` del flujo (dejar solo mapa opcional handle → asset local como fallback visual si Shopify aún no carga).

### 2. Lógica "caja Display de 24"

- En la card y en la product page mostrar: precio de Shopify + etiqueta "Caja Display · 24 empaques de 90 g".
- La cantidad enviada al carrito sigue siendo 1 (1 variante = 1 Display); no se venden empaques sueltos.
- Copy explicativo en product page: "Cada caja contiene 24 empaques individuales de 90 g listos para consumir o regalar."

### 3. Página `/productos` (solo Gummies Duo)

- Reescribir para consumir el hook y renderizar los 15 Gummies Duo reales.
- Eliminar líneas Nebulas / Baked Gummies / Organic Fruits del UI (siguen en Shopify pero ocultos).
- Quitar el "SpicyMeter" (niveles) y reemplazar por un badge fijo "🌶 SPICY" en cada card.
- Estado de carga con skeletons; estado vacío con mensaje.
- Mobile: grid 2 col con gap reducido, tipografía escalada, cards más compactos.

### 4. Páginas de producto `/producto/$handle`

- Nueva ruta dinámica `src/routes/producto.$handle.tsx`.
- Layout: galería de imágenes izquierda / info derecha (mobile: stack).
- Info: nombre, precio, badge Spicy, descripción (de Shopify), bloque "Caja Display · 24 x 90 g", ingredientes/nutrimental resumidos desde Shopify description, botón grande "AÑADIR AL CARRITO", link "Ver todos los sabores".
- `head()` dinámico con título, descripción y `og:image` de `featuredImage`.
- Link desde cada `ProductCard` y desde los productos del hero.

### 5. Hero con productos reales

- `Hero.tsx`: sustituir imágenes decorativas por 3 productos destacados (handles fijos: `mixed-berries`, `cherry-lemon`, `pina-colada` — ajustables) traídos de Shopify.
- Cada bolsa del hero es un `<Link to="/producto/$handle">` que abre la product page real.

### 6. Componente ProductCard

- Simplificar: quitar niveles de chile y `SpicyMeter`.
- Card entera clickable → product page; el botón "COMPRAR" añade al carrito sin navegar (stopPropagation).
- Ajustes mobile: max-width fluido, padding reducido en `< sm`.

### 7. Toast del carrito (bonito, on-brand)

- Reemplazar el toast por defecto de `sonner` por uno custom: fondo `amarillo-suave`, borde negro, shadow amarilla dura, tipografía display, mini-thumb del producto añadido, botón "Ver carrito" que abre el drawer.
- Configurar `<Toaster position="top-center">` con estilos custom (evitar bottom-right).

### 8. Galería `/galeria`

- Borrar assets viejos referenciados en la galería.
- Usar solo las 4 imágenes de `public/gallery/*.jpeg` (rutas absolutas `/gallery/...`).
- Grid 2x2 en desktop, 1 col en mobile, con lightbox básico al click.

### 9. Página `/nosotros` (nueva historia)

- Reescribir con historia creíble corta: marca mexicana familiar, obsesión por el balance dulce-picante, hechos a mano, expansión desde puestos locales a distribución nacional. 3 bloques: Origen · Producto · Promesa. Sin datos fabricados verificables (sin fechas, sin cifras).

### 10. Página `/politicas` (nueva)

- Nueva ruta con template estándar de tienda: Envíos, Devoluciones, Términos, Privacidad, Cookies.
- Contenido genérico neutral tomado de plantilla estándar (envíos 3-7 días, cambios en 15 días para producto no perecedero sellado, etc.). Marcar "Última actualización" y nota de que aplica desde México.
- Link en el footer.

### 11. Página `/unete` (email + descuento)

- Nueva ruta con formulario (nombre + email + zod validation).
- Flujo recomendado: crear un **Price Rule + Discount Code fijo** en Shopify (ej. `BIENVENIDA10`, 10% off, once per customer) — se crea 1 sola vez con las tools de Shopify y se reutiliza para todos.
- Al enviar el form: se muestra el código en pantalla + se envía por email vía Lovable Cloud (requiere habilitar Cloud + email domain). Alternativa simple si no quieres Cloud: mostrar el código directo en pantalla al suscribirse y guardar el email en Shopify Customers (via Storefront `customerCreate`) para que Shopify Email lo capture.
- **Decisión requerida** (ver preguntas más abajo).

### 12. Eliminar Reviews

- Borrar `src/components/sections/Reviews.tsx` y su uso en `index.tsx`.

### 13. NavBar / Footer

- Reemplazar link "Reviews" por "Únete" en NavBar y Footer.
- Footer: agregar link a "Políticas".
- Mobile menu: revisar espaciado y tap targets ≥ 44px.

### 14. Pulido mobile general

- Auditar Hero, Marquee, NeonBanner, Bestsellers, product grid: usar patrón `grid-cols-[minmax(0,1fr)_auto]` donde aplique, `min-w-0`, `truncate`, `shrink-0`, tipografías responsive.
- Reducir animaciones costosas en `< md` (float, chili-pop) para performance.

## Detalles técnicos

- **Hook de datos**: TanStack Query ya está en el stack. `queryKey: ['shopify-products', 'gummies-duo']`. Usar `storefrontApiRequest` existente.
- **Filtro Shopify**: `query: "product_type:Gummies Duo"` (comillas escapadas en GraphQL variable).
- **Ruta dinámica**: convención TanStack `src/routes/producto.$handle.tsx`, params via `Route.useParams()`.
- **Toast custom**: `toast.custom((t) => <JSX/>)` de sonner + `richColors={false}`.
- **Email/descuento**: usar `shopify--create_price_rule` + `shopify--create_discount_code` una vez al aprobar el plan.
- **SEO**: `head()` por ruta nueva (producto, unete, politicas, nosotros reescrita).

## Fuera de alcance

- Cambios de business logic del carrito (ya funciona).
- Traer Nebulas/Baked/Organic al UI (ocultos hasta que confirmes stock).

## Preguntas antes de implementar

1. Para `/unete`, ¿prefieres (a) habilitar Lovable Cloud y enviar el código por email automáticamente, o (b) flujo simple: mostrar el código en pantalla + registrar el email como cliente en Shopify (Shopify Email se encarga después)?
2. Los 3 productos destacados del hero: ¿te sirven Mixed Berries, Cherry Lemon y Piña Colada, o prefieres otros 3 handles específicos?