export interface ApiError {
  status: number
  message: string
  data?: unknown
}

/** Destino de una intención: ruta interna del hub o sitio externo del ecosistema. */
export type DestinationKind = 'internal' | 'external'

export interface Destination {
  kind: DestinationKind
  /** Ruta de vue-router cuando kind === 'internal'; URL absoluta cuando es 'external'. */
  target: string
}

export type IntentId =
  | 'aprender'
  | 'evaluar'
  | 'cambiar'
  | 'regenerar'
  | 'conferencia'
  | 'empresa'

export interface Intent {
  id: IntentId
  icon: string
  title: string
  description: string
  /** Etiqueta del escalón del ecosistema al que pertenece. */
  stage: 'Comprender' | 'Evaluar' | 'Actuar' | 'Regenerar' | 'Difundir' | 'Escalar'
  destination: Destination
  /** Texto del botón final del quiz. */
  ctaLabel: string
}

export interface QuizOption {
  value: string
  label: string
  hint?: string
}

export interface QuizQuestion {
  id: string
  question: string
  helper?: string
  options: QuizOption[]
}

export interface LeadPayload {
  intent: IntentId
  answers: Record<string, string>
  name: string
  email: string
  whatsapp: string
  consent: boolean
  createdAt: string
}
