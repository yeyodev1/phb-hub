<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import JourneyPath from '@/components/ui/JourneyPath.vue'
import { EXTERNAL } from '@/config/destinations'

/* ------------------------------------------------------------------ */
/* Tipos                                                                */
/* ------------------------------------------------------------------ */
interface FreeResource {
  title: string
}

interface TopicCard {
  icon: string
  title: string
  copy: string
  cta: string
  slug: string
}

interface JourneyPathCard {
  icon: string
  question: string
  title: string
  copy: string
  cta: string
  href?: string
  to?: string
}

/* ------------------------------------------------------------------ */
/* 02. GRATUITOS                                                        */
/* ------------------------------------------------------------------ */
const freeResources: FreeResource[] = [
  { title: 'Checklist: 20 señales de que deberías evaluar mejor tu salud' },
  { title: 'Mini guía: 10 biomarcadores que no deberías ignorar' },
  { title: 'Evaluación: ¿Estoy realmente cuidando mi salud o solo reaccionando cuando algo sucede?' },
]

/* ------------------------------------------------------------------ */
/* 03. ¿QUÉ QUIERES ENTENDER MEJOR?                                     */
/* ------------------------------------------------------------------ */
const topicCards: TopicCard[] = [
  {
    icon: 'fa-solid fa-vial',
    title: 'Mis biomarcadores',
    copy: 'Aprende qué información pueden aportar glucosa, insulina, HbA1c, inflamación, lípidos, función renal, hormonas y otros indicadores.',
    cta: 'Explorar biomarcadores',
    slug: 'biomarcadores',
  },
  {
    icon: 'fa-solid fa-heart-pulse',
    title: 'Mi riesgo de enfermedad',
    copy: 'Comprende cómo ciertos factores pueden acumularse durante años antes de convertirse en enfermedad manifiesta.',
    cta: 'Explorar prevención',
    slug: 'prevencion',
  },
  {
    icon: 'fa-solid fa-brain',
    title: 'Mi comportamiento',
    copy: 'Entiende por qué saber que necesitas cambiar no necesariamente significa que vas a hacerlo.',
    cta: 'Explorar medicina conductual',
    slug: 'comportamiento',
  },
  {
    icon: 'fa-solid fa-dna',
    title: 'Mi capacidad de recuperación',
    copy: 'Conoce los factores relacionados con adaptación, reparación, función y medicina regenerativa.',
    cta: 'Explorar regeneración',
    slug: 'regeneracion',
  },
  {
    icon: 'fa-solid fa-hourglass-half',
    title: 'Mi longevidad',
    copy: 'Aprende a pensar más allá de vivir más años: preservar energía, función, autonomía y productividad.',
    cta: 'Explorar longevidad',
    slug: 'longevidad',
  },
  {
    icon: 'fa-solid fa-microscope',
    title: 'Nuevas tecnologías y tratamientos',
    copy: 'Explora avances que estoy estudiando en prevención, diagnóstico, tecnología, terapias y medicina regenerativa.',
    cta: 'Explorar innovación',
    slug: 'innovacion',
  },
]

/* ------------------------------------------------------------------ */
/* 05. DE APRENDER A ACTUAR                                             */
/* ------------------------------------------------------------------ */
const journeyCards: JourneyPathCard[] = [
  {
    icon: 'fa-solid fa-chart-simple',
    question: '¿Quieres saber dónde estás?',
    title: 'Evalúa tu salud con PHB',
    copy: 'Obtén una visión más estructurada de tus riesgos, antecedentes, biomarcadores y prioridades.',
    cta: 'Evaluar mi salud',
    href: EXTERNAL.evaluate,
  },
  {
    icon: 'fa-solid fa-bolt',
    question: '¿Sabes qué necesitas hacer pero continúas postergándolo?',
    title: 'PHB ACTÚA™',
    copy: 'Programas diseñados para ayudarte a convertir intención en comportamiento.',
    cta: 'Conocer ACTÚA',
    to: '/actua',
  },
  {
    icon: 'fa-solid fa-dna',
    question: '¿Quieres explorar opciones regenerativas?',
    title: 'Medicina regenerativa',
    copy: 'Conoce nuestra metodología para evaluar intervenciones, tecnologías y estrategias regenerativas.',
    cta: 'Explorar regeneración',
    to: '/regeneracion',
  },
]
</script>

<template>
  <div class="aprende-view">
    <!-- 01. HERO -->
    <section class="hero">
      <div class="hero__container">
        <p class="hero__eyebrow">JUAN ROMÁN GARZA × PHB | APRENDE</p>
        <h1 class="hero__title">
          Entender mejor tu salud puede cambiar las decisiones que tomas sobre ella.
        </h1>
        <p class="hero__subtitle">
          Explora libros, guías, cursos, masterclasses y recursos educativos seleccionados para
          ayudarte a comprender tu cuerpo, reconocer riesgos, interpretar mejor la información de
          salud y convertir conocimiento en acción.
        </p>

        <div class="hero__ctas">
          <BaseButton variant="primary" size="lg" :href="EXTERNAL.store">Explorar biblioteca</BaseButton>
          <BaseButton variant="ghost" size="lg" :href="EXTERNAL.store">Ver recursos gratuitos</BaseButton>
        </div>
      </div>
    </section>

    <!-- 02. GRATUITOS -->
    <section class="free">
      <div class="free__container">
        <SectionHeader
          eyebrow="Sin costo"
          title="Recursos gratuitos para empezar"
          subtitle="Antes de avanzar, empieza por aquí: tres recursos gratis para entender mejor dónde estás."
        />

        <div class="free__row">
          <div v-for="fr in freeResources" :key="fr.title" class="free__card">
            <i class="free__card-icon fa-solid fa-gift" aria-hidden="true"></i>
            <p class="free__card-title">{{ fr.title }}</p>
          </div>
        </div>

        <BaseButton variant="primary" size="lg" :href="EXTERNAL.store">Ver recursos gratuitos</BaseButton>
      </div>
    </section>

    <!-- 03. ¿QUÉ QUIERES ENTENDER MEJOR? -->
    <section class="topics">
      <div class="topics__container">
        <SectionHeader
          eyebrow="Explora por tema"
          title="¿Qué quieres entender mejor?"
          subtitle="Elige un tema y te llevamos directo a los recursos relacionados en la tienda."
        />

        <div class="topics__row">
          <a
            v-for="t in topicCards"
            :key="t.title"
            class="topics__card"
            :href="`${EXTERNAL.store}/tienda?theme=${t.slug}`"
            target="_blank"
            rel="noopener"
          >
            <i class="topics__icon" :class="t.icon" aria-hidden="true"></i>
            <h3 class="topics__title">{{ t.title }}</h3>
            <p class="topics__copy">{{ t.copy }}</p>
            <span class="topics__cta">{{ t.cta }} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
          </a>
        </div>
      </div>
    </section>

    <!-- 04. LA TIENDA -->
    <section class="store-banner">
      <div class="store-banner__container">
        <SectionHeader
          eyebrow="Tienda PHB"
          title="La biblioteca completa vive en la tienda."
          subtitle="Libros, guías, masterclasses y cursos, con su precio, su formato y lo que vas a aprender en cada uno."
          align="center"
        >
          <BaseButton variant="primary" size="lg" :href="EXTERNAL.store">
            Ir a la tienda <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
          </BaseButton>
        </SectionHeader>
      </div>
    </section>

    <!-- 05. DE APRENDER A ACTUAR -->
    <section class="cta-journey">
      <div class="cta-journey__container">
        <SectionHeader
          eyebrow="El siguiente paso"
          title="Aprender es solamente el primer paso."
          subtitle="Puedes leer veinte libros sobre salud y continuar tomando las mismas decisiones. El verdadero valor del conocimiento aparece cuando puedes utilizarlo para comprender dónde estás, qué necesitas cambiar y cuál debería ser tu siguiente paso."
        />

        <JourneyPath :steps="['Comprender', 'Evaluar', 'Actuar', 'Medir', 'Regenerar']" active="Comprender" />

        <div class="cta-journey__row">
          <div v-for="jc in journeyCards" :key="jc.title" class="cta-journey__card">
            <i class="cta-journey__icon" :class="jc.icon" aria-hidden="true"></i>
            <p class="cta-journey__question">{{ jc.question }}</p>
            <h3 class="cta-journey__title">{{ jc.title }}</h3>
            <p class="cta-journey__copy">{{ jc.copy }}</p>
            <BaseButton variant="link" :href="jc.href" :to="jc.to">{{ jc.cta }}</BaseButton>
          </div>
        </div>

        <p class="cta-journey__tagline">APRENDE → EVALÚATE → ACTÚA → REGENERA</p>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.aprende-view {
  background: $ink;
}

/* ---------- 01. HERO ---------- */
.hero {
  @include section-pad;
  background: $grad-veil, $ink;

  &__container {
    @include container;
    @include col($sp-5);
  }

  &__eyebrow {
    @include eyebrow;
    color: $gold;
  }

  &__title {
    @include display-xl;
    color: $white;
    max-width: 22ch;

    &::after {
      content: '';
      display: block;
      width: 4.5rem;
      height: 2px;
      margin-top: $sp-4;
      background: $grad-gold;
      border-radius: $r-pill;
    }
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
}

/* ---------- 02. GRATUITOS ---------- */
.free {
  @include section-pad;
  background: $navy-soft;

  &__container {
    @include container;
    @include col($sp-6);
    align-items: flex-start;
  }

  &__row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $sp-4;
    width: 100%;
  }

  &__card {
    @include card-surface;
    @include col($sp-3);
    flex: 1 1 100%;
    padding: $sp-5;

    @include from($bp-md) {
      flex: 1 1 calc(33.333% - #{$sp-4} * 2 / 3);
    }
  }

  &__card-icon {
    font-size: 1.25rem;
    line-height: 1;
    color: $cyan;
  }

  &__card-title {
    @include body;
    color: $muted-strong;
    font-weight: 500;
  }
}

/* ---------- 03. TOPICS ---------- */
.topics {
  @include section-pad;
  // sección clara: rompe el "todo azul" y da respiro visual al recorrido oscuro
  background: $bone;

  &__container {
    @include container;
    @include col($sp-6);
  }

  // SectionHeader trae colores pensados para fondo oscuro por defecto;
  // se fuerza el contraste correcto sobre fondo claro.
  :deep(.section-header__eyebrow) {
    color: $blue;
  }

  :deep(.section-header__title) {
    color: $ink;
  }

  :deep(.section-header__subtitle) {
    color: rgba($ink, 0.7);
  }

  &__row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $sp-4;
  }

  &__card {
    @include col($sp-2);
    flex: 1 1 100%;
    padding: $sp-5;
    text-align: left;
    align-items: flex-start;
    background: $white;
    border: 1px solid $bone-line;
    border-radius: $r-lg;
    transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      border-color: rgba($blue, 0.4);
      box-shadow: 0 12px 28px rgba($ink, 0.08);
      transform: translateY(-3px);
    }

    @include from($bp-md) {
      flex: 1 1 calc(50% - #{$sp-4} / 2);
    }

    @include from($bp-lg) {
      flex: 1 1 calc(33.333% - #{$sp-4} * 2 / 3);
    }
  }

  &__icon {
    font-size: 1.25rem;
    line-height: 1;
    color: $blue;
  }

  &__title {
    font-family: $font-display;
    font-size: 1.05rem;
    font-weight: 600;
    color: $ink;
  }

  &__copy {
    @include body;
    color: rgba($ink, 0.7);
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    gap: $sp-2;
    font-family: $font-accent;
    font-weight: 600;
    font-size: 0.85rem;
    color: $blue;
    padding-top: $sp-2;
  }
}

/* ---------- 04. LA TIENDA ---------- */
.store-banner {
  @include section-pad;

  &__container {
    @include container;
    display: flex;
    justify-content: center;
  }

  :deep(.section-header) {
    max-width: 52ch;
  }

  :deep(.section-header__title) {
    color: $white;
  }
}

/* ---------- 05. DE APRENDER A ACTUAR ---------- */
.cta-journey {
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

  &__card {
    @include card-surface;
    @include col($sp-3);
    flex: 1 1 100%;
    padding: $sp-5;

    @include from($bp-md) {
      flex: 1 1 calc(33.333% - #{$sp-5} * 2 / 3);
    }
  }

  &__icon {
    font-size: 1.25rem;
    line-height: 1;
    color: $cyan;
  }

  &__question {
    @include eyebrow;
    color: $muted-strong;
    text-transform: none;
    letter-spacing: normal;
    font-family: $font-body;
    font-size: 0.9rem;
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

  &__tagline {
    @include eyebrow;
    text-align: center;
    font-size: 0.85rem;
    color: $accent;
  }
}
</style>
