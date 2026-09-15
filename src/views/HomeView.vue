<script setup lang="ts">
import { computed, ref } from 'vue'
import HeroSection from '@/components/home/HeroSection.vue'
import PressArticles from '@/components/home/PressArticles.vue'
import IntentSelector from '@/components/home/IntentSelector.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import ResourceCard from '@/components/ui/ResourceCard.vue'
import { EXTERNAL } from '@/config/destinations'
import { JUAN } from '@/config/media'
import { sendLead } from '@/services/leads'

interface World {
  key: string
  icon: string
  name: string
  claim: string
  copy: string
  cta: string
  to?: string
  href?: string
}

interface Concept {
  name: string
  copy: string
}

interface Step {
  name: string
  copy: string
}

interface Before {
  label: string
  copy: string
}

const WORLDS: World[] = [
  {
    key: 'aprende',
    icon: 'fa-solid fa-book-open',
    name: 'Aprende',
    claim: 'Comprender',
    copy: 'Libros, guías, cursos y masterclasses para entender tu cuerpo y reconocer riesgos a tiempo.',
    cta: 'Explorar Aprende',
    to: '/aprende',
  },
  {
    key: 'evalua',
    icon: 'fa-solid fa-chart-simple',
    name: 'Evalúate',
    claim: 'Evaluar',
    copy: 'Evaluaciones PHB que convierten síntomas, antecedentes y biomarcadores en prioridades claras.',
    cta: 'Evaluar mi salud',
    href: EXTERNAL.evaluate,
  },
  {
    key: 'actua',
    icon: 'fa-solid fa-bolt',
    name: 'Actúa',
    claim: 'Actuar',
    copy: 'Programas conductuales de 30 días para convertir intención en comportamiento sostenido.',
    cta: 'Conocer ACTÚA',
    to: '/actua',
  },
  {
    key: 'regenera',
    icon: 'fa-solid fa-dna',
    name: 'Regeneración',
    claim: 'Regenerar',
    copy: 'Programas clínicos regenerativos que se evalúan antes de proponerse. Nunca se compran a ciegas.',
    cta: 'Explorar regeneración',
    to: '/regeneracion',
  },
]

// Documento 1 (JRG Tienda Online) con la dirección visual del documento 2:
// la narrativa no va como párrafo largo, va como sección editorial.
const CONCEPTS: Concept[] = [
  { name: 'Interpretar', copy: 'En cómo interpretamos nuestra salud.' },
  { name: 'Decidir', copy: 'En las decisiones que tomamos —o postergamos— cada día.' },
  { name: 'Actuar', copy: 'En nuestra capacidad para convertir información en acción.' },
  {
    name: 'Adaptarnos',
    copy: 'Y en la capacidad biológica que conserva nuestro organismo para adaptarse, recuperarse y regenerarse.',
  },
]

const PHILOSOPHY: Step[] = [
  { name: 'Comprender', copy: 'Entender qué está sucediendo.' },
  { name: 'Decidir', copy: 'Determinar qué merece atención y qué hacer después.' },
  { name: 'Actuar', copy: 'Transformar conocimiento en comportamiento.' },
  { name: 'Medir', copy: 'Observar resultados, evolución y nuevas señales.' },
  {
    name: 'Regenerar',
    copy: 'Preservar, recuperar y optimizar función cuando exista oportunidad para hacerlo.',
  },
]

const BEFORE: Before[] = [
  { label: 'Antes de la enfermedad', copy: 'Antes de que una señal se convierta en enfermedad.' },
  {
    label: 'Antes del deterioro',
    copy: 'Antes de que la enfermedad avance hacia un deterioro irreversible.',
  },
  {
    label: 'Antes de perder oportunidades',
    copy: 'Y antes de perder oportunidades valiosas para actuar.',
  },
]

// --- Educación gratuita: el lead entra al CRM y recibe el PDF por correo ---
const free = ref({ name: '', email: '', whatsapp: '' })
const freeSending = ref(false)
const freeSent = ref(false)
const freeError = ref('')

const freeIsValid = computed(
  () =>
    free.value.name.trim().length > 1 &&
    /^\S+@\S+\.\S+$/.test(free.value.email.trim()) &&
    free.value.whatsapp.replace(/\D/g, '').length >= 8,
)

async function submitFree() {
  if (!freeIsValid.value || freeSending.value) return
  freeSending.value = true
  freeError.value = ''
  try {
    await sendLead({
      intent: 'aprender',
      source: 'hub-educacion-gratuita',
      answers: { recurso: 'checklist-20-senales + mini-guia-10-biomarcadores' },
      name: free.value.name.trim(),
      email: free.value.email.trim(),
      whatsapp: free.value.whatsapp.trim(),
      consent: true,
    })
    freeSent.value = true
  } catch (e) {
    freeError.value = e instanceof Error ? e.message : 'No pudimos registrar tus datos'
  } finally {
    freeSending.value = false
  }
}
</script>

<template>
  <div class="home">
    <HeroSection />

    <PressArticles />

    <IntentSelector />

    <!-- ECOSISTEMA -->
    <section class="worlds">
      <div class="worlds__inner">
        <SectionHeader
          eyebrow="El ecosistema de salud"
          title="Aprender · Evaluar · Actuar · Regenerar"
        />

        <ul class="worlds__list">
          <li v-for="w in WORLDS" :key="w.key" class="worlds__item">
            <article class="world">
              <span class="world__icon" aria-hidden="true"><i :class="w.icon"></i></span>
              <p class="world__claim">{{ w.claim }}</p>
              <h3 class="world__name">{{ w.name }}</h3>
              <p class="world__copy">{{ w.copy }}</p>
              <BaseButton
                variant="link"
                :to="w.to"
                :href="w.href"
                class="world__cta"
              >
                {{ w.cta }}
                <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </BaseButton>
            </article>
          </li>
        </ul>
      </div>
    </section>

    <!-- LA PREGUNTA QUE GUÍA MI TRABAJO -->
    <section class="question">
      <div class="question__inner">
        <div class="question__text">
          <p class="question__lead">
            Durante años he estudiado una pregunta que puede cambiar el destino de una persona:
          </p>
          <h2 class="question__title">
            ¿Por qué algunas personas logran cambiar, recuperarse y preservar su salud,
            mientras otras continúan deteriorándose aun sabiendo que necesitan actuar?
          </h2>
        </div>

        <figure class="question__figure">
          <img
            :src="JUAN.seated"
            alt="Juan Román Garza, retrato de cuerpo completo"
            loading="lazy"
          />
        </figure>
      </div>

      <div class="answer">
        <p class="answer__lead">La respuesta no está solamente en la medicina.</p>
        <p class="answer__axis">
          Está en la interacción entre
          <strong>conducta</strong>
          <span aria-hidden="true">↔</span>
          <strong>biología</strong>.
        </p>

        <ul class="answer__concepts">
          <li v-for="c in CONCEPTS" :key="c.name" class="answer__concept">
            <p class="answer__concept-name">{{ c.name }}</p>
            <p class="answer__concept-copy">{{ c.copy }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- UNA FILOSOFÍA INTEGRATIVA -->
    <section class="philosophy">
      <div class="philosophy__inner">
        <SectionHeader
          eyebrow="Una filosofía integrativa de la salud"
          title="Comprender no es suficiente. Hay que convertir el conocimiento en decisiones y las decisiones en acción."
          subtitle="Esta búsqueda me llevó a integrar psicología de la salud, medicina conductual, biomarcadores, prevención, tecnología, inteligencia clínica y medicina regenerativa bajo una misma filosofía:"
        />

        <ol class="philosophy__steps">
          <li v-for="(s, i) in PHILOSOPHY" :key="s.name" class="philosophy__step">
            <span class="philosophy__index">{{ String(i + 1).padStart(2, '0') }}</span>
            <p class="philosophy__name">{{ s.name }}.</p>
            <p class="philosophy__copy">{{ s.copy }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- LO QUE TE OFREZCO HOY -->
    <section class="today">
      <div class="today__inner">
        <SectionHeader
          eyebrow="Lo que hago hoy"
          title="Ayudarte a entender mejor tu salud antes de que pierdas oportunidades valiosas para actuar."
          subtitle="Hoy ayudo a las personas a comprender mejor su cuerpo y su comportamiento, identificar riesgos oportunamente, reducir incertidumbre y tomar decisiones más inteligentes sobre su salud."
        />

        <ul class="today__blocks">
          <li v-for="b in BEFORE" :key="b.label" class="today__block">
            <p class="today__label">{{ b.label }}</p>
            <p class="today__copy">{{ b.copy }}</p>
          </li>
        </ul>

        <div class="today__close">
          <p>Porque el futuro de tu salud no depende únicamente de lo que sabes.</p>
          <p class="today__close-strong">Depende de lo que decides hacer con lo que sabes.</p>
          <p class="today__sign">
            Juan Román Garza
            <span>Decisiones Inteligentes para tu Salud. Simplificadas.</span>
          </p>
        </div>
      </div>
    </section>

    <!-- DESTACADOS -->
    <section class="featured">
      <div class="featured__inner">
        <SectionHeader
          eyebrow="Destacados"
          title="Por dónde empieza casi todo el mundo."
        />

        <ul class="featured__list">
          <li class="featured__item">
            <ResourceCard
              format="PDF / E-book"
              title="Todavía no estoy tan mal"
              description="Guía para reconocer las señales de deterioro que muchas veces normalizamos o postergamos."
              audience="Sospechas que algo no anda bien, pero nada duele lo suficiente todavía."
              duration="Lectura 45 min"
              cta="Conocer más"
              :href="EXTERNAL.store"
              badge="Más leído"
            />
          </li>
          <li class="featured__item">
            <ResourceCard
              format="Evaluación PHB"
              title="Encuentra tu evaluación"
              description="Cuestionario, antecedentes, biomarcadores y dimensiones de salud integrados para identificar riesgos y prioridades."
              learn="Dónde estás hoy y qué merece atención primero."
              duration="Desde 10 minutos"
              cta="Evaluar mi salud"
              :href="EXTERNAL.evaluate"
            />
          </li>
          <li class="featured__item">
            <ResourceCard
              format="Programa"
              title="PHB ACTÚA 30"
              description="30 días para convertir conciencia en acción, con estructura diaria, seguimiento y reevaluación."
              audience="Ya sabes qué deberías hacer, pero no logras sostenerlo."
              duration="30 días"
              cta="Conocer ACTÚA"
              to="/actua"
            />
          </li>
        </ul>
      </div>
    </section>

    <!-- SPEAKER -->
    <section class="strip strip--speaker">
      <img
        :src="JUAN.auditorium"
        alt="Juan Román Garza durante una conferencia magistral"
        class="strip__bg"
        loading="lazy"
      />
      <div class="strip__inner">
        <div class="strip__text">
          <p class="strip__eyebrow">Juan Román Garza · Speaker</p>
          <h2 class="strip__title">
            Todavía no estoy tan mal™ y otras seis conferencias.
          </h2>
          <p class="strip__copy">
            Empresas, hospitales, universidades, asociaciones y eventos privados.
            Presencial, virtual o híbrido.
          </p>
        </div>
        <div class="strip__actions">
          <BaseButton to="/conferencias" size="lg">Contratar conferencia</BaseButton>
        </div>
      </div>
    </section>

    <!-- EMPRESAS -->
    <section class="strip strip--business">
      <div class="strip__inner">
        <div class="strip__text">
          <p class="strip__eyebrow">PHB Corporate Health</p>
          <h2 class="strip__title">
            Conferencia + evaluación + programa de 30 días para tu organización.
          </h2>
          <p class="strip__copy">
            Executive Health, evaluación poblacional, activación conductual y reporte
            organizacional agregado.
          </p>
        </div>
        <div class="strip__actions">
          <BaseButton to="/empresas" variant="ghost" size="lg">
            Ver programas corporativos
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- EDUCACIÓN GRATUITA -->
    <section class="free">
      <div class="free__inner">
        <SectionHeader
          eyebrow="Educación gratuita"
          title="Empieza sin costo."
          subtitle="Checklist de 20 señales de que deberías evaluar mejor tu salud, más una mini guía de 10 biomarcadores que no deberías ignorar."
        />

        <form v-if="!freeSent" class="free__form" @submit.prevent="submitFree">
          <label class="free__field">
            <span class="visually-hidden">Nombre</span>
            <input
              v-model="free.name"
              type="text"
              placeholder="Tu nombre"
              autocomplete="name"
              required
            />
          </label>
          <label class="free__field">
            <span class="visually-hidden">Email</span>
            <input
              v-model="free.email"
              type="email"
              placeholder="tu@correo.com"
              autocomplete="email"
              required
            />
          </label>
          <label class="free__field">
            <span class="visually-hidden">WhatsApp</span>
            <input
              v-model="free.whatsapp"
              type="tel"
              placeholder="WhatsApp"
              autocomplete="tel"
              required
            />
          </label>
          <BaseButton type="submit" size="lg" :disabled="!freeIsValid || freeSending">
            {{ freeSending ? 'Enviando…' : 'Descargar gratis' }}
          </BaseButton>
        </form>

        <p v-if="freeError" class="free__error" role="alert">{{ freeError }}</p>

        <p v-if="freeSent" class="free__done">
          Listo. Revisa tu correo — te enviamos el checklist y la mini guía.
        </p>
      </div>
    </section>

    <!-- ACCIÓN -->
    <section class="action">
      <div class="action__inner">
        <h2 class="action__title">Tu salud no cambia solamente porque sabes más.</h2>
        <p class="action__sub">
          Cambia cuando comprendes lo que está sucediendo, decides actuar y construyes una
          estrategia para preservar lo que todavía puedes proteger, recuperar u optimizar.
        </p>
        <p class="action__sign">
          Juan Román Garza
          <span>Decisiones Inteligentes para tu Salud. Simplificadas.</span>
        </p>
        <BaseButton size="lg" :href="EXTERNAL.catalog">
          Explorar todos los recursos
          <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </BaseButton>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
}

/* --- ECOSISTEMA --- */
.worlds {
  @include section-pad;

  &__inner {
    @include container;
    @include col($sp-6);
  }

  &__list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $sp-3;
  }

  &__item {
    flex: 1 1 100%;
    display: flex;

    @include from($bp-md) {
      flex: 1 1 calc(50% - #{$sp-3} / 2);
    }

    @include from($bp-lg) {
      flex: 1 1 calc(25% - #{$sp-3} * 3 / 4);
    }
  }
}

.world {
  @include card-surface;
  @include col($sp-2);
  width: 100%;
  padding: $sp-5;

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: $r-md;
    border: 1px solid rgba($gold, 0.35);
    background: rgba($gold, 0.08);
    color: $gold-soft;
    font-size: 1.1rem;
    line-height: 1;
  }

  &__claim {
    @include eyebrow;
    font-size: 0.62rem;
  }

  &__name {
    @include display-md;
    color: $white;
  }

  &__copy {
    @include body;
    flex: 1;
  }

  &__cta {
    align-self: flex-start;
    margin-top: $sp-3;
  }
}

/* --- LA PREGUNTA --- */
.question {
  @include section-pad;
  @include col($sp-7);
  background: linear-gradient(180deg, $navy 0%, $navy-soft 100%);

  &__inner {
    @include container;
    display: flex;
    flex-direction: column;
    gap: $sp-6;

    @include from($bp-lg) {
      flex-direction: row;
      align-items: center;
      gap: $sp-8;
    }
  }

  &__text {
    @include col($sp-4);

    @include from($bp-lg) {
      flex: 1 1 60%;
    }
  }

  &__lead {
    @include eyebrow;
    color: $gold-soft;
    text-transform: none;
    letter-spacing: 0.02em;
    font-size: 0.95rem;
  }

  // La pregunta tiene el protagonismo visual de la sección.
  &__title {
    @include display-xl;
    color: $white;
    max-width: 24ch;
  }

  &__figure {
    display: flex;

    @include from($bp-lg) {
      flex: 0 1 340px;
    }

    img {
      width: 100%;
      border-radius: $r-lg;
      border: 1px solid rgba($gold, 0.35);
      box-shadow: 0 22px 55px rgba($ink, 0.55);
      aspect-ratio: 3 / 4;
      object-fit: cover;
      object-position: center 25%;
    }
  }
}

.answer {
  @include container;
  @include col($sp-5);

  &__lead {
    @include body-lg;
    color: $muted-strong;
  }

  &__axis {
    @include display-lg;
    color: $white;

    strong {
      color: $gold-soft;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    span {
      color: $cyan;
      margin-inline: $sp-2;
    }
  }

  &__concepts {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $sp-3;
  }

  &__concept {
    @include card-surface;
    @include col($sp-2);
    flex: 1 1 100%;
    padding: $sp-5;

    @include from($bp-md) {
      flex: 1 1 calc(50% - #{$sp-3} / 2);
    }

    @include from($bp-lg) {
      flex: 1 1 calc(25% - #{$sp-3} * 3 / 4);
    }
  }

  &__concept-name {
    font-family: $font-accent;
    font-weight: 600;
    font-size: 0.8rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: $accent;
  }

  &__concept-copy {
    @include body;
    color: $muted-strong;
  }
}

/* --- FILOSOFÍA (sección clara: firma visual de la marca) --- */
.philosophy {
  @include section-pad;
  background: $bone;

  &__inner {
    @include container;
    @include col($sp-7);
  }

  :deep(.section-header) {
    max-width: 72ch;
  }

  :deep(.section-header__eyebrow) {
    color: $gold;
  }

  :deep(.section-header__title) {
    color: $ink;
  }

  :deep(.section-header__subtitle) {
    color: rgba($ink, 0.7);
  }

  // Desktop: recorrido horizontal. Mobile: recorrido vertical.
  &__steps {
    display: flex;
    flex-direction: column;
    gap: 0;

    @include from($bp-lg) {
      flex-direction: row;
    }
  }

  &__step {
    @include col($sp-2);
    flex: 1 1 0;
    padding: $sp-5 0;
    border-top: 1px solid $bone-line;

    @include from($bp-lg) {
      padding: $sp-5 $sp-4 0 0;
      border-top: 2px solid $gold;
    }
  }

  &__index {
    font-family: $font-accent;
    font-weight: 700;
    font-size: 0.8rem;
    color: $gold;
  }

  &__name {
    font-family: $font-display;
    font-weight: 700;
    font-size: clamp(1.4rem, 3vw, 1.75rem);
    text-transform: uppercase;
    letter-spacing: 0.02em;
    color: $ink;
  }

  &__copy {
    @include body;
    color: rgba($ink, 0.7);
  }
}

/* --- HOY --- */
.today {
  @include section-pad;
  background: linear-gradient(180deg, $navy-soft 0%, $navy 100%);

  &__inner {
    @include container;
    @include col($sp-6);
  }

  :deep(.section-header) {
    max-width: 68ch;
  }

  &__blocks {
    @include col(0);
  }

  &__block {
    @include col($sp-2);
    padding-block: $sp-5;
    border-top: 1px solid $line-strong;

    &:last-child {
      border-bottom: 1px solid $line-strong;
    }

    @include from($bp-md) {
      flex-direction: row;
      align-items: baseline;
      gap: $sp-6;
    }
  }

  &__label {
    @include eyebrow;
    color: $gold-soft;

    @include from($bp-md) {
      flex: 0 0 260px;
    }
  }

  &__copy {
    @include body-lg;
    color: $white;
  }

  &__close {
    @include col($sp-3);

    p:first-child {
      @include body-lg;
    }
  }

  &__close-strong {
    @include display-lg;
    color: $white !important;
  }

  &__sign {
    @include col($sp-1);
    font-family: $font-display;
    font-weight: 700;
    color: $white !important;

    span {
      font-family: $font-accent;
      font-weight: 400;
      font-size: 0.8rem;
      letter-spacing: 0.08em;
      color: $gold-soft;
    }
  }
}

/* --- DESTACADOS --- */
.featured {
  @include section-pad;

  &__inner {
    @include container;
    @include col($sp-6);
  }

  &__list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $sp-3;
  }

  &__item {
    flex: 1 1 100%;
    display: flex;

    @include from($bp-md) {
      flex: 1 1 calc(50% - #{$sp-3} / 2);
    }

    @include from($bp-lg) {
      flex: 1 1 calc(33.333% - #{$sp-3} * 2 / 3);
    }
  }
}

/* --- FRANJAS --- */
.strip {
  position: relative;
  overflow: hidden;
  @include section-pad;
  padding-block: $sp-7;

  &__bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.35;
  }

  &__inner {
    position: relative;
    @include container;
    @include col($sp-5);

    @include from($bp-lg) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: $sp-6;
    }
  }

  &__text {
    @include col($sp-3);
    max-width: 62ch;
  }

  &__eyebrow {
    @include eyebrow;
    color: $gold-soft;
  }

  &__title {
    @include display-md;
    color: $white;
  }

  &__copy {
    @include body;
  }

  &__actions {
    display: flex;
    flex-shrink: 0;
  }

  &--speaker {
    background: $ink;
    border-block: 1px solid $line;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        105deg,
        rgba($ink, 0.96) 0%,
        rgba($ink, 0.82) 45%,
        rgba($ink, 0.5) 100%
      );
    }

    .strip__inner {
      z-index: 1;
    }
  }

  &--business {
    background: linear-gradient(160deg, rgba($gold, 0.14) 0%, $ink 70%);
    border-bottom: 1px solid $line;
  }
}

/* --- GRATIS --- */
.free {
  @include section-pad;
  background: linear-gradient(180deg, $navy 0%, $ink 100%);

  &__inner {
    @include container;
    @include col($sp-5);
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: $sp-3;
    width: 100%;
    max-width: 920px;

    @include from($bp-lg) {
      flex-direction: row;
      align-items: center;
    }
  }

  &__field {
    flex: 1;
    display: flex;

    input {
      width: 100%;
      padding: 1rem 1.1rem;
      border: 1px solid $line-strong;
      border-radius: $r-pill;
      background: rgba($ink, 0.6);
      color: $white;

      &::placeholder {
        color: rgba($muted, 0.6);
      }

      &:focus {
        outline: none;
        border-color: $cyan;
      }
    }
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

/* --- ACCIÓN --- */
.action {
  @include section-pad;
  background: radial-gradient(120% 90% at 20% 100%, $navy-soft 0%, $ink 65%);
  border-top: 1px solid $line;

  &__inner {
    @include container;
    @include col($sp-5);
    align-items: flex-start;
    max-width: 880px;
  }

  &__title {
    @include display-xl;
    color: $white;
  }

  &__sub {
    @include body-lg;
    max-width: 60ch;
  }

  &__sign {
    @include col($sp-1);
    font-family: $font-display;
    font-weight: 700;
    color: $white;

    span {
      font-family: $font-accent;
      font-weight: 400;
      font-size: 0.8rem;
      letter-spacing: 0.08em;
      color: $gold-soft;
    }
  }
}
</style>
