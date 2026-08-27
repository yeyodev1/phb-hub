<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useJourneyStore } from '@/stores/journey'
import BaseButton from '@/components/ui/BaseButton.vue'

const journey = useJourneyStore()
const router = useRouter()
const panel = ref<HTMLElement | null>(null)
const redirecting = ref(false)

const stepLabel = computed(() => `Paso ${journey.step + 1} de ${journey.totalSteps}`)

watch(
  () => journey.isOpen,
  async (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) {
      await nextTick()
      panel.value?.focus()
    }
  },
)

watch(
  () => journey.step,
  () => panel.value?.scrollTo({ top: 0, behavior: 'smooth' }),
)

async function finish() {
  const destination = await journey.submit()
  if (!destination) return
  redirecting.value = true

  window.setTimeout(() => {
    journey.close()
    redirecting.value = false
    if (destination.kind === 'external') {
      window.location.href = destination.target
    } else {
      router.push(destination.target)
    }
  }, 900)
}
</script>

<template>
  <transition name="sheet">
    <div v-if="journey.isOpen" class="quiz" role="dialog" aria-modal="true">
      <div class="quiz__backdrop" @click="journey.close()"></div>

      <div ref="panel" class="quiz__panel" tabindex="-1" @keydown.esc="journey.close()">
        <div class="quiz__head">
          <div class="quiz__head-text">
            <p class="quiz__intent">
              <i :class="journey.intent?.icon" aria-hidden="true"></i>
              {{ journey.intent?.title }}
            </p>
            <p class="quiz__step">{{ stepLabel }}</p>
          </div>
          <button class="quiz__close" aria-label="Cerrar" @click="journey.close()">
            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </div>

        <div class="quiz__progress" role="presentation">
          <span :style="{ width: `${journey.progress}%` }"></span>
        </div>

        <div class="quiz__body">
          <!-- Preguntas -->
          <template v-if="!journey.isLeadStep && journey.currentQuestion">
            <h2 class="quiz__question">{{ journey.currentQuestion.question }}</h2>
            <p v-if="journey.currentQuestion.helper" class="quiz__helper">
              {{ journey.currentQuestion.helper }}
            </p>

            <ul class="quiz__options">
              <li v-for="opt in journey.currentQuestion.options" :key="opt.value">
                <button
                  class="quiz__option"
                  :class="{
                    'is-selected':
                      journey.answers[journey.currentQuestion.id] === opt.value,
                  }"
                  @click="journey.answer(journey.currentQuestion.id, opt.value)"
                >
                  <span class="quiz__option-label">{{ opt.label }}</span>
                  <span v-if="opt.hint" class="quiz__option-hint">{{ opt.hint }}</span>
                </button>
              </li>
            </ul>
          </template>

          <!-- Contacto -->
          <template v-else>
            <h2 class="quiz__question">¿A dónde te enviamos tu ruta?</h2>
            <p class="quiz__helper">
              Con tus respuestas preparamos tu siguiente paso dentro del ecosistema.
            </p>

            <form class="quiz__form" @submit.prevent="finish">
              <label class="quiz__field">
                <span>Nombre</span>
                <input
                  v-model="journey.lead.name"
                  type="text"
                  autocomplete="name"
                  placeholder="Tu nombre"
                  required
                />
              </label>

              <label class="quiz__field">
                <span>Email</span>
                <input
                  v-model="journey.lead.email"
                  type="email"
                  autocomplete="email"
                  placeholder="tu@correo.com"
                  required
                />
              </label>

              <label class="quiz__field">
                <span>WhatsApp</span>
                <input
                  v-model="journey.lead.whatsapp"
                  type="tel"
                  autocomplete="tel"
                  placeholder="+52 81 0000 0000"
                  required
                />
              </label>

              <label class="quiz__consent">
                <input v-model="journey.lead.consent" type="checkbox" />
                <span>
                  Acepto recibir información educativa sobre salud, prevención y
                  regeneración.
                </span>
              </label>

              <BaseButton
                type="submit"
                size="lg"
                block
                :disabled="!journey.leadIsValid || journey.submitting || redirecting"
              >
                {{ redirecting ? 'Preparando tu ruta…' : journey.intent?.ctaLabel }}
              </BaseButton>
            </form>
          </template>
        </div>

        <div class="quiz__foot">
          <button v-if="journey.step > 0" class="quiz__back" @click="journey.back()">
            <i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Atrás
          </button>
          <span v-else></span>
          <p class="quiz__foot-note">Sin costo · Sin compromiso</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.quiz {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  @include from($bp-md) {
    justify-content: center;
    align-items: center;
    padding: $sp-6;
  }

  &__backdrop {
    position: absolute;
    inset: 0;
    background: rgba($ink, 0.82);
    backdrop-filter: blur(6px);
  }

  &__panel {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 92vh;
    overflow-y: auto;
    background: linear-gradient(170deg, $surface-2 0%, $navy 60%, $ink 100%);
    border: 1px solid $line-strong;
    border-radius: $r-lg $r-lg 0 0;
    outline: none;

    @include from($bp-md) {
      max-width: 560px;
      border-radius: $r-lg;
      max-height: 88vh;
    }
  }

  &__head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: $sp-4;
    padding: $sp-5 $sp-5 $sp-3;
  }

  &__head-text {
    @include col($sp-1);
  }

  &__intent {
    display: flex;
    align-items: center;
    gap: $sp-3;

    i {
      color: $gold-soft;
      font-size: 0.95rem;
      line-height: 1;
    }
    font-family: $font-display;
    font-weight: 600;
    font-size: 0.95rem;
    color: $white;
  }

  &__step {
    font-family: $font-accent;
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: $muted;
  }

  &__close {
    flex-shrink: 0;
    width: 34px;
    height: 34px;
    border-radius: $r-pill;
    border: 1px solid $line-strong;
    color: $muted-strong;
    @include focus-ring;
  }

  &__progress {
    height: 3px;
    margin-inline: $sp-5;
    border-radius: $r-pill;
    background: rgba($white, 0.08);
    overflow: hidden;

    span {
      display: block;
      height: 100%;
      background: $grad-gold;
      transition: width 0.3s ease;
    }
  }

  &__body {
    @include col($sp-3);
    padding: $sp-5;
    flex: 1;
  }

  &__question {
    @include display-md;
    color: $white;
  }

  &__helper {
    @include body;
    font-size: 0.88rem;
  }

  &__options {
    @include col($sp-2);
    margin-top: $sp-2;
  }

  &__option {
    @include col($sp-1);
    width: 100%;
    text-align: left;
    padding: $sp-4;
    border: 1px solid $line-strong;
    border-radius: $r-md;
    background: rgba($white, 0.02);
    transition: border-color 0.18s ease, background 0.18s ease, transform 0.18s ease;
    @include focus-ring;

    &:hover,
    &.is-selected {
      border-color: $cyan;
      background: rgba($cyan, 0.1);
    }

    &:active {
      transform: scale(0.99);
    }
  }

  &__option-label {
    font-family: $font-display;
    font-weight: 500;
    font-size: 1rem;
    color: $white;
  }

  &__option-hint {
    font-size: 0.82rem;
    color: $muted;
  }

  &__form {
    @include col($sp-4);
    margin-top: $sp-2;
  }

  &__field {
    @include col($sp-2);

    > span {
      font-family: $font-accent;
      font-size: 0.68rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba($cyan, 0.9);
    }

    input {
      width: 100%;
      padding: 0.95rem 1rem;
      border: 1px solid $line-strong;
      border-radius: $r-md;
      background: rgba($ink, 0.5);
      color: $white;
      transition: border-color 0.18s ease;

      &::placeholder {
        color: rgba($muted, 0.6);
      }

      &:focus {
        outline: none;
        border-color: $cyan;
      }
    }
  }

  &__consent {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: $sp-3;
    font-size: 0.82rem;
    line-height: 1.5;
    color: $muted;

    input {
      flex-shrink: 0;
      width: 18px;
      height: 18px;
      margin-top: 2px;
      accent-color: $cyan;
    }
  }

  &__foot {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: $sp-3;
    padding: $sp-4 $sp-5 $sp-6;
    border-top: 1px solid $line;
  }

  &__back {
    font-family: $font-accent;
    font-size: 0.82rem;
    color: $muted-strong;
    @include focus-ring;

    &:hover {
      color: $cyan;
    }
  }

  &__foot-note {
    font-size: 0.72rem;
    color: rgba($muted, 0.7);
  }
}

.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 0.24s ease;

  .quiz__panel {
    transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
  }
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;

  .quiz__panel {
    transform: translateY(24px);
  }
}
</style>
