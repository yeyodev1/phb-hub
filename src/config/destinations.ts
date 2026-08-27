/**
 * Sitios ya existentes del ecosistema PHB.
 * El hub NO reimplementa evaluación ni tienda: enruta hacia ellos.
 */
export const EXTERNAL = {
  /** Página de venta de las 7 evaluaciones PHB, en la tienda. */
  evaluate: 'https://store.powerhousebiotech.com/evaluate',
  /** La herramienta: el formulario que se llena. */
  evaluacion: 'https://evaluacion.powerhousebiotech.com/',
  /** Tienda: libros, guías, cursos y masterclasses. */
  store: 'https://store.powerhousebiotech.com/',
  /** Funnel de rutas de medicina regenerativa. */
  regenerativa: 'https://evaluacion.powerhousebiotech.com/',
} as const

const WA_NUMBER = '5215553518114'

const waLink = (mensaje: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(mensaje)}`

export const CONTACT = {
  whatsappNumber: WA_NUMBER,
  whatsappDisplay: '+52 1 55 5351 8114',
  /** WhatsApp genérico del menú y el footer. */
  whatsapp: waLink('Hola, vengo del sitio de Juan Román Garza × PHB y quiero más información.'),
  /** Variantes con contexto para no llegar en frío al chat. */
  whatsappConferencias: waLink(
    'Hola, quiero información para contratar una conferencia de Juan Román Garza.',
  ),
  whatsappEmpresas: waLink(
    'Hola, quiero llevar un programa de PHB Corporate Health a mi empresa.',
  ),
  waLink,
  email: 'info@powerhousebiotech.com',
} as const

/** Ruta del ecosistema, visible en todo el sitio. */
export const JOURNEY = ['Comprender', 'Evaluar', 'Actuar', 'Medir', 'Regenerar'] as const
