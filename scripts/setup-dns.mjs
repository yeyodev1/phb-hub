#!/usr/bin/env node
/**
 * Crea en Cloudflare los CNAME que Vercel necesita para el hub.
 *
 * Uso:
 *   CF_API_TOKEN=xxxxx node scripts/setup-dns.mjs
 *   CF_API_TOKEN=xxxxx node scripts/setup-dns.mjs --dry-run
 *
 * El token necesita UN solo permiso: Zone → DNS → Edit,
 * acotado a las zonas powerhousebiotech.com y juanromangarza.com.
 * Se crea en https://dash.cloudflare.com/profile/api-tokens
 *
 * Los registros van SIEMPRE con proxy desactivado (nube gris):
 * si Cloudflare proxea, Vercel no puede verificar el dominio ni emitir el certificado.
 */

const TOKEN = process.env.CF_API_TOKEN
const DRY = process.argv.includes('--dry-run')
const API = 'https://api.cloudflare.com/client/v4'

/** Subdominios a crear: [zona, nombre, destino] */
const RECORDS = [
  { zone: 'powerhousebiotech.com', name: 'salud', content: 'cname.vercel-dns.com' },
  { zone: 'juanromangarza.com', name: 'phb', content: 'cname.vercel-dns.com' },
]

if (!TOKEN) {
  console.error('Falta CF_API_TOKEN. Uso: CF_API_TOKEN=xxxxx node scripts/setup-dns.mjs')
  process.exit(1)
}

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
}

async function cf(path, init = {}) {
  const res = await fetch(`${API}${path}`, { ...init, headers })
  const body = await res.json()
  if (!body.success) {
    const detail = (body.errors ?? []).map((e) => `${e.code}: ${e.message}`).join(' | ')
    throw new Error(`${path} -> ${detail || res.status}`)
  }
  return body.result
}

async function zoneId(name) {
  const zones = await cf(`/zones?name=${encodeURIComponent(name)}`)
  if (!zones.length) throw new Error(`La zona ${name} no existe o el token no la alcanza`)
  return zones[0].id
}

for (const rec of RECORDS) {
  const fqdn = `${rec.name}.${rec.zone}`
  try {
    const id = await zoneId(rec.zone)
    const existing = await cf(`/zones/${id}/dns_records?name=${encodeURIComponent(fqdn)}`)

    const payload = {
      type: 'CNAME',
      name: rec.name,
      content: rec.content,
      ttl: 1,
      proxied: false, // obligatorio: proxied rompe la verificacion de Vercel
      comment: 'Hub JRG x PHB — proyecto Vercel phb-jrg-hub',
    }

    if (DRY) {
      const accion = existing.length ? 'ACTUALIZARIA' : 'CREARIA'
      console.log(`${accion}  ${fqdn}  CNAME -> ${rec.content}  (DNS only)`)
      continue
    }

    if (existing.length) {
      await cf(`/zones/${id}/dns_records/${existing[0].id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      })
      console.log(`actualizado  ${fqdn} -> ${rec.content}`)
    } else {
      await cf(`/zones/${id}/dns_records`, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      console.log(`creado       ${fqdn} -> ${rec.content}`)
    }
  } catch (err) {
    console.error(`FALLO        ${fqdn}: ${err.message}`)
    process.exitCode = 1
  }
}

if (!DRY && !process.exitCode) {
  console.log('\nListo. Ahora verifica en Vercel:')
  console.log('  npx vercel domains verify salud.powerhousebiotech.com')
  console.log('  npx vercel domains verify phb.juanromangarza.com')
}
