<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { CONTACT, storeCategory } from '@/config/destinations'
import { JUAN } from '@/config/media'

// Todo el copy de esta página sale textual de "FÓRMATE — PHB ACADEMY™ (parte 1)".

interface Mentor {
  icon: string
  title: string
  copy: string
}

interface Step {
  name: string
  lead: string
  copy?: string
  questions?: string[]
}

interface Area {
  icon: string
  name: string
  copy: string
  courses: string[]
  cta: string
  /** Tema de la tienda para filtrar la categoría Fórmate. */
  theme?: string
}

interface Trait {
  not: string
  but: string
}

interface Perspective {
  name: string
  copy: string
}

const mentors: Mentor[] = [
  {
    icon: 'fa-solid fa-stethoscope',
    title: 'Médicos',
    copy: 'que explican enfermedades, prevención, diagnóstico y tratamiento.',
  },
  {
    icon: 'fa-solid fa-microscope',
    title: 'Científicos e investigadores',
    copy: 'que ayudan a comprender qué sabemos, qué estamos estudiando y dónde siguen existiendo preguntas.',
  },
  {
    icon: 'fa-solid fa-brain',
    title: 'Especialistas en conducta',
    copy: 'que explican por qué saber qué hacer no siempre significa hacerlo.',
  },
  {
    icon: 'fa-solid fa-chart-simple',
    title: 'Expertos en biomarcadores y tecnología',
    copy: 'que ayudan a convertir datos complejos en información comprensible.',
  },
]

const steps: Step[] = [
  {
    name: 'Comprender',
    lead: 'Primero entendemos qué está sucediendo.',
    copy: 'Conceptos médicos y biológicos explicados en lenguaje accesible, sin eliminar su profundidad.',
  },
  {
    name: 'Relacionar',
    lead: 'Después conectamos las piezas.',
    copy: 'Síntomas, hábitos, biomarcadores, sistemas biológicos, comportamiento y riesgos dejan de verse como información aislada.',
  },
  {
    name: 'Aplicar',
    lead: 'El conocimiento debe aterrizar en la vida real.',
    copy: 'Ejercicios, casos, checklists, workbooks y herramientas ayudan a traducir conceptos en acciones y conversaciones útiles.',
  },
  {
    name: 'Preguntar',
    lead: 'Un paciente preparado aprende a hacer mejores preguntas.',
    questions: [
      '¿Qué significa este resultado?',
      '¿Qué opciones existen?',
      '¿Qué riesgos hay?',
      '¿Qué información falta?',
      '¿Qué debería medir nuevamente?',
    ],
  },
  {
    name: 'Decidir',
    lead: 'Comprender mejor permite participar mejor.',
    copy: 'El objetivo no es que el paciente se diagnostique o se trate solo. El objetivo es que tenga más claridad para conversar, evaluar alternativas y tomar decisiones junto con profesionales de la salud.',
  },
]

const formats = [
  { icon: 'fa-solid fa-video', label: 'Clases en video' },
  { icon: 'fa-solid fa-book', label: 'Workbook' },
  { icon: 'fa-solid fa-chart-column', label: 'Diagramas y visualizaciones' },
  { icon: 'fa-solid fa-puzzle-piece', label: 'Casos prácticos' },
  { icon: 'fa-solid fa-circle-question', label: 'Cuestionarios' },
  { icon: 'fa-solid fa-brain', label: 'Ejercicios de reflexión' },
  { icon: 'fa-solid fa-book-open', label: 'Lecturas recomendadas' },
  { icon: 'fa-solid fa-microphone', label: 'Entrevistas con especialistas' },
  { icon: 'fa-solid fa-user-doctor', label: 'Sesiones con médicos' },
  { icon: 'fa-solid fa-flask', label: 'Conversaciones con investigadores' },
  { icon: 'fa-solid fa-users', label: 'Sesiones grupales' },
  { icon: 'fa-solid fa-medal', label: 'Certificado de finalización' },
]

const areas: Area[] = [
  {
    icon: 'fa-solid fa-brain',
    name: 'Conducta y psicología de la salud',
    copy: 'Comprende por qué sabes que necesitas cambiar y aun así puedes continuar postergándolo.',
    courses: [
      'Medicina Conductual Aplicada™',
      'Psicología de la Salud para Pacientes',
      'De Saber a Hacer™',
      'Procrastinación en Salud',
    ],
    cta: 'Explorar conducta',
    theme: 'comportamiento',
  },
  {
    icon: 'fa-solid fa-chart-simple',
    name: 'Health Intelligence & biomarcadores',
    copy: 'Aprende a entender mejor la información que produce tu cuerpo.',
    courses: [
      'PHB Health Intelligence™',
      'Biomarkers Mastery™',
      'Laboratorios 101',
      'Cómo entender tu salud como un sistema',
    ],
    cta: 'Explorar Health Intelligence',
    theme: 'biomarcadores',
  },
  {
    icon: 'fa-solid fa-heart-pulse',
    name: 'Prevención y salud metabólica',
    copy: 'Comprende cómo reconocer factores de riesgo antes de que una enfermedad avance.',
    courses: [
      'Preventive Health Blueprint™',
      'Metabolic Health Masterclass',
      'Prevención Cardiometabólica',
      'Prevención Personalizada 40+',
    ],
    cta: 'Explorar prevención',
    theme: 'prevencion',
  },
  {
    icon: 'fa-solid fa-hourglass-half',
    name: 'Longevidad productiva',
    copy: 'Aprende a pensar la longevidad en términos de función, energía, autonomía y capacidad.',
    courses: [
      'Longevidad Productiva™',
      'Healthspan Strategy™',
      'Cognitive Longevity™',
      'Muscle, Strength & Longevity',
    ],
    cta: 'Explorar longevidad',
    theme: 'longevidad',
  },
  {
    icon: 'fa-solid fa-dna',
    name: 'Medicina regenerativa',
    copy: 'Comprende qué es, qué se está investigando y cómo evaluar mejor una intervención.',
    courses: [
      'Introducción a la Medicina Regenerativa',
      'Stem Cells 101',
      'Exosomes 101',
      'Decision Before Regeneration™',
    ],
    cta: 'Explorar regeneración',
    theme: 'regeneracion',
  },
  {
    icon: 'fa-solid fa-compass',
    name: 'Decisiones en salud',
    copy: 'Aprende a evaluar información, opciones y preguntas antes de tomar decisiones importantes.',
    courses: [
      'Decisiones Inteligentes para tu Salud™',
      'Decision Before Intervention™',
      'Evidence Literacy for Patients™',
      'Cómo investigar tratamientos',
    ],
    cta: 'Explorar decisiones',
  },
]

const traits: Trait[] = [
  { not: 'No pretende saber más que su médico.', but: 'Pero tampoco renuncia a comprender.' },
  { not: 'No se autodiagnostica con internet.', but: 'Pero aprende a investigar con criterio.' },
  { not: 'No decide tratamientos solo.', but: 'Pero sabe hacer preguntas antes de aceptarlos.' },
  {
    not: 'No espera necesariamente a sentirse mal.',
    but: 'Aprende a pensar en prevención, riesgo y seguimiento.',
  },
  { not: 'No acumula estudios sin comprenderlos.', but: 'Busca contexto, tendencias y significado.' },
  { not: 'No delega completamente su salud.', but: 'Participa activamente en ella.' },
]

const perspectives: Perspective[] = [
  { name: 'Médicos', copy: 'Experiencia clínica y comprensión del paciente.' },
  { name: 'Científicos', copy: 'Biología, mecanismos y conocimiento fundamental.' },
  { name: 'Investigadores', copy: 'Evidencia, estudios y preguntas todavía abiertas.' },
  { name: 'Profesionales de la conducta', copy: 'Cómo las personas realmente cambian —o no cambian.' },
  {
    name: 'Juan Román Garza',
    copy: 'Integra, cuestiona, conecta y traduce estas perspectivas en un lenguaje que el paciente pueda utilizar.',
  },
]

const academyUrl = storeCategory('formate')
</script>

<template>
  <div class="formate">
    <!-- 01. TU SALUD ES TU RESPONSABILIDAD -->
    <section class="hero">
      <div class="hero__inner">
        <div class="hero__text">
          <p class="hero__eyebrow">Juan Román Garza × PHB Academy™</p>
          <h1 class="hero__title">No necesitas ser médico para aprender a cuidar mejor tu cuerpo.</h1>
          <p class="hero__sub">
            PHB Academy reúne cursos y programas educativos diseñados para pacientes responsables
            que quieren comprender mejor su salud, interpretar información con mayor criterio,
            hacer mejores preguntas y participar activamente en las decisiones que afectan su
            bienestar, prevención y longevidad.
          </p>
          <p class="hero__support">
            Aprender sobre tu salud no significa sustituir al médico; significa llegar mejor
            preparado para trabajar junto a él.
          </p>
          <div class="hero__ctas">
            <BaseButton size="lg" :href="academyUrl">Explorar programas</BaseButton>
            <BaseButton variant="ghost" size="lg" :href="CONTACT.whatsappFormate">
              Encontrar mi formación
            </BaseButton>
          </div>
        </div>

        <figure class="hero__figure">
          <img
            :src="JUAN.masterclass"
            alt="Juan Román Garza impartiendo una masterclass sobre medicina del futuro"
            loading="lazy"
          />
        </figure>
      </div>

      <div class="mentors">
        <p class="mentors__label">Aprende junto a:</p>
        <ul class="mentors__list">
          <li v-for="m in mentors" :key="m.title" class="mentors__item">
            <i :class="m.icon" aria-hidden="true"></i>
            <p>
              <strong>{{ m.title }}</strong>
              {{ m.copy }}
            </p>
          </li>
        </ul>
      </div>
    </section>

    <!-- 02. CIENCIA SIMPLIFICADA PARA PERSONAS REALES -->
    <section class="method">
      <div class="method__inner">
        <SectionHeader
          eyebrow="El método PHB Academy™"
          title="Lo complejo puede explicarse sin hacerlo superficial."
        />

        <div class="method__copy">
          <p>La medicina, la biología y la ciencia de la salud pueden ser complejas.</p>
          <p>Pero eso no significa que deban permanecer incomprensibles para el paciente.</p>
          <p>
            En PHB Academy, médicos, científicos, investigadores y especialistas trabajan junto a
            Juan Román Garza para transformar conceptos técnicos en experiencias educativas
            claras, visuales y aplicables.
          </p>
        </div>

        <p class="method__philosophy">
          Comprender → Relacionar → Aplicar → Preguntar → Decidir
        </p>

        <ol class="method__steps">
          <li v-for="(s, i) in steps" :key="s.name" class="method__step">
            <span class="method__index">{{ String(i + 1).padStart(2, '0') }}</span>
            <p class="method__name">{{ s.name }}</p>
            <p class="method__lead">{{ s.lead }}</p>
            <p v-if="s.copy" class="method__text">{{ s.copy }}</p>
            <ul v-if="s.questions" class="method__questions">
              <li v-for="q in s.questions" :key="q">{{ q }}</li>
            </ul>
          </li>
        </ol>

        <div class="formats">
          <p class="formats__label">Formato pedagógico de los programas · cada formación puede combinar:</p>
          <ul class="formats__list">
            <li v-for="f in formats" :key="f.label">
              <i :class="f.icon" aria-hidden="true"></i>
              {{ f.label }}
            </li>
          </ul>
        </div>

        <div class="method__highlight">
          <p class="method__highlight-title">No buscamos simplificar la ciencia hasta hacerla incorrecta.</p>
          <p>Buscamos explicarla hasta hacerla comprensible.</p>
        </div>
      </div>
    </section>

    <!-- 03. EXPLORA PHB ACADEMY -->
    <section class="areas">
      <div class="areas__inner">
        <SectionHeader
          eyebrow="Explora PHB Academy"
          title="¿Qué quieres entender mejor?"
          subtitle="Elige un área y avanza desde los fundamentos hasta programas de mayor profundidad."
        />

        <ul class="areas__list">
          <li v-for="a in areas" :key="a.name" class="areas__item">
            <a :href="storeCategory('formate', a.theme)" target="_blank" rel="noopener" class="area">
              <span class="area__icon" aria-hidden="true"><i :class="a.icon"></i></span>
              <h3 class="area__name">{{ a.name }}</h3>
              <p class="area__copy">{{ a.copy }}</p>
              <ul class="area__courses">
                <li v-for="c in a.courses" :key="c">{{ c }}</li>
              </ul>
              <span class="area__cta">
                {{ a.cta }} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>

    <!-- 04. EL PACIENTE RESPONSABLE -->
    <section class="patient">
      <div class="patient__inner">
        <SectionHeader
          eyebrow="The Responsible Patient™"
          title="Tu médico puede acompañarte. Pero nadie puede responsabilizarse de tu salud por ti."
        />

        <div class="patient__copy">
          <p>Durante décadas, muchas personas aprendieron a relacionarse con la medicina de manera pasiva:</p>
          <p>
            sentirse mal, acudir al médico, recibir instrucciones y regresar cuando aparece el
            siguiente problema.
          </p>
          <p class="patient__copy-strong">PHB Academy propone algo diferente.</p>
        </div>

        <p class="patient__subtitle">Un paciente responsable:</p>
        <ul class="patient__traits">
          <li v-for="t in traits" :key="t.not" class="patient__trait">
            <p class="patient__not">{{ t.not }}</p>
            <p class="patient__but">{{ t.but }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- BLOQUE DE AUTORIDAD -->
    <section class="authority">
      <div class="authority__inner">
        <SectionHeader
          title="Aprender de quienes dedican su vida a estudiar estas preguntas."
          subtitle="Cada programa puede reunir distintas perspectivas:"
        />

        <ul class="authority__list">
          <li
            v-for="p in perspectives"
            :key="p.name"
            class="authority__item"
            :class="{ 'authority__item--lead': p.name === 'Juan Román Garza' }"
          >
            <p class="authority__name">{{ p.name }}</p>
            <p class="authority__copy">{{ p.copy }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- MENSAJE CENTRAL + CTA FINAL -->
    <section class="closing">
      <div class="closing__inner">
        <p class="closing__eyebrow">PHB Academy™ · Educación en salud para pacientes responsables.</p>
        <h2 class="closing__title">
          No queremos formar médicos.
          <span>Queremos formar mejores pacientes.</span>
        </h2>
        <p class="closing__copy">
          Pacientes capaces de comprender mejor, preguntar mejor, participar mejor, decidir mejor
          y actuar oportunamente.
        </p>

        <p class="closing__cta-title">Empieza por el tema que más importa para tu salud hoy.</p>
        <div class="closing__ctas">
          <BaseButton size="lg" :href="academyUrl">Explorar PHB Academy</BaseButton>
          <BaseButton variant="ghost" size="lg" :href="CONTACT.whatsappFormate">
            <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
            Ayúdame a elegir un programa
          </BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.formate {
  background: $ink;
}

/* --- 01. HERO --- */
.hero {
  @include section-pad;
  @include col($sp-7);
  background: radial-gradient(120% 90% at 80% 0%, $navy-soft 0%, $ink 62%);

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
      flex: 1 1 56%;
    }
  }

  &__eyebrow {
    @include eyebrow;
    color: $gold;
  }

  &__title {
    @include display-xl;
    color: $white;
    max-width: 20ch;
  }

  &__sub {
    @include body-lg;
    max-width: 62ch;
  }

  &__support {
    padding-left: $sp-4;
    border-left: 2px solid $gold;
    font-family: $font-display;
    font-weight: 500;
    color: $white;
    max-width: 56ch;
  }

  &__ctas {
    @include row($sp-3);
    flex-wrap: wrap;
    margin-top: $sp-2;
  }

  &__figure {
    display: flex;

    @include from($bp-lg) {
      flex: 1 1 44%;
    }

    img {
      width: 100%;
      border-radius: $r-lg;
      border: 1px solid rgba($gold, 0.35);
      box-shadow: 0 24px 60px rgba($ink, 0.6);
      aspect-ratio: 4 / 3;
      object-fit: cover;
    }
  }
}

.mentors {
  @include container;
  @include col($sp-4);

  &__label {
    @include eyebrow;
    color: $gold-soft;
  }

  &__list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $sp-3;
  }

  &__item {
    @include card-surface;
    display: flex;
    align-items: flex-start;
    gap: $sp-3;
    flex: 1 1 100%;
    padding: $sp-4;

    @include from($bp-md) {
      flex: 1 1 calc(50% - #{$sp-3} / 2);
    }

    @include from($bp-lg) {
      flex: 1 1 calc(25% - #{$sp-3} * 3 / 4);
    }

    i {
      color: $cyan;
      font-size: 1.1rem;
      line-height: 1.5;
    }

    p {
      @include body;
    }

    strong {
      display: block;
      color: $white;
      font-family: $font-display;
    }
  }
}

/* --- 02. MÉTODO (sección clara) --- */
.method {
  @include section-pad;
  background: $bone;

  &__inner {
    @include container;
    @include col($sp-6);
  }

  :deep(.section-header__eyebrow) {
    color: $gold;
  }

  :deep(.section-header__title) {
    color: $ink;
  }

  &__copy {
    @include col($sp-3);
    max-width: 68ch;

    p {
      @include body-lg;
      color: rgba($ink, 0.75);
    }
  }

  &__philosophy {
    font-family: $font-display;
    font-weight: 700;
    font-size: clamp(1.3rem, 3.4vw, 2.2rem);
    line-height: 1.25;
    text-transform: uppercase;
    color: $ink;
  }

  &__steps {
    display: flex;
    flex-direction: column;

    @include from($bp-lg) {
      flex-direction: row;
      gap: $sp-4;
    }
  }

  &__step {
    @include col($sp-2);
    flex: 1 1 0;
    padding-block: $sp-5;
    border-top: 1px solid $bone-line;

    @include from($bp-lg) {
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
    font-size: 1.2rem;
    text-transform: uppercase;
    color: $ink;
  }

  &__lead {
    font-family: $font-display;
    font-weight: 600;
    color: $ink;
  }

  &__text {
    @include body;
    color: rgba($ink, 0.7);
  }

  &__questions {
    @include col($sp-1);

    li {
      @include body;
      color: rgba($ink, 0.7);
    }
  }

  &__highlight {
    @include col($sp-2);
    padding: $sp-6;
    border-radius: $r-lg;
    background: $ink;

    p:last-child {
      @include body-lg;
    }
  }

  &__highlight-title {
    @include display-lg;
    color: $white !important;
  }
}

.formats {
  @include col($sp-3);

  &__label {
    @include eyebrow;
    color: rgba($ink, 0.55);
  }

  &__list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $sp-2;

    li {
      display: inline-flex;
      align-items: center;
      gap: $sp-2;
      font-family: $font-accent;
      font-size: 0.8rem;
      color: $ink;
      background: $white;
      border: 1px solid $bone-line;
      border-radius: $r-pill;
      padding: 0.5rem 0.9rem;

      i {
        color: $blue;
      }
    }
  }
}

/* --- 03. ÁREAS --- */
.areas {
  @include section-pad;

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

  &__item {
    flex: 1 1 100%;
    display: flex;

    @include from($bp-md) {
      flex: 1 1 calc(50% - #{$sp-4} / 2);
    }

    @include from($bp-lg) {
      flex: 1 1 calc(33.333% - #{$sp-4} * 2 / 3);
    }
  }
}

.area {
  @include card-surface;
  @include col($sp-3);
  @include focus-ring;
  width: 100%;
  padding: $sp-5;
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: rgba($cyan, 0.45);
    transform: translateY(-3px);
  }

  &__icon {
    @include center;
    width: 42px;
    height: 42px;
    border-radius: $r-md;
    border: 1px solid rgba($gold, 0.35);
    background: rgba($gold, 0.08);
    color: $gold-soft;
  }

  &__name {
    @include display-md;
    color: $white;
  }

  &__copy {
    @include body;
  }

  &__courses {
    @include col($sp-2);
    flex: 1;
    padding-top: $sp-3;
    border-top: 1px solid $line;

    li {
      font-family: $font-display;
      font-weight: 500;
      font-size: 0.95rem;
      color: $muted-strong;
    }
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    gap: $sp-2;
    font-family: $font-accent;
    font-weight: 600;
    font-size: 0.85rem;
    color: $cyan;
  }
}

/* --- 04. PACIENTE RESPONSABLE --- */
.patient {
  @include section-pad;
  background: linear-gradient(180deg, $navy 0%, $navy-soft 100%);

  &__inner {
    @include container;
    @include col($sp-6);
  }

  :deep(.section-header) {
    max-width: 30ch;
  }

  &__copy {
    @include col($sp-3);
    max-width: 64ch;

    p {
      @include body-lg;
    }
  }

  &__copy-strong {
    color: $white !important;
    font-weight: 600;
  }

  &__subtitle {
    @include display-md;
    color: $gold-soft;
  }

  &__traits {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $sp-3;
  }

  &__trait {
    @include card-surface;
    @include col($sp-2);
    flex: 1 1 100%;
    padding: $sp-5;

    @include from($bp-md) {
      flex: 1 1 calc(50% - #{$sp-3} / 2);
    }

    @include from($bp-lg) {
      flex: 1 1 calc(33.333% - #{$sp-3} * 2 / 3);
    }
  }

  &__not {
    font-family: $font-display;
    font-weight: 600;
    color: $white;
  }

  &__but {
    @include body;
  }
}

/* --- AUTORIDAD --- */
.authority {
  @include section-pad;

  &__inner {
    @include container;
    @include col($sp-6);
  }

  &__list {
    @include col(0);
  }

  &__item {
    @include col($sp-1);
    padding-block: $sp-4;
    border-top: 1px solid $line-strong;

    @include from($bp-md) {
      flex-direction: row;
      align-items: baseline;
      gap: $sp-6;
    }

    &--lead .authority__name {
      color: $gold-soft;
    }
  }

  &__name {
    @include eyebrow;
    color: $cyan;

    @include from($bp-md) {
      flex: 0 0 280px;
    }
  }

  &__copy {
    @include body-lg;
    color: $white;
  }
}

/* --- CIERRE --- */
.closing {
  @include section-pad;
  background: radial-gradient(120% 90% at 20% 100%, $navy-soft 0%, $ink 65%);
  border-top: 1px solid $line;

  &__inner {
    @include container;
    @include col($sp-5);
    align-items: flex-start;
    max-width: 900px;
  }

  &__eyebrow {
    @include eyebrow;
    color: $gold;
  }

  &__title {
    @include display-xl;
    color: $white;

    span {
      display: block;
      background: $grad-accent;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
  }

  &__copy {
    @include body-lg;
    max-width: 58ch;
  }

  &__cta-title {
    @include display-md;
    color: $white;
    margin-top: $sp-4;
  }

  &__ctas {
    @include row($sp-3);
    flex-wrap: wrap;
  }
}
</style>
