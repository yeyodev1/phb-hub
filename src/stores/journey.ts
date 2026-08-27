import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { IntentId, LeadPayload, QuizQuestion } from '@/types'
import { QUIZ, getIntent } from '@/data/intents'

const STORAGE_KEY = 'phb_journey'

/**
 * Recorrido del visitante: intención elegida en el hero -> 3 preguntas -> lead.
 * Al terminar se enruta al destino (landing interna o sitio del ecosistema).
 */
export const useJourneyStore = defineStore('journey', () => {
  const isOpen = ref(false)
  const intentId = ref<IntentId | null>(null)
  const step = ref(0)
  const answers = ref<Record<string, string>>({})
  const submitting = ref(false)
  const submitted = ref(false)

  const lead = ref({ name: '', email: '', whatsapp: '', consent: false })

  const questions = computed<QuizQuestion[]>(() =>
    intentId.value ? QUIZ[intentId.value] : [],
  )
  const intent = computed(() => (intentId.value ? getIntent(intentId.value) : null))
  /** Pasos totales = preguntas + paso de contacto. */
  const totalSteps = computed(() => questions.value.length + 1)
  const isLeadStep = computed(() => step.value === questions.value.length)
  const currentQuestion = computed(() => questions.value[step.value] ?? null)
  const progress = computed(() =>
    totalSteps.value ? Math.round(((step.value + 1) / totalSteps.value) * 100) : 0,
  )
  const leadIsValid = computed(
    () =>
      lead.value.name.trim().length > 1 &&
      /^\S+@\S+\.\S+$/.test(lead.value.email.trim()) &&
      lead.value.whatsapp.replace(/\D/g, '').length >= 8 &&
      lead.value.consent,
  )

  function open(id: IntentId) {
    intentId.value = id
    step.value = 0
    answers.value = {}
    submitted.value = false
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  function answer(questionId: string, value: string) {
    answers.value[questionId] = value
    if (step.value < totalSteps.value - 1) step.value += 1
  }

  function back() {
    if (step.value > 0) step.value -= 1
  }

  /** Guarda el lead y devuelve el destino a abrir. */
  async function submit(): Promise<{ kind: 'internal' | 'external'; target: string } | null> {
    if (!intent.value || !leadIsValid.value) return null
    submitting.value = true

    const payload: LeadPayload = {
      intent: intent.value.id,
      answers: { ...answers.value },
      name: lead.value.name.trim(),
      email: lead.value.email.trim(),
      whatsapp: lead.value.whatsapp.trim(),
      consent: lead.value.consent,
      createdAt: new Date().toISOString(),
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
      const endpoint = import.meta.env.VITE_LEADS_URL
      if (endpoint) {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }
    } catch {
      // El lead ya quedó en localStorage; no bloqueamos el recorrido del usuario.
    } finally {
      submitting.value = false
      submitted.value = true
    }

    return intent.value.destination
  }

  return {
    isOpen,
    intentId,
    intent,
    step,
    answers,
    lead,
    questions,
    currentQuestion,
    totalSteps,
    isLeadStep,
    progress,
    leadIsValid,
    submitting,
    submitted,
    open,
    close,
    answer,
    back,
    submit,
  }
})
