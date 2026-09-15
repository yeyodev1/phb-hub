/**
 * Fotografía oficial de Juan Román Garza.
 * Origen: biblioteca Cloudinary usada por juanromangarza.com y powerhousebiotech.com.
 * Se sirven con transformaciones (`w_`, `q_auto`, `f_auto`) para no cargar el original.
 */
const CLD = 'https://res.cloudinary.com/drw5sn8qw/image/upload'

const img = (path: string, t = 'q_auto,f_auto') => `${CLD}/${t}/${path}`

export const JUAN = {
  /** Retrato en estudio, fondo claro. Hero principal. */
  portrait: img(
    'v1780095160/assets-juan/1fdb1f14-5799-4c12-ba46-8590a824770b.jpg',
    'w_900,q_auto,f_auto',
  ),
  portraitSmall: img(
    'v1780095160/assets-juan/1fdb1f14-5799-4c12-ba46-8590a824770b.jpg',
    'w_520,q_auto,f_auto',
  ),
  /** Cuerpo completo sentado. Sección de autoridad. */
  seated: img(
    'v1780095164/assets-juan/5e7c35cb-17e2-4244-ab47-c3f4d3edff54.jpg',
    'w_780,q_auto,f_auto',
  ),
  /** En escenario — "Longevidad Regenerativa". */
  stage: img(
    'v1780095165/assets-juan/71a520fc-beb0-4eb0-b7b6-3e97fef04266.jpg',
    'w_1200,q_auto,f_auto',
  ),
  /** Auditorio lleno. Prueba social para conferencias. */
  auditorium: img(
    'v1780095166/assets-juan/c875b275-008f-42eb-8828-799b8d573ae1.jpg',
    'w_1400,q_auto,f_auto',
  ),
  /** Masterclass médica. */
  masterclass: img(
    'v1780095163/assets-juan/5dfa62f2-170e-42eb-867b-f98a1c816781.jpg',
    'w_1200,q_auto,f_auto',
  ),
  /** Presentación ejecutiva. */
  executive: img(
    'v1780095164/assets-juan/65feeba0-0dce-4cff-b63d-eb15952be89c.jpg',
    'w_1200,q_auto,f_auto',
  ),
  /** Ecosistema / clínica. */
  ecosystem: img(
    'v1780095160/assets-juan/19d44cab-fe24-4998-8fa0-7095b1ef858c.jpg',
    'w_1200,q_auto,f_auto',
  ),
} as const

/** Logos locales en /public */
export const LOGOS = {
  jrg: '/jrg-logo.png',
  phb: '/phb-logo.png',
} as const

export interface PressArticle {
  outlet: string
  title: string
  url: string
  /** Captura del artículo publicado, en /public/press/articles. */
  image: string
}

/**
 * Artículos publicados sobre Juan Román Garza. Cada tarjeta muestra la captura
 * y abre el artículo original. Mismas URLs que juanromangarza.com (PressEventsSection).
 */
const ARTICLE_PATH =
  'roman-garza-the-regenerative-entrepreneur-pioneering-regenerative-healthcare-with-a-hearfelt-vision/'

export const PRESS_ARTICLES: PressArticle[] = [
  {
    outlet: 'The New York Finance',
    title: 'Román Garza: pionero en la salud regenerativa y la medicina del futuro',
    url: `https://thenewyorkfinance.com/${ARTICLE_PATH}`,
    image: '/press/articles/new-york-finance.jpg',
  },
  {
    outlet: 'The USA Reporter',
    title: 'Un enfoque vanguardista para la regeneración y la longevidad',
    url: `https://theusareporter.com/${ARTICLE_PATH}`,
    image: '/press/articles/usa-reporter.jpg',
  },
  {
    outlet: 'Big Boston News',
    title: 'Innovación y liderazgo: el impacto de Powerhouse Biotech',
    url: `https://www.bigbostonnews.com/${ARTICLE_PATH}`,
    image: '/press/articles/big-boston-news.jpg',
  },
  {
    outlet: 'The Chicago Finance',
    title: 'Revolucionando el bienestar corporativo: la estrategia de Román Garza',
    url: `https://thechicagofinance.com/${ARTICLE_PATH}`,
    image: '/press/articles/chicago-finance.jpg',
  },
  {
    outlet: 'The New Jersey Gazette',
    title: 'El emprendedor que está transformando la biotecnología celular',
    url: `https://thenewjerseygazette.com/${ARTICLE_PATH}`,
    image: '/press/articles/new-jersey-gazette.jpg',
  },
  {
    outlet: 'Houston Weekly News',
    title: 'Tecnología médica avanzada: el futuro de la lucidez directiva',
    url: `https://houstonweeklynews.com/${ARTICLE_PATH}`,
    image: '/press/articles/houston-weekly-news.jpg',
  },
  {
    outlet: 'The Chicago Gazette',
    title: 'La nueva era de la medicina: terapias celulares y liderazgo integral',
    url: `https://www.thechicagogazette.com/${ARTICLE_PATH}`,
    image: '/press/articles/chicago-gazette.jpg',
  },
]

/** Medios donde ha aparecido. Logos blancos sobre fondo oscuro. */
export const PRESS = [
  '/press/press-1.png',
  '/press/press-2.png',
  '/press/press-3.png',
  '/press/press-4.png',
  '/press/press-5.png',
  '/press/press-6.png',
] as const
