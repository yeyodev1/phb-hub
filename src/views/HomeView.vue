<script setup lang="ts">
import { ref } from 'vue'
import HeroSection from '@/components/home/HeroSection.vue'
import IntentSelector from '@/components/home/IntentSelector.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import JourneyPath from '@/components/ui/JourneyPath.vue'
import ResourceCard from '@/components/ui/ResourceCard.vue'
import { EXTERNAL } from '@/config/destinations'
import { JUAN } from '@/config/media'

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

interface Ladder {
  stage: string
  layer: string
  copy: string
}

interface Brand {
  name: string
  role: string
  promise: string
}

const WORLDS: World[] = [
  {
    key: 'aprende',
    icon: 'fa-solid fa-book-open',
    name: 'Aprende',
    claim: 'Comprender',
    copy: 'Libros, guías, cursos y masterclasses para entender tu cuerpo y reconocer riesgos a tiempo.',
    cta: 'Explorar biblioteca',
    to: '/aprende',
  },
  {
    key: 'evalua',
    icon: 'fa-solid fa-chart-simple',
    name: 'Evalúate',
    claim: 'Medir',
    copy: 'Evaluaciones PHB que convierten síntomas, antecedentes y biomarcadores en prioridades claras.',
    cta: 'Evaluar mi salud',
    href: EXTERNAL.evaluacion,
  },
  {
    key: 'actua',
    icon: 'fa-solid fa-bolt',
    name: 'Actúa',
    claim: 'Cambiar',
    copy: 'Programas conductuales de 30 días para convertir intención en comportamiento sostenido.',
    cta: 'Conocer ACTÚA',
    to: '/actua',
  },
  {
    key: 'regenera',
    icon: 'fa-solid fa-dna',
    name: 'Regenera',
    claim: 'Intervenir',
    copy: 'Programas clínicos regenerativos que se evalúan antes de proponerse. Nunca se compran a ciegas.',
    cta: 'Evaluar mi candidatura',
    to: '/regeneracion',
  },
]

const LADDER: Ladder[] = [
  {
    stage: 'MEDIA',
    layer: 'Contenido gratuito',
    copy: 'Checklists, mini guías y evaluaciones abiertas para reconocer señales.',
  },
  {
    stage: 'EDUCATION',
    layer: 'Libros, guías y cursos',
    copy: 'Comprensión estructurada de biomarcadores, riesgo, conducta y longevidad.',
  },
  {
    stage: 'ASSESSMENT',
    layer: 'Evaluación PHB',
    copy: 'De información fragmentada a una fotografía clara de dónde estás hoy.',
  },
  {
    stage: 'BEHAVIOR CHANGE',
    layer: 'PHB ACTÚA™',
    copy: 'Acompañamiento conductual para sostener el cambio, no solo iniciarlo.',
  },
  {
    stage: 'CLINICAL CARE',
    layer: 'Programas regenerativos',
    copy: 'Cuando existe indicación clínica, se ejecuta con criterio y seguimiento.',
  },
]

const BRANDS: Brand[] = [
  {
    name: 'Juan Román Garza',
    role: 'Autoridad · Comunicación · Educación',
    promise: 'Te enseño a entender y transformar tu relación con tu salud.',
  },
  {
    name: 'PHB',
    role: 'Inteligencia · Medición · Decisión',
    promise: 'Te ayudamos a entender dónde estás y qué deberías priorizar.',
  },
  {
    name: 'PHB ACTÚA',
    role: 'Conducta',
    promise: 'Te ayudamos a convertir conocimiento en acción.',
  },
  {
    name: 'Red clínica',
    role: 'Intervención',
    promise: 'Cuando existe una indicación clínica, se ejecuta.',
  },
]

const freeEmail = ref('')
const freeSent = ref(false)

function submitFree() {
  if (!/^\S+@\S+\.\S+$/.test(freeEmail.value.trim())) return
  freeSent.value = true
}

function scrollToIntents() {
  document.getElementById('explorar')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="home">
    <HeroSection @explore="scrollToIntents" />

    <IntentSelector />

    <!-- 4 MUNDOS -->
    <section class="worlds">
      <div class="worlds__inner">
        <SectionHeader
          eyebrow="El ecosistema"
          title="Cuatro mundos, un mismo recorrido."
          subtitle="Aprende → Evalúate → Actúa → Regenera. Cada pieza existe porque la anterior no basta por sí sola."
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

    <!-- AUTORIDAD -->
    <section class="author">
      <div class="author__inner">
        <p class="author__eyebrow">Quién está detrás</p>
        <h2 class="author__title">
          ¿Por qué algunas personas logran cambiar y otras continúan deteriorándose aun
          sabiendo que necesitan actuar?
        </h2>
        <div class="author__body">
          <p>
            La respuesta no está solamente en la medicina. Está en la interacción entre
            conducta y biología. En cómo interpretamos nuestra salud. En las decisiones que
            tomamos —o postergamos— cada día.
          </p>
          <p>
            Esta búsqueda me llevó a integrar psicología de la salud, medicina conductual,
            biomarcadores, prevención, tecnología, inteligencia clínica y medicina
            regenerativa bajo una misma filosofía.
          </p>
          <p class="author__quote">
            Porque el futuro de tu salud no depende únicamente de lo que sabes. Depende de
            lo que decides hacer con lo que sabes.
          </p>
          <p class="author__sign">— Juan Román Garza</p>
        </div>
        <JourneyPath />
      </div>

      <figure class="author__figure">
        <img
          :src="JUAN.seated"
          alt="Juan Román Garza, retrato de cuerpo completo"
          loading="lazy"
        />
      </figure>
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
              :href="EXTERNAL.evaluacion"
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

    <!-- ESCALERA -->
    <section class="ladder">
      <div class="ladder__inner">
        <SectionHeader
          eyebrow="La ruta completa"
          title="De la información a la intervención."
          subtitle="Nadie llega directo a un tratamiento. Cada escalón existe para que la siguiente decisión sea mejor que la anterior."
        />

        <ol class="ladder__list">
          <li v-for="(l, i) in LADDER" :key="l.stage" class="ladder__step">
            <span class="ladder__index">{{ String(i + 1).padStart(2, '0') }}</span>
            <div class="ladder__content">
              <p class="ladder__stage">{{ l.stage }}</p>
              <h3 class="ladder__layer">{{ l.layer }}</h3>
              <p class="ladder__copy">{{ l.copy }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- MARCAS -->
    <section class="brands">
      <div class="brands__inner">
        <SectionHeader
          eyebrow="Arquitectura de marcas"
          title="Cada marca tiene un trabajo distinto."
        />

        <ul class="brands__list">
          <li v-for="b in BRANDS" :key="b.name" class="brands__item">
            <article class="brand">
              <h3 class="brand__name">{{ b.name }}</h3>
              <p class="brand__role">{{ b.role }}</p>
              <p class="brand__promise">“{{ b.promise }}”</p>
            </article>
          </li>
        </ul>
      </div>
    </section>

    <!-- MEMBRESÍA -->
    <section class="membership">
      <div class="membership__inner">
        <p class="membership__eyebrow">PHB ONE™ · Próximamente</p>
        <h2 class="membership__title">
          Una membresía para no volver a quedarte solo con la información.
        </h2>
        <ul class="membership__perks">
          <li>Masterclass mensual</li>
          <li>Biblioteca de guías</li>
          <li>Sesiones en vivo</li>
          <li>Retos y comunidad</li>
          <li>Evaluaciones periódicas</li>
          <li>Newsletter premium</li>
        </ul>
        <BaseButton variant="ghost" @click="scrollToIntents">
          Quiero enterarme primero
        </BaseButton>
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
            <span class="visually-hidden">Email</span>
            <input
              v-model="freeEmail"
              type="email"
              placeholder="tu@correo.com"
              autocomplete="email"
              required
            />
          </label>
          <BaseButton type="submit" size="lg">Descargar gratis</BaseButton>
        </form>

        <p v-else class="free__done">
          Listo. Revisa tu correo — te enviamos el checklist y la mini guía.
        </p>
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

/* --- 4 MUNDOS --- */
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

/* --- AUTORIDAD --- */
.author {
  @include section-pad;
  background: linear-gradient(180deg, $navy 0%, $navy-soft 100%);
  display: flex;
  flex-direction: column;
  gap: $sp-6;

  @include from($bp-lg) {
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;
    gap: $sp-8;
    padding-inline: $sp-6;
  }

  &__figure {
    @include container;
    display: flex;

    @include from($bp-lg) {
      flex: 0 1 360px;
      padding-inline: 0;
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

  &__inner {
    @include container;
    @include col($sp-5);
    max-width: 820px;

    @include from($bp-lg) {
      flex: 1 1 640px;
      padding-inline: 0;
    }
  }

  &__eyebrow {
    @include eyebrow;
  }

  &__title {
    @include display-lg;
    color: $white;
  }

  &__body {
    @include col($sp-4);

    p {
      @include body-lg;
    }
  }

  &__quote {
    padding-left: $sp-4;
    border-left: 2px solid $gold;
    color: $white !important;
    font-family: $font-display;
    font-weight: 500;
  }

  &__sign {
    font-family: $font-accent;
    font-size: 0.8rem;
    letter-spacing: 0.12em;
    color: $gold-soft;
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

/* --- ESCALERA (sección clara: rompe el bloque azul) --- */
.ladder {
  @include section-pad;
  background: $bone;

  &__inner {
    @include container;
    @include col($sp-6);
  }

  // La sección clara necesita invertir el contraste del SectionHeader.
  :deep(.section-header__title) {
    color: $ink;
  }

  :deep(.section-header__subtitle) {
    color: rgba($ink, 0.68);
  }

  :deep(.section-header__eyebrow) {
    color: $gold;
  }

  &__list {
    @include col(0);
  }

  &__step {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: $sp-4;
    padding-block: $sp-5;
    border-top: 1px solid $bone-line;

    &:last-child {
      border-bottom: 1px solid $bone-line;
    }
  }

  &__index {
    flex-shrink: 0;
    font-family: $font-accent;
    font-weight: 700;
    font-size: 0.82rem;
    color: $gold;
    padding-top: 0.25rem;
  }

  &__content {
    @include col($sp-2);
  }

  &__stage {
    @include eyebrow;
    font-size: 0.6rem;
    color: rgba($ink, 0.45);
  }

  &__layer {
    font-family: $font-display;
    font-weight: 600;
    font-size: 1.15rem;
    color: $ink;
  }

  &__copy {
    @include body;
    color: rgba($ink, 0.7);
  }
}

/* --- MARCAS --- */
.brands {
  @include section-pad;
  background: linear-gradient(180deg, $ink 0%, $navy 100%);

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

.brand {
  @include card-surface;
  @include col($sp-2);
  width: 100%;
  padding: $sp-5;

  &__name {
    font-family: $font-display;
    font-weight: 700;
    font-size: 1.05rem;
    letter-spacing: 0.02em;
    color: $white;
  }

  &__role {
    font-family: $font-accent;
    font-size: 0.66rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba($cyan, 0.85);
  }

  &__promise {
    @include body;
    font-style: italic;
  }
}

/* --- MEMBRESÍA --- */
.membership {
  @include section-pad;

  &__inner {
    @include container;
    @include col($sp-4);
    align-items: flex-start;
    max-width: 760px;
  }

  &__eyebrow {
    @include eyebrow;
    color: $gold-soft;
  }

  &__title {
    @include display-lg;
    color: $white;
  }

  &__perks {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $sp-2;

    li {
      font-family: $font-accent;
      font-size: 0.75rem;
      color: $muted-strong;
      border: 1px solid $line-strong;
      border-radius: $r-pill;
      padding: 0.5rem 0.9rem;
    }
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
    max-width: 520px;

    @include from($bp-sm) {
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

  &__done {
    @include body-lg;
    color: $green;
  }
}
</style>
