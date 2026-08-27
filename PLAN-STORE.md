# Reconversión de la tienda — lectura de los documentos

Fuentes: el brief que pasó el cliente (§1–§14), `JRG Tienda Online (2).pdf` (Aprende) y `EVALUATE - JRG Tienda Online.pdf`.

---

## 0. El hallazgo que manda sobre todo lo demás

La tienda hoy **no vende nada del ecosistema**. Vende ionizadores de agua Enagic/Kangen:

| Producto actual | Precio |
|---|---|
| Leveluk R | 1,980 |
| Leveluk JRII | 2,380 |
| Leveluk SD501 | 3,980 |
| Leveluk SD501 Platinum | 4,280 |
| Leveluk K8 | 4,980 |
| Anespa DX | 2,480 |
| Filtro de Ionizador Enagic | 100 |

Categorías: *Ionizadores Kangen · Spa & Ducha · Filtros y Repuestos*.

**Esto no es una migración de catálogo, es una tienda distinta.** Antes de tocar código hay que decidir qué pasa con Kangen (ver §1).

---

## 1. Decisión previa: Kangen se queda o se va

Recomiendo **sacarlo del mismo dominio**. Razones:

- El hub que acabamos de construir vende *criterio clínico*: "Decision Before Intervention™", evaluar antes de intervenir, no vender tratamientos como shampoo. Un ionizador de agua alcalina al lado de eso **erosiona exactamente la autoridad que el hub construye**.
- Enagic es venta por distribución/MLM. Es un negocio legítimo pero con lógica comercial, público y tono distintos.
- El agua alcalina arrastra afirmaciones de salud que atraen escrutinio regulatorio. Mezclarla con la marca clínica traslada ese riesgo a PHB y a Juan Román.

Si el negocio Kangen sigue activo, que viva en su propio dominio. Si no, se archiva el catálogo (no se borra: queda en git).

**Esto lo decide el cliente, no nosotros.** Es la primera pregunta que hay que hacerle.

---

## 2. El modelo de producto cambia de raíz

El `Product` actual es de bien físico:

```
name · slug · modelCode · price · compareAtPrice · currency
category · categorySlug · stock · specs[] · benefits[]
images[] · featured · isActive · rating · tags[]
```

Se van: `modelCode`, `stock`, `specs[]`, y toda la lógica de envío.

Entran, porque **el PDF-2 lo exige explícitamente** — cada producto debe mostrar siempre cuatro datos:

| Campo nuevo | Etiqueta en la ficha |
|---|---|
| `formato` | Qué es (PDF · Guía · Masterclass · Curso · Evaluación · Programa) |
| `queAprenderas` | Qué aprenderás |
| `paraQuienEs` | Ideal para ti si… |
| `tiempoNecesario` | Cuánto tiempo necesitas |

Más los que exige el negocio digital:

- `entrega`: `descarga` · `acceso-plataforma` · `evaluacion-externa` · `agenda-consulta`
- `archivoUrl` / `accesoUrl` para la entrega automática
- `tags[]` **multi-categoría**: el PDF-2 dice que "50 biomarcadores" pertenece a la vez a *Biomarcadores · Prevención · Longevidad*. Hoy `categorySlug` es uno solo — hay que soportar varios.

---

## 3. Lo más importante de arquitectura: no todo se compra igual

Cinco tipos de producto con **flujo distinto**. Esto no es cosmético, cambia el modelo de datos:

| Tipo | CTA | Flujo |
|---|---|---|
| Gratuito (lead magnet) | Descargar gratis | email + WhatsApp → entrega |
| Digital (PDF, guía, masterclass, curso) | Comprar | carrito → pago → acceso inmediato |
| Evaluación PHB | Comenzar evaluación | pago → redirige a `evaluacion.powerhousebiotech.com` |
| Programa ACTÚA | Inscribirme | pago → onboarding + seguimiento |
| **Programa regenerativo** | **Evaluar mi candidatura** | **sin carrito** → formulario clínico |

El brief §6 es tajante: *"No vendería tratamientos médicos como si fueran una botella de shampoo con Agregar al carrito"*.

Traducción técnica: un flag `requiereEvaluacion: boolean` que **desactiva el botón de carrito** y cambia el CTA. Si no está en el modelo desde el día uno, alguien va a terminar poniéndole "Agregar al carrito" a un programa clínico.

---

## 4. El hueco más grande: no hay cobro

`Order.paymentMethod` es un string libre. **No hay Stripe, Conekta ni Mercado Pago.** Hoy el pedido se captura y se cobra por fuera.

Para producto físico eso aguanta. Para producto digital no: el comprador espera **pagar y recibir en el momento**. Sin pasarela no hay tienda digital, hay formulario de pedido.

Además la membresía PHB ONE™ (§9) es **suscripción recurrente** — otro modelo de cobro, no un pago único.

---

## 5. Los precios ya están definidos — no hay que inventarlos

| Línea | Rango | Fuente |
|---|---|---|
| Aprende (PDFs, guías) | Gratis → $99 → $299 → $990 | Brief §2 |
| Cursos | $1,500 – $15,000 | Brief §3 |
| ACTÚA | $990 → $2,500 → $5,000 → $15,000+ | Brief §4 |
| PHB Health Check | Gratis | PDF-EV |
| PHB Basic | $690 | PDF-EV |
| PHB Biomarkers | $1,690 | PDF-EV |
| PHB Multisystem | $2,990 | PDF-EV |
| PHB Regenerative Capacity | $3,990 | PDF-EV |
| PHB Longevity | $3,990 – $5,990 | PDF-EV |
| PHB Precision | desde $8,900 | PDF-EV |
| Membresía PHB ONE | $299 – $999 / mes | Brief §9 |

---

## 6. Cómo se exhibe: tres niveles, no catálogo plano

PDF-2, literal: *"evitaría presentar 40 productos al mismo nivel"*.

```
COMIENZA AQUÍ   → 3 productos que todo visitante debe descubrir
MÁS POPULARES   → los que mejor conviertan
NUEVOS          → recién publicados
GRATUITOS       → lead magnets, captura email/WhatsApp
```

Y navegación por **preocupación, no por nombre de producto**: Biomarcadores · Prevención · Comportamiento · Regeneración · Longevidad · Innovación. El visitante no sabe cómo se llama lo que necesita.

---

## 7. "Mi cuenta" deja de ser "mis pedidos"

Brief §12. La cuenta pasa a ser **MI PHB**: mis cursos · mis PDFs · mis evaluaciones · mis resultados · mis programas · mis citas · mi progreso.

Eventualmente el **PHB Health Score™** con sus 8 dimensiones.

Eso es lo que convierte la tienda en plataforma en lugar de ecommerce. Es también lo que justifica que el usuario vuelva.

---

## 8. Arranque acotado — el propio brief lo pide

*"No intentaría lanzar 50 productos simultáneamente. Empezaría con aproximadamente 10, pero construyendo desde el principio la arquitectura capaz de contener cien."*

Los 10 del arranque ya están listados en el brief:

1. 1 producto gratuito (PDF / Health Check)
2. 2 PDFs premium
3. 2 masterclasses
4. 1 curso premium
5. PHB Evaluación
6. PHB ACTÚA 30
7. 1 programa regenerativo con "Evaluar candidatura"
8. Contratación de conferencias

---

## 9. Frontera hub ↔ tienda

Riesgo real de duplicar: el hub ya tiene `/aprende` con biblioteca, filtros y buscador.

Propuesta de reparto:

- **Hub** = descubrimiento y narrativa. Segmenta, educa, enruta. No cobra.
- **Tienda** = catálogo, ficha, checkout y biblioteca del usuario. Cobra y entrega.

`/aprende` del hub se queda como pieza editorial que empuja a la tienda. Las fichas con precio y botón de compra viven solo en la tienda. Si no se define esta frontera, terminamos manteniendo dos catálogos.

---

## 10. Orden que propongo

1. Decidir Kangen (bloquea todo lo demás)
2. Rediseñar el modelo `Product` con los 4 datos del PDF-2 + tipos de producto + `requiereEvaluacion`
3. Elegir e integrar pasarela de pago
4. Entrega digital automática (descarga firmada / acceso)
5. Reconstruir listado y ficha con los tres niveles de exhibición
6. Cargar los 10 productos del arranque
7. MI PHB (cuenta con biblioteca y resultados)
8. Membresía recurrente

Los pasos 1 a 3 son decisiones de negocio. Del 4 en adelante es ejecución.
