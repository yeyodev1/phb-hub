/**
 * Sitios ya existentes del ecosistema PHB.
 * El hub NO reimplementa evaluación ni tienda: enruta hacia ellos.
 */
export const EXTERNAL = {
  /** Evaluación PHB (app de evaluación ya en producción). */
  evaluacion: 'https://evaluacion.powerhousebiotech.com/',
  /** Tienda: libros, guías, cursos y masterclasses. */
  store: 'https://store.powerhousebiotech.com/',
  /** Funnel de rutas de medicina regenerativa. */
  regenerativa: 'https://evaluacion.powerhousebiotech.com/',
} as const

export const CONTACT = {
  whatsapp: 'https://wa.me/5218180000000',
  email: 'contacto@powerhousebiotech.com',
} as const

/** Ruta del ecosistema, visible en todo el sitio. */
export const JOURNEY = ['Comprender', 'Evaluar', 'Actuar', 'Medir', 'Regenerar'] as const
