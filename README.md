# PHB Hub — Juan Román Garza × PHB

Hub de entrada del ecosistema de salud. No es un ecommerce: su trabajo es **segmentar al visitante y enrutarlo** al lugar correcto del ecosistema.

> Entiende tu salud. Toma mejores decisiones. Actúa antes de que sea demasiado tarde.

## Cómo funciona

El hero pregunta *"¿Qué estás buscando hoy?"*. Al elegir una de las seis intenciones se abre un quiz de **3 pasos** + captura de lead, y al terminar se enruta:

| Intención | Destino |
|---|---|
| Quiero aprender | `/aprende` |
| Quiero evaluar mi salud | [evaluacion.powerhousebiotech.com](https://evaluacion.powerhousebiotech.com/) |
| Quiero empezar a cambiar | `/actua` |
| Quiero explorar medicina regenerativa | `/regeneracion` |
| Quiero contratar una conferencia | `/conferencias` |
| Quiero llevar PHB a mi empresa | `/empresas` |

La ruta de marca **Comprender → Evaluar → Actuar → Medir → Regenerar** se repite en todo el sitio.

## Stack

Vue 3 · Vite 7 · TypeScript · Pinia · vue-router · Sass · pnpm

## Desarrollo

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # vue-tsc + vite build
pnpm preview
```

## Variables de entorno

| Variable | Uso |
|---|---|
| `VITE_LEADS_URL` | Endpoint opcional que recibe el lead del quiz. Si está vacío, el lead solo se guarda en `localStorage`. |

## Convenciones de código

Estas reglas son requisito del proyecto, no preferencia:

- **Mobile first estricto.** Solo media queries `min-width`, siempre vía el mixin `@include from($bp-md)`. Prohibido `@media (max-width: …)`.
- **Sin CSS Grid.** Todo el layout con flexbox. Para rejillas: `flex-wrap` + `flex: 1 1 100%` en móvil y `flex: 1 1 calc(50% - …)` desde `$bp-md`.
- **Sin emojis.** Los iconos son Font Awesome 6, cargado por CDN en `index.html` y usado con clases (`<i class="fa-solid fa-dna">`). No hay paquetes de FA instalados.
- Los tokens de color, tipografía, espaciado y mixins viven en `src/styles/` y Vite los inyecta en todos los bloques SCSS — no hay que importarlos en cada componente.

## Estructura

```
src/
├─ components/ui/     BaseButton, SectionHeader, JourneyPath, ResourceCard
├─ components/home/   HeroSection, IntentSelector, IntentQuiz
├─ config/            destinations.ts (URLs del ecosistema), media.ts (fotos y logos)
├─ data/              intents.ts (las 6 intenciones y sus quizzes)
├─ layout/            AppHeader, AppFooter
├─ stores/            journey.ts (intención → respuestas → lead)
├─ styles/            tokens, mixins y estilos globales
└─ views/             Home, Aprende, Actua, Regeneracion, Conferencias, Empresas
```

## Aviso

El contenido del sitio es educativo e informativo y no sustituye consulta, diagnóstico ni tratamiento médico profesional. Los programas clínicos regenerativos nunca se presentan con CTA de compra: el CTA es *Evaluar mi candidatura*.
