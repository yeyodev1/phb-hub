<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { API_BASE } from '@/services/leads'

interface Testimonial {
  _id: string
  name: string
  city?: string
  resource: string
  rating: number
  comment: string
}

const props = withDefaults(
  defineProps<{
    /** Página desde la que se deja la opinión. */
    source: string
    /** Recursos que la persona pudo haber descargado o comprado. */
    resources: string[]
  }>(),
  {},
)

const items = ref<Testimonial[]>([])

const form = ref({ name: '', city: '', resource: '', rating: 5, comment: '', website: '' })
const sending = ref(false)
const sent = ref(false)
const error = ref('')

const isValid = computed(
  () =>
    form.value.name.trim().length > 1 &&
    form.value.resource !== '' &&
    form.value.comment.trim().length >= 10,
)

async function load() {
  try {
    const res = await fetch(`${API_BASE}/testimonials?source=${encodeURIComponent(props.source)}`)
    if (res.ok) items.value = (await res.json()).testimonials ?? []
  } catch {
    items.value = []
  }
}

async function submit() {
  if (!isValid.value || sending.value) return
  sending.value = true
  error.value = ''
  try {
    const res = await fetch(`${API_BASE}/testimonials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form.value, source: props.source }),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.message || 'No pudimos enviar tu comentario')
    }
    sent.value = true
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'No pudimos enviar tu comentario'
  } finally {
    sending.value = false
  }
}

onMounted(load)
</script>

<template>
  <section class="testimonials">
    <div class="testimonials__inner">
      <SectionHeader
        eyebrow="Testimonios"
        title="Lo que dicen quienes ya empezaron."
        subtitle="¿Descargaste o compraste alguno de los recursos? Cuéntanos qué te pareció: tu opinión ayuda a otras personas a dar su primer paso."
      />

      <ul v-if="items.length" class="testimonials__list">
        <li v-for="t in items" :key="t._id" class="testimonial">
          <p class="testimonial__stars" :aria-label="`${t.rating} de 5`">
            <i
              v-for="n in 5"
              :key="n"
              class="fa-star"
              :class="n <= t.rating ? 'fa-solid' : 'fa-regular'"
              aria-hidden="true"
            ></i>
          </p>
          <p class="testimonial__comment">“{{ t.comment }}”</p>
          <p class="testimonial__author">
            {{ t.name }}<span v-if="t.city"> · {{ t.city }}</span>
          </p>
          <p class="testimonial__resource">{{ t.resource }}</p>
        </li>
      </ul>

      <form v-if="!sent" class="testimonials__form" @submit.prevent="submit">
        <p class="testimonials__form-title">Comparte tu opinión</p>

        <div class="testimonials__row">
          <label class="field">
            <span>Nombre</span>
            <input v-model="form.name" type="text" autocomplete="given-name" required />
          </label>
          <label class="field">
            <span>Ciudad (opcional)</span>
            <input v-model="form.city" type="text" autocomplete="address-level2" />
          </label>
        </div>

        <label class="field">
          <span>¿Qué recurso usaste?</span>
          <select v-model="form.resource" required>
            <option value="" disabled>Elige un recurso</option>
            <option v-for="r in resources" :key="r" :value="r">{{ r }}</option>
          </select>
        </label>

        <fieldset class="field field--rating">
          <legend>Calificación</legend>
          <div class="rating">
            <button
              v-for="n in 5"
              :key="n"
              type="button"
              class="rating__star"
              :aria-label="`${n} de 5`"
              :aria-pressed="form.rating === n"
              @click="form.rating = n"
            >
              <i class="fa-star" :class="n <= form.rating ? 'fa-solid' : 'fa-regular'" aria-hidden="true"></i>
            </button>
          </div>
        </fieldset>

        <label class="field">
          <span>Tu comentario</span>
          <textarea v-model="form.comment" rows="4" maxlength="1000" required></textarea>
        </label>

        <!-- Campo trampa para bots: las personas no lo ven. -->
        <input v-model="form.website" class="testimonials__trap" type="text" tabindex="-1" autocomplete="off" aria-hidden="true" />

        <p v-if="error" class="testimonials__error" role="alert">{{ error }}</p>

        <BaseButton type="submit" size="lg" :disabled="!isValid || sending">
          {{ sending ? 'Enviando…' : 'Enviar mi opinión' }}
        </BaseButton>
      </form>

      <p v-else class="testimonials__done">
        Gracias por compartir tu experiencia. La publicaremos después de revisarla.
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.testimonials {
  @include section-pad;
  background: $ink;

  &__inner {
    @include container;
    @include col($sp-6);
  }

  &__list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $sp-4;
  }

  &__form {
    @include card-surface;
    @include col($sp-4);
    padding: $sp-5;
    max-width: 720px;
    width: 100%;
  }

  &__form-title {
    font-family: $font-display;
    font-weight: 600;
    font-size: 1.15rem;
    color: $white;
  }

  &__row {
    display: flex;
    flex-direction: column;
    gap: $sp-4;

    @include from($bp-md) {
      flex-direction: row;

      > * {
        flex: 1;
      }
    }
  }

  &__trap {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
  }

  &__error {
    @include body;
    color: $alert-error;
  }

  &__done {
    @include body-lg;
    color: $green;
  }
}

.testimonial {
  @include card-surface;
  @include col($sp-3);
  flex: 1 1 100%;
  padding: $sp-5;

  @include from($bp-md) {
    flex: 1 1 calc(50% - #{$sp-4} / 2);
  }

  @include from($bp-lg) {
    flex: 1 1 calc(33.333% - #{$sp-4} * 2 / 3);
  }

  &__stars {
    display: flex;
    gap: $sp-1;
    color: $gold-soft;
    font-size: 0.85rem;
  }

  &__comment {
    @include body-lg;
    color: $white;
    flex: 1;
  }

  &__author {
    font-family: $font-display;
    font-weight: 600;
    color: $muted-strong;
  }

  &__resource {
    font-family: $font-accent;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: $cyan;
  }
}

.field {
  @include col($sp-2);
  border: 0;
  padding: 0;
  margin: 0;

  span,
  legend {
    font-family: $font-accent;
    font-size: 0.78rem;
    letter-spacing: 0.04em;
    color: $muted-strong;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 0.85rem 1rem;
    border: 1px solid $line-strong;
    border-radius: $r-md;
    background: rgba($ink, 0.6);
    color: $white;
    font: inherit;

    &:focus {
      outline: none;
      border-color: $cyan;
    }
  }

  select option {
    color: $ink;
  }
}

.rating {
  display: flex;
  gap: $sp-2;
  margin-top: $sp-2;

  &__star {
    font-size: 1.35rem;
    color: $gold-soft;
    background: none;
    border: 0;
    padding: $sp-1;
    cursor: pointer;
    @include focus-ring;
  }
}
</style>
