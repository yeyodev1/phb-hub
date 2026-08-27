<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { CONTACT } from '@/config/destinations'
import { JUAN, PRESS } from '@/config/media'

/* ------------------------------------------------------------------ */
/* Tipos                                                                */
/* ------------------------------------------------------------------ */
interface Conferencia {
  title: string
  copy: string
  idealFor: string
  icon: string
}

interface GaleriaItem {
  src: string
  caption: string
}

interface Formato {
  label: string
}

interface Audiencia {
  label: string
}

interface Takeaway {
  number: string
  title: string
}

/* ------------------------------------------------------------------ */
/* 01. HERO                                                             */
/* ------------------------------------------------------------------ */
const credenciales = [
  'Psicología de la Salud',
  'Medicina Conductual',
  'Prevención',
  'Regeneración',
  'Longevidad Productiva',
]

/* ------------------------------------------------------------------ */
/* 02. CONFERENCIAS DISPONIBLES                                         */
/* ------------------------------------------------------------------ */
const conferencias: Conferencia[] = [
  {
    title: 'Todavía no estoy tan mal™',
    copy: 'Por qué sabemos que debemos cuidar nuestra salud y aun así no actuamos.',
    idealFor: 'Audiencias generales que necesitan un llamado de atención honesto y sin culpa.',
    icon: 'fa-solid fa-triangle-exclamation',
  },
  {
    title: 'La enfermedad antes de la enfermedad™',
    copy: 'El deterioro silencioso que ocurre años antes del diagnóstico.',
    idealFor: 'Hospitales, aseguradoras y organizaciones enfocadas en prevención.',
    icon: 'fa-solid fa-magnifying-glass-chart',
  },
  {
    title: 'Decisión antes de intervención™',
    copy: 'Por qué medir y comprender debe anteceder a cualquier tratamiento.',
    idealFor: 'Clínicas, congresos médicos y audiencias en medicina regenerativa.',
    icon: 'fa-solid fa-scale-balanced',
  },
  {
    title: 'La psicología detrás de nuestras decisiones de salud',
    copy: 'Cómo interpretamos, postergamos y racionalizamos el riesgo.',
    idealFor: 'Empresas, universidades y equipos de bienestar corporativo.',
    icon: 'fa-solid fa-brain',
  },
  {
    title: 'El futuro de la medicina regenerativa',
    copy: 'Qué es real, qué está en desarrollo y cómo evaluarlo con criterio.',
    idealFor: 'Congresos, instituciones de salud y audiencias especializadas.',
    icon: 'fa-solid fa-dna',
  },
  {
    title: 'De la conciencia a la acción',
    copy: 'El puente conductual entre saber y hacer.',
    idealFor: 'Empresas y asociaciones que buscan activar cambios reales de conducta.',
    icon: 'fa-solid fa-bolt',
  },
  {
    title: 'Health Intelligence',
    copy: 'Entender la salud como un sistema de información y decisión.',
    idealFor: 'Directivos, líderes de RR. HH. y audiencias orientadas a datos.',
    icon: 'fa-solid fa-chart-line',
  },
]

/* ------------------------------------------------------------------ */
/* 02.1 GALERÍA — PRUEBA SOCIAL                                        */
/* ------------------------------------------------------------------ */
const galeria: GaleriaItem[] = [
  { src: JUAN.stage, caption: 'Ponencia Longevidad Regenerativa' },
  { src: JUAN.auditorium, caption: 'Auditorio principal' },
  { src: JUAN.masterclass, caption: 'Masterclass médica' },
  { src: JUAN.executive, caption: 'Sesión ejecutiva' },
]

const selectedConferencia = ref<string>('')

function solicitarConferencia(title: string) {
  selectedConferencia.value = title
  conferenciaInteres.value = title
  const el = document.getElementById('contratar')
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ------------------------------------------------------------------ */
/* 03. FORMATOS Y AUDIENCIAS                                            */
/* ------------------------------------------------------------------ */
const formatos: Formato[] = [
  { label: 'Presencial' },
  { label: 'Virtual' },
  { label: 'Híbrido' },
  { label: 'Keynote' },
  { label: 'Taller' },
  { label: 'Programa completo (conferencia + evaluación + activación)' },
]

const audiencias: Audiencia[] = [
  { label: 'Empresas' },
  { label: 'Hospitales e instituciones de salud' },
  { label: 'Universidades' },
  { label: 'Asociaciones' },
  { label: 'Iglesias' },
  { label: 'Congresos' },
  { label: 'Eventos privados' },
]

/* ------------------------------------------------------------------ */
/* 04. QUÉ SE LLEVA LA AUDIENCIA                                        */
/* ------------------------------------------------------------------ */
const takeaways: Takeaway[] = [
  { number: '01', title: 'Un marco claro para entender su propia salud' },
  { number: '02', title: 'Conciencia del deterioro silencioso' },
  { number: '03', title: 'Criterios para decidir mejor' },
  { number: '04', title: 'Un primer paso concreto al salir de la sala' },
]

/* ------------------------------------------------------------------ */
/* 05. CONTRATAR                                                        */
/* ------------------------------------------------------------------ */
const contactName = ref<string>('')
const organizacion = ref<string>('')
const email = ref<string>('')
const whatsapp = ref<string>('')
const tipoAudiencia = ref<string>('')
const formato = ref<string>('')
const conferenciaInteres = ref<string>('')
const fechaTentativa = ref<string>('')
const numeroAsistentes = ref<number | null>(null)
const mensaje = ref<string>('')
const sent = ref<boolean>(false)

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isValid = computed<boolean>(
  () =>
    contactName.value.trim().length > 1 &&
    organizacion.value.trim().length > 1 &&
    emailRegex.test(email.value.trim()),
)

function enviarSolicitud() {
  if (!isValid.value) return
  sent.value = true
}
</script>

<template>
  <div class="conferencias-view">
    <!-- 01. HERO -->
    <section class="hero">
      <img
        class="hero__bg"
        :src="JUAN.auditorium"
        alt="Juan Román Garza presentando ante un auditorio lleno"
      />
      <div class="hero__veil" aria-hidden="true"></div>
      <div class="hero__container">
        <p class="hero__eyebrow">JUAN ROMÁN GARZA | SPEAKER</p>
        <h1 class="hero__title">
          Tu salud no cambia cuando sabes más. Cambia cuando empiezas a tomar mejores decisiones.
        </h1>
        <p class="hero__subtitle">
          Conferencias sobre psicología de la salud, medicina conductual, prevención, longevidad
          productiva y medicina regenerativa — diseñadas para mover a una audiencia de la
          conciencia a la acción.
        </p>

        <div class="hero__ctas">
          <BaseButton variant="primary" size="lg" href="#contratar">
            Contratar conferencia
            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </BaseButton>
          <BaseButton variant="ghost" size="lg" href="#conferencias">Ver conferencias</BaseButton>
        </div>

        <div class="hero__credentials" role="list" aria-label="Áreas de especialidad">
          <span v-for="c in credenciales" :key="c" class="hero__credential" role="listitem">
            {{ c }}
          </span>
        </div>
      </div>
    </section>

    <!-- 01.1 BARRA DE MEDIOS -->
    <section class="press">
      <div class="press__container">
        <p class="press__label">Reconocido en</p>
        <div class="press__logos">
          <img
            v-for="(logo, i) in PRESS"
            :key="logo"
            :src="logo"
            :alt="`Logo medio de comunicación ${i + 1}`"
            loading="lazy"
            class="press__logo"
          />
        </div>
      </div>
    </section>

    <!-- 02. CONFERENCIAS DISPONIBLES -->
    <section id="conferencias" class="talks">
      <div class="talks__container">
        <SectionHeader
          eyebrow="Conferencias disponibles"
          title="Siete conferencias para mover a tu audiencia"
          subtitle="Cada conferencia está diseñada para llevar a la audiencia de la conciencia a la acción, con un enfoque claro y aplicable."
        />

        <div class="talks__row">
          <article v-for="c in conferencias" :key="c.title" class="talks__card">
            <span class="talks__icon"><i :class="c.icon" aria-hidden="true"></i></span>
            <h3 class="talks__title">{{ c.title }}</h3>
            <p class="talks__copy">{{ c.copy }}</p>
            <p class="talks__ideal"><strong>Ideal para:</strong> {{ c.idealFor }}</p>
            <BaseButton variant="link" href="#contratar" @click="solicitarConferencia(c.title)">
              Solicitar esta conferencia
              <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </BaseButton>
          </article>
        </div>
      </div>
    </section>

    <!-- 02.1 GALERÍA — PRUEBA SOCIAL -->
    <section class="gallery">
      <div class="gallery__container">
        <SectionHeader
          eyebrow="En escenario"
          title="Juan Román Garza frente a audiencias reales"
        />
        <div class="gallery__row">
          <figure v-for="g in galeria" :key="g.src" class="gallery__item">
            <img :src="g.src" :alt="g.caption" loading="lazy" class="gallery__img" />
            <figcaption class="gallery__caption">{{ g.caption }}</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- 03. FORMATOS Y AUDIENCIAS -->
    <section class="formats">
      <div class="formats__container">
        <SectionHeader
          eyebrow="Formatos y audiencias"
          title="Se adapta a tu evento y a tu audiencia"
        />

        <div class="formats__block">
          <h3 class="formats__label">Formatos</h3>
          <div class="formats__chips" role="list">
            <span v-for="f in formatos" :key="f.label" class="formats__chip" role="listitem">
              {{ f.label }}
            </span>
          </div>
        </div>

        <div class="formats__block">
          <h3 class="formats__label">Audiencias</h3>
          <div class="formats__chips" role="list">
            <span v-for="a in audiencias" :key="a.label" class="formats__chip" role="listitem">
              {{ a.label }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- 04. QUÉ SE LLEVA LA AUDIENCIA -->
    <section class="takeaways">
      <div class="takeaways__container">
        <SectionHeader
          eyebrow="Qué se lleva la audiencia"
          title="Más que una charla: un cambio de marco"
        />

        <div class="takeaways__row">
          <div v-for="t in takeaways" :key="t.number" class="takeaways__card">
            <span class="takeaways__number">{{ t.number }}</span>
            <p class="takeaways__title">{{ t.title }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 05. CONTRATAR -->
    <section id="contratar" class="hire">
      <div class="hire__container">
        <SectionHeader
          eyebrow="Contratar"
          title="Solicita una conferencia para tu organización"
          subtitle="Cuéntanos sobre tu evento y tu audiencia. Te contactamos para definir el formato y la conferencia ideal."
        />

        <div class="hire__form-wrap">
          <form v-if="!sent" class="hire__form" @submit.prevent="enviarSolicitud">
            <label class="hire__field">
              <span class="hire__field-label">Nombre de contacto</span>
              <input v-model="contactName" type="text" class="hire__input" required />
            </label>

            <label class="hire__field">
              <span class="hire__field-label">Organización</span>
              <input v-model="organizacion" type="text" class="hire__input" required />
            </label>

            <label class="hire__field">
              <span class="hire__field-label">Email</span>
              <input v-model="email" type="email" class="hire__input" required />
            </label>

            <label class="hire__field">
              <span class="hire__field-label">WhatsApp</span>
              <input v-model="whatsapp" type="tel" class="hire__input" />
            </label>

            <label class="hire__field">
              <span class="hire__field-label">Tipo de audiencia</span>
              <select v-model="tipoAudiencia" class="hire__input">
                <option value="" disabled>Selecciona una opción</option>
                <option v-for="a in audiencias" :key="a.label" :value="a.label">{{ a.label }}</option>
              </select>
            </label>

            <label class="hire__field">
              <span class="hire__field-label">Formato</span>
              <select v-model="formato" class="hire__input">
                <option value="" disabled>Selecciona una opción</option>
                <option v-for="f in formatos" :key="f.label" :value="f.label">{{ f.label }}</option>
              </select>
            </label>

            <label class="hire__field">
              <span class="hire__field-label">Conferencia de interés</span>
              <select v-model="conferenciaInteres" class="hire__input">
                <option value="" disabled>Selecciona una opción</option>
                <option v-for="c in conferencias" :key="c.title" :value="c.title">{{ c.title }}</option>
              </select>
            </label>

            <label class="hire__field">
              <span class="hire__field-label">Fecha tentativa</span>
              <input v-model="fechaTentativa" type="date" class="hire__input" />
            </label>

            <label class="hire__field">
              <span class="hire__field-label">Número aproximado de asistentes</span>
              <input v-model.number="numeroAsistentes" type="number" min="0" class="hire__input" />
            </label>

            <label class="hire__field hire__field--full">
              <span class="hire__field-label">Mensaje</span>
              <textarea v-model="mensaje" rows="4" class="hire__input hire__textarea"></textarea>
            </label>

            <div class="hire__field hire__field--full">
              <BaseButton variant="primary" size="lg" block :disabled="!isValid">
                Enviar solicitud
              </BaseButton>
            </div>
          </form>

          <p v-else class="hire__confirm">
            Recibimos tu solicitud. Te contactamos en menos de 24 horas hábiles.
          </p>
        </div>

        <div class="hire__direct">
          <p class="hire__direct-title">O contáctanos directamente</p>
          <div class="hire__direct-row">
            <a class="hire__direct-link" :href="`mailto:${CONTACT.email}`">
              <i class="fa-solid fa-envelope" aria-hidden="true"></i>
              {{ CONTACT.email }}
            </a>
            <a class="hire__direct-link" :href="CONTACT.whatsapp" target="_blank" rel="noopener">
              <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 06. CIERRE -->
    <section class="closing">
      <div class="closing__container">
        <p class="closing__copy">
          Una conferencia puede ser el inicio de un programa de salud completo para tu
          organización.
        </p>
        <BaseButton variant="solid-light" size="lg" to="/empresas">
          Ver programas corporativos
        </BaseButton>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.conferencias-view {
  background: $ink;
}

/* ---------- 01. HERO ---------- */
.hero {
  @include section-pad;
  position: relative;
  overflow: hidden;
  background: $ink;

  &__bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__veil {
    position: absolute;
    inset: 0;
    background: $grad-veil, linear-gradient(180deg, rgba($ink, 0.55) 0%, rgba($ink, 0.92) 100%);
  }

  &__container {
    @include container;
    @include col($sp-5);
    position: relative;
  }

  &__eyebrow {
    @include eyebrow;
    color: $gold;
  }

  &__title {
    @include display-xl;
    color: $white;
    max-width: 24ch;
  }

  &__subtitle {
    @include body-lg;
    max-width: 65ch;
  }

  &__ctas {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $sp-3;
  }

  &__credentials {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $sp-2;
  }

  &__credential {
    font-family: $font-accent;
    font-size: 0.78rem;
    font-weight: 600;
    color: $muted-strong;
    background: rgba($white, 0.04);
    border: 1px solid $line;
    border-radius: $r-pill;
    padding: 0.55rem 1.1rem;
  }
}

/* ---------- 01.1 BARRA DE MEDIOS ---------- */
.press {
  padding-block: $sp-5;
  background: $ink;
  border-bottom: 1px solid $line;

  &__container {
    @include container;
    @include col($sp-3);
    align-items: center;
    text-align: center;
  }

  &__label {
    @include eyebrow;
    color: $muted;
  }

  &__logos {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: $sp-6;
  }

  &__logo {
    height: 26px;
    max-width: 100%;
    object-fit: contain;
    filter: brightness(0) invert(1);
    opacity: 0.55;
    transition: opacity 0.18s ease;

    &:hover {
      opacity: 1;
    }
  }
}

/* ---------- 02. CONFERENCIAS ---------- */
.talks {
  @include section-pad;

  &__container {
    @include container;
    @include col($sp-6);
  }

  &__row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $sp-5;
  }

  &__card {
    @include card-surface;
    @include col($sp-3);
    flex: 1 1 100%;
    padding: $sp-5;
    border-top: 1px solid rgba($gold, 0.35);

    @include from($bp-md) {
      flex: 1 1 calc(50% - #{$sp-5} / 2);
    }

    @include from($bp-lg) {
      flex: 1 1 calc(33.333% - #{$sp-5} * 2 / 3);
    }
  }

  &__icon {
    @include center;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    border: 1px solid rgba($gold, 0.4);
    color: $gold;
    font-size: 1rem;
  }

  &__title {
    font-family: $font-display;
    font-size: 1.1rem;
    font-weight: 600;
    color: $white;
  }

  &__copy {
    @include body;
  }

  &__ideal {
    @include body;
    color: $muted-strong;

    strong {
      color: $muted-strong;
      font-weight: 600;
    }
  }
}

/* ---------- 02.1 GALERÍA ---------- */
.gallery {
  @include section-pad;
  background: $navy-soft;

  &__container {
    @include container;
    @include col($sp-6);
  }

  &__row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $sp-5;
  }

  &__item {
    @include col($sp-2);
    flex: 1 1 100%;
    margin: 0;

    @include from($bp-md) {
      flex: 1 1 calc(50% - #{$sp-5} / 2);
    }
  }

  &__img {
    width: 100%;
    max-width: 100%;
    height: auto;
    border-radius: $r-lg;
    border: 1px solid rgba($gold, 0.3);
    object-fit: cover;
    aspect-ratio: 4 / 3;
  }

  &__caption {
    @include body;
    font-size: 0.85rem;
    color: $muted-strong;
    text-align: center;
  }
}

/* ---------- 03. FORMATOS Y AUDIENCIAS ---------- */
.formats {
  @include section-pad;
  background: $navy-soft;

  &__container {
    @include container;
    @include col($sp-6);
  }

  &__block {
    @include col($sp-3);
  }

  &__label {
    font-family: $font-display;
    font-size: 1.05rem;
    font-weight: 600;
    color: $white;
  }

  &__chips {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $sp-2;
  }

  &__chip {
    font-family: $font-accent;
    font-size: 0.82rem;
    font-weight: 600;
    color: $ink;
    background: $grad-accent;
    border-radius: $r-pill;
    padding: 0.55rem 1.1rem;
  }
}

/* ---------- 04. TAKEAWAYS ---------- */
.takeaways {
  @include section-pad;

  &__container {
    @include container;
    @include col($sp-6);
  }

  &__row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $sp-4;
  }

  &__card {
    @include card-surface;
    @include col($sp-2);
    flex: 1 1 100%;
    padding: $sp-5;

    @include from($bp-md) {
      flex: 1 1 calc(50% - #{$sp-4} / 2);
    }

    @include from($bp-lg) {
      flex: 1 1 calc(25% - #{$sp-4} * 3 / 4);
    }
  }

  &__number {
    font-family: $font-accent;
    font-size: 1.4rem;
    font-weight: 700;
    color: $gold;
  }

  &__title {
    @include body;
    color: $muted-strong;
    font-weight: 500;
  }
}

/* ---------- 05. CONTRATAR ---------- */
.hire {
  @include section-pad;
  background: $navy-soft;

  &__container {
    @include container;
    @include col($sp-6);
  }

  &__form-wrap {
    @include card-surface;
    padding: $sp-6;
  }

  &__form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $sp-4;
  }

  &__field {
    @include col($sp-2);
    flex: 1 1 100%;

    @include from($bp-md) {
      flex: 1 1 calc(50% - #{$sp-4} / 2);
    }

    &--full {
      flex: 1 1 100%;
    }
  }

  &__field-label {
    font-family: $font-accent;
    font-size: 0.8rem;
    font-weight: 600;
    color: $muted-strong;
  }

  &__input {
    width: 100%;
    background: rgba($ink, 0.5);
    border: 1px solid $line-strong;
    border-radius: $r-md;
    padding: $sp-4;
    color: $white;
    font-family: $font-body;
    font-size: 0.9rem;
    transition: border-color 0.18s ease;
    @include focus-ring;

    &:focus {
      border-color: $cyan;
    }

    &::placeholder {
      color: $muted;
    }
  }

  &__textarea {
    resize: vertical;
  }

  &__confirm {
    @include body-lg;
    color: $accent;
  }

  &__direct {
    @include col($sp-3);
  }

  &__direct-title {
    @include eyebrow;
  }

  &__direct-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $sp-4;
  }

  &__direct-link {
    display: inline-flex;
    align-items: center;
    gap: $sp-2;
    font-family: $font-accent;
    font-weight: 600;
    font-size: 0.92rem;
    color: $cyan;

    &:hover {
      color: $accent;
    }
  }
}

/* ---------- 06. CIERRE ---------- */
.closing {
  @include section-pad;

  &__container {
    @include container;
    @include col($sp-5);
    align-items: center;
    text-align: center;
  }

  &__copy {
    @include display-md;
    color: $white;
    max-width: 42ch;
  }
}
</style>
