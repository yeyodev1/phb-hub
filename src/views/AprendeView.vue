<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import JourneyPath from '@/components/ui/JourneyPath.vue'
import ResourceCard from '@/components/ui/ResourceCard.vue'
import { EXTERNAL } from '@/config/destinations'

/* ------------------------------------------------------------------ */
/* Tipos                                                                */
/* ------------------------------------------------------------------ */
interface Resource {
  format: string
  title: string
  description: string
  learn?: string
  audience?: string
  duration?: string
  cta: string
  href?: string
  to?: string
  badge?: string
  /** temas asociados, usados por el buscador y los filtros de chips */
  tags: string[]
}

type FilterKey =
  | 'todos'
  | 'libros'
  | 'guias'
  | 'cursos'
  | 'masterclasses'
  | 'biomarcadores'
  | 'prevencion'
  | 'regeneracion'
  | 'longevidad'

interface Filter {
  key: FilterKey
  label: string
}

interface TopicCard {
  icon: string
  title: string
  copy: string
  cta: string
  filter: FilterKey
}

interface FreeResource {
  title: string
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
/* 01. HERO — búsqueda y filtros                                       */
/* ------------------------------------------------------------------ */
const searchQuery = ref('')
const activeFilter = ref<FilterKey>('todos')

const filters: Filter[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'libros', label: 'Libros' },
  { key: 'guias', label: 'Guías' },
  { key: 'cursos', label: 'Cursos' },
  { key: 'masterclasses', label: 'Masterclasses' },
  { key: 'biomarcadores', label: 'Biomarcadores' },
  { key: 'prevencion', label: 'Prevención' },
  { key: 'regeneracion', label: 'Regeneración' },
  { key: 'longevidad', label: 'Longevidad' },
]

function selectFilter(key: FilterKey) {
  activeFilter.value = key
}

function goToLibrary(key: FilterKey) {
  selectFilter(key)
  const el = document.getElementById('biblioteca')
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ------------------------------------------------------------------ */
/* 02. BIBLIOTECA                                                       */
/* ------------------------------------------------------------------ */
const comienzaAqui: Resource[] = [
  {
    format: 'PDF / E-book',
    title: 'Todavía no estoy tan mal',
    description:
      'Guía para reconocer las señales de deterioro que muchas veces normalizamos o postergamos.',
    cta: 'Conocer más',
    href: EXTERNAL.store,
    badge: 'Más vendido',
    tags: ['libros', 'prevencion'],
  },
  {
    format: 'Guía digital',
    title: '50 biomarcadores que deberías conocer',
    description:
      'Una guía práctica para comprender qué pueden decir tus análisis acerca de tu salud metabólica, cardiovascular, inflamatoria y funcional.',
    learn:
      'Cuáles son los principales indicadores que pueden ayudarte a entender tu estado metabólico, cardiovascular e inflamatorio.',
    audience: 'Recibes estudios de laboratorio pero no sabes qué información importante buscar.',
    duration: '42 páginas · Lectura 60 min',
    cta: 'Quiero aprender',
    href: EXTERNAL.store,
    tags: ['guias', 'biomarcadores'],
  },
  {
    format: 'Masterclass',
    title: 'Cómo entender mejor tus análisis clínicos',
    description:
      'Aprende qué estás viendo cuando recibes tus resultados y qué preguntas deberías hacer antes de ignorarlos o interpretarlos por tu cuenta.',
    cta: 'Ver masterclass',
    href: EXTERNAL.store,
    tags: ['masterclasses', 'biomarcadores'],
  },
]

const masPopulares: Resource[] = [
  {
    format: 'Curso',
    title: 'Prevenir antes de enfermar',
    description:
      'Un recorrido por los factores de riesgo que se acumulan en silencio, mucho antes de que aparezca un diagnóstico.',
    learn: 'Cómo identificar riesgos acumulados antes de que se conviertan en enfermedad manifiesta.',
    audience: 'Te sientes bien hoy, pero quieres entender qué estás construyendo a futuro.',
    duration: '6 módulos · 3 horas',
    cta: 'Quiero aprender',
    href: EXTERNAL.store,
    tags: ['cursos', 'prevencion'],
  },
  {
    format: 'Guía digital',
    title: 'Medicina conductual aplicada',
    description:
      'Por qué saber que necesitas cambiar no siempre significa que vas a hacerlo, y qué puedes hacer al respecto.',
    learn: 'Los mecanismos detrás de la postergación y cómo diseñar cambios que sí se sostienen.',
    audience: 'Ya sabes qué deberías cambiar, pero no logras que el cambio dure.',
    duration: '28 páginas · Lectura 40 min',
    cta: 'Quiero aprender',
    href: EXTERNAL.store,
    tags: ['guias'],
  },
  {
    format: 'Masterclass',
    title: 'Longevidad productiva',
    description:
      'Pensar más allá de vivir más años: cómo preservar energía, función y autonomía en el largo plazo.',
    learn: 'Qué factores sostienen tu capacidad funcional y productiva con el paso del tiempo.',
    audience: 'Te interesa envejecer con función, no solamente con más años.',
    duration: '1 h 15 min',
    cta: 'Ver masterclass',
    href: EXTERNAL.store,
    tags: ['masterclasses', 'longevidad'],
  },
]

const nuevos: Resource[] = [
  {
    format: 'Curso',
    title: 'Introducción a la medicina regenerativa',
    description:
      'Los fundamentos de un campo en expansión: qué es, qué promete y qué se sabe hoy con evidencia.',
    learn: 'Los principios básicos de adaptación, reparación y regeneración celular.',
    audience: 'Quieres entender el tema antes de considerar cualquier intervención.',
    duration: '5 módulos · 2.5 horas',
    cta: 'Quiero aprender',
    href: EXTERNAL.store,
    tags: ['cursos', 'regeneracion'],
    badge: 'Nuevo',
  },
  {
    format: 'Guía digital',
    title: 'Psicología de la salud para pacientes',
    description:
      'Cómo influyen tus creencias, tu entorno y tus emociones en las decisiones que tomas sobre tu cuerpo.',
    learn: 'De qué manera tu estado emocional condiciona tu adherencia y tus hábitos.',
    audience: 'Sientes que la parte emocional pesa tanto como la física en tu salud.',
    duration: '24 páginas · Lectura 35 min',
    cta: 'Quiero aprender',
    href: EXTERNAL.store,
    tags: ['guias'],
    badge: 'Nuevo',
  },
  {
    format: 'Masterclass',
    title: 'Health Intelligence: leer tu propio cuerpo',
    description:
      'Cómo convertir datos dispersos de salud en una imagen clara de dónde estás y hacia dónde vas.',
    learn: 'Un método para conectar biomarcadores, hábitos y antecedentes en una sola lectura.',
    audience: 'Tienes datos de salud, pero no una forma de interpretarlos en conjunto.',
    duration: '55 min',
    cta: 'Ver masterclass',
    href: EXTERNAL.store,
    tags: ['masterclasses', 'biomarcadores', 'longevidad'],
    badge: 'Nuevo',
  },
]

function matchesFilter(resource: Resource): boolean {
  if (activeFilter.value === 'todos') return true
  return resource.tags.includes(activeFilter.value)
}

function matchesSearch(resource: Resource): boolean {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return true
  return (
    resource.title.toLowerCase().includes(q) ||
    resource.description.toLowerCase().includes(q) ||
    resource.tags.some((tag) => tag.includes(q))
  )
}

const comienzaAquiFiltrado = computed(() => comienzaAqui.filter((r) => matchesFilter(r) && matchesSearch(r)))
const masPopularesFiltrado = computed(() => masPopulares.filter((r) => matchesFilter(r) && matchesSearch(r)))
const nuevosFiltrado = computed(() => nuevos.filter((r) => matchesFilter(r) && matchesSearch(r)))

const totalVisible = computed(
  () => comienzaAquiFiltrado.value.length + masPopularesFiltrado.value.length + nuevosFiltrado.value.length,
)

/* ------------------------------------------------------------------ */
/* 03. GRATUITOS                                                        */
/* ------------------------------------------------------------------ */
const freeResources: FreeResource[] = [
  { title: 'Checklist: 20 señales de que deberías evaluar mejor tu salud' },
  { title: 'Mini guía: 10 biomarcadores que no deberías ignorar' },
  { title: 'Evaluación: ¿Estoy realmente cuidando mi salud o solo reaccionando cuando algo sucede?' },
]

const freeEmail = ref('')
const freeWhatsapp = ref('')
const sent = ref(false)

function submitFreeForm() {
  if (!freeEmail.value.trim()) return
  sent.value = true
}

/* ------------------------------------------------------------------ */
/* 04. ¿QUÉ QUIERES ENTENDER MEJOR?                                     */
/* ------------------------------------------------------------------ */
const topicCards: TopicCard[] = [
  {
    icon: 'fa-solid fa-droplet',
    title: 'Mis biomarcadores',
    copy: 'Aprende qué información pueden aportar glucosa, insulina, HbA1c, inflamación, lípidos, función renal, hormonas y otros indicadores.',
    cta: 'Explorar biomarcadores',
    filter: 'biomarcadores',
  },
  {
    icon: 'fa-solid fa-heart-pulse',
    title: 'Mi riesgo de enfermedad',
    copy: 'Comprende cómo ciertos factores pueden acumularse durante años antes de convertirse en enfermedad manifiesta.',
    cta: 'Explorar prevención',
    filter: 'prevencion',
  },
  {
    icon: 'fa-solid fa-brain',
    title: 'Mi comportamiento',
    copy: 'Entiende por qué saber que necesitas cambiar no necesariamente significa que vas a hacerlo.',
    cta: 'Explorar medicina conductual',
    filter: 'todos',
  },
  {
    icon: 'fa-solid fa-dna',
    title: 'Mi capacidad de recuperación',
    copy: 'Conoce los factores relacionados con adaptación, reparación, función y medicina regenerativa.',
    cta: 'Explorar regeneración',
    filter: 'regeneracion',
  },
  {
    icon: 'fa-solid fa-hourglass-half',
    title: 'Mi longevidad',
    copy: 'Aprende a pensar más allá de vivir más años: preservar energía, función, autonomía y productividad.',
    cta: 'Explorar longevidad',
    filter: 'longevidad',
  },
  {
    icon: 'fa-solid fa-microscope',
    title: 'Nuevas tecnologías y tratamientos',
    copy: 'Explora avances que estoy estudiando en prevención, diagnóstico, tecnología, terapias y medicina regenerativa.',
    cta: 'Explorar innovación',
    filter: 'todos',
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
    href: EXTERNAL.evaluacion,
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
          <BaseButton variant="primary" size="lg" href="#biblioteca">Explorar biblioteca</BaseButton>
          <BaseButton variant="ghost" size="lg" href="#gratuitos">Ver recursos gratuitos</BaseButton>
        </div>

        <div class="hero__search">
          <input
            v-model="searchQuery"
            type="search"
            class="hero__search-input"
            placeholder="¿Qué quieres aprender hoy? Diabetes, inflamación, células madre, biomarcadores, longevidad…"
            aria-label="Buscar en la biblioteca"
          />
        </div>

        <div class="hero__filters" role="group" aria-label="Filtrar biblioteca">
          <button
            v-for="f in filters"
            :key="f.key"
            type="button"
            class="hero__chip"
            :class="{ 'hero__chip--active': activeFilter === f.key }"
            @click="selectFilter(f.key)"
          >
            {{ f.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- 02. EXPLORA LA BIBLIOTECA -->
    <section id="biblioteca" class="library">
      <div class="library__container">
        <SectionHeader
          eyebrow="Biblioteca"
          title="Explora la biblioteca"
          subtitle="Libros, guías, cursos y masterclasses organizados por dónde estás en tu proceso de aprendizaje."
        />

        <p v-if="!totalVisible" class="library__empty">
          No encontramos recursos con esa búsqueda o filtro. Prueba con otro término.
        </p>

        <div v-if="comienzaAquiFiltrado.length" class="library__group">
          <h3 class="library__group-title">Comienza aquí</h3>
          <div class="library__row">
            <ResourceCard
              v-for="r in comienzaAquiFiltrado"
              :key="r.title"
              class="library__item"
              :format="r.format"
              :title="r.title"
              :description="r.description"
              :learn="r.learn"
              :audience="r.audience"
              :duration="r.duration"
              :cta="r.cta"
              :href="r.href"
              :to="r.to"
              :badge="r.badge"
            />
          </div>
        </div>

        <div v-if="masPopularesFiltrado.length" class="library__group">
          <h3 class="library__group-title">Más populares</h3>
          <div class="library__row">
            <ResourceCard
              v-for="r in masPopularesFiltrado"
              :key="r.title"
              class="library__item"
              :format="r.format"
              :title="r.title"
              :description="r.description"
              :learn="r.learn"
              :audience="r.audience"
              :duration="r.duration"
              :cta="r.cta"
              :href="r.href"
              :to="r.to"
              :badge="r.badge"
            />
          </div>
        </div>

        <div v-if="nuevosFiltrado.length" class="library__group">
          <h3 class="library__group-title">Nuevos</h3>
          <div class="library__row">
            <ResourceCard
              v-for="r in nuevosFiltrado"
              :key="r.title"
              class="library__item"
              :format="r.format"
              :title="r.title"
              :description="r.description"
              :learn="r.learn"
              :audience="r.audience"
              :duration="r.duration"
              :cta="r.cta"
              :href="r.href"
              :to="r.to"
              :badge="r.badge"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 03. GRATUITOS -->
    <section id="gratuitos" class="free">
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

        <div class="free__form-wrap">
          <form v-if="!sent" class="free__form" @submit.prevent="submitFreeForm">
            <input
              v-model="freeEmail"
              type="email"
              required
              class="free__input"
              placeholder="Tu correo electrónico"
              aria-label="Correo electrónico"
            />
            <input
              v-model="freeWhatsapp"
              type="tel"
              class="free__input"
              placeholder="Tu WhatsApp (opcional)"
              aria-label="WhatsApp"
            />
            <BaseButton variant="primary" size="lg">Descargar gratis</BaseButton>
          </form>
          <p v-else class="free__confirm">
            Listo. Revisa tu correo: te enviamos tus recursos gratuitos en los próximos minutos.
          </p>
        </div>
      </div>
    </section>

    <!-- 04. ¿QUÉ QUIERES ENTENDER MEJOR? -->
    <section class="topics">
      <div class="topics__container">
        <SectionHeader
          eyebrow="Explora por tema"
          title="¿Qué quieres entender mejor?"
          subtitle="Elige un tema y te llevamos directo a los recursos relacionados en la biblioteca."
        />

        <div class="topics__row">
          <button
            v-for="t in topicCards"
            :key="t.title"
            type="button"
            class="topics__card"
            @click="goToLibrary(t.filter)"
          >
            <i class="topics__icon" :class="t.icon" aria-hidden="true"></i>
            <h3 class="topics__title">{{ t.title }}</h3>
            <p class="topics__copy">{{ t.copy }}</p>
            <span class="topics__cta">{{ t.cta }} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
          </button>
        </div>
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

  &__search {
    width: 100%;
  }

  &__search-input {
    width: 100%;
    background: rgba($surface, 0.7);
    border: 1px solid $line-strong;
    border-radius: $r-pill;
    padding: $sp-4 $sp-5;
    color: $white;
    font-family: $font-body;
    font-size: 0.95rem;
    @include focus-ring;

    &::placeholder {
      color: $muted;
    }
  }

  &__filters {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $sp-2;
  }

  &__chip {
    font-family: $font-accent;
    font-size: 0.78rem;
    font-weight: 600;
    color: $muted-strong;
    background: rgba($white, 0.04);
    border: 1px solid $line;
    border-radius: $r-pill;
    padding: 0.55rem 1.1rem;
    transition: border-color 0.18s ease, color 0.18s ease, background 0.18s ease;
    @include focus-ring;

    &:hover {
      border-color: $cyan;
      color: $white;
    }

    &--active {
      background: $grad-accent;
      border-color: transparent;
      color: $ink;
    }
  }
}

/* ---------- 02. BIBLIOTECA ---------- */
.library {
  @include section-pad;

  &__container {
    @include container;
    @include col($sp-7);
  }

  &__empty {
    @include body-lg;
  }

  &__group {
    @include col($sp-5);
  }

  &__group-title {
    font-family: $font-display;
    font-size: 1.15rem;
    font-weight: 600;
    color: $white;
  }

  &__row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $sp-5;
  }

  &__item {
    flex: 1 1 100%;

    @include from($bp-md) {
      flex: 1 1 calc(50% - #{$sp-5} / 2);
    }

    @include from($bp-lg) {
      flex: 1 1 calc(33.333% - #{$sp-5} * 2 / 3);
    }

    // acento de autoridad: badges destacadas ("Más vendido", "Nuevo") en dorado
    :deep(.resource__badge) {
      color: $gold;
      border-color: rgba($gold, 0.4);
    }
  }
}

/* ---------- 03. GRATUITOS ---------- */
.free {
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
    gap: $sp-4;
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

  &__form-wrap {
    @include card-surface;
    padding: $sp-6;
  }

  &__form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $sp-3;
    align-items: stretch;

    > * {
      flex: 1 1 100%;
    }

    @include from($bp-md) {
      align-items: center;

      > * {
        flex: 1 1 calc(33.333% - #{$sp-3} * 2 / 3);
      }
    }
  }

  &__input {
    background: rgba($ink, 0.5);
    border: 1px solid $line-strong;
    border-radius: $r-md;
    padding: $sp-4;
    color: $white;
    font-family: $font-body;
    font-size: 0.9rem;
    @include focus-ring;

    &::placeholder {
      color: $muted;
    }
  }

  &__confirm {
    @include body-lg;
    color: $accent;
  }
}

/* ---------- 04. TOPICS ---------- */
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
