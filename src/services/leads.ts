import type { LeadPayload } from '@/types'

/** Endpoint de leads del backend de la tienda (guarda en Mongo y sincroniza con GoHighLevel). */
export const LEADS_URL =
  (import.meta.env.VITE_LEADS_URL as string) || 'https://store-phb-backapp.vercel.app/api/leads'

/** Base de la API pública del backend, derivada del endpoint de leads. */
export const API_BASE = LEADS_URL.replace(/\/leads\/?$/, '')

export type LeadRequest = Omit<LeadPayload, 'createdAt'> & { source?: string }

/** Envía un lead al CRM. Lanza si el backend lo rechaza. */
export async function sendLead(lead: LeadRequest): Promise<void> {
  const res = await fetch(LEADS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...lead, createdAt: new Date().toISOString() }),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.message || 'No pudimos registrar tus datos')
  }
}
