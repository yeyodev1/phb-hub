<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import JourneyPath from '@/components/ui/JourneyPath.vue'
import { EXTERNAL } from '@/config/destinations'
import { JUAN } from '@/config/media'

interface ProgramaClinico {
  nombre: string
  enfoque: string
  candidatos: string[]
  evaluacionIncluye: string[]
  icon: string
}

interface PasoFlujo {
  titulo: string
  copy: string
}

interface NivelMarca {
  nombre: string
  rol: string
  frase: string
}

const programas: ProgramaClinico[] = [
  {
    nombre: 'Programa Regenerativo Metabólico',
    enfoque: 'Contexto metabólico, inflamatorio y de riesgo cardiovascular.',
    candidatos: [
      'Marcadores metabólicos alterados',
      'Antecedentes de riesgo cardiovascular',
      'Procesos inflamatorios persistentes',
      'Cambios de composición corporal relevantes',
    ],
    evaluacionIncluye: [
      'Revisión de antecedentes metabólicos',
      'Análisis de estudios disponibles',
      'Definición de estudios adicionales necesarios',
    ],
    icon: 'fa-solid fa-fire-flame-simple',
  },
  {
    nombre: 'Programa Regenerativo Articular',
    enfoque: 'Dolor articular, lesión, desgaste y limitación funcional.',
    candidatos: [
      'Dolor articular persistente',
      'Antecedente de lesión o cirugía',
      'Desgaste o degeneración documentada',
      'Limitación funcional en actividades cotidianas',
    ],
    evaluacionIncluye: [
      'Revisión del cuadro clínico articular',
      'Análisis de estudios de imagen previos',
      'Determinación de la capacidad funcional actual',
    ],
    icon: 'fa-solid fa-bone',
  },
  {
    nombre: 'Programa Regenerativo Healthy Aging',
    enfoque: 'Pérdida de energía, función, recuperación y calidad de sueño.',
    candidatos: [
      'Disminución perceptible de energía',
      'Recuperación más lenta de lo habitual',
      'Alteraciones del sueño',
      'Interés en preservar función a largo plazo',
    ],
    evaluacionIncluye: [
      'Revisión de hábitos y contexto funcional',
      'Análisis de marcadores relacionados con envejecimiento',
      'Priorización de áreas a intervenir',
    ],
    icon: 'fa-solid fa-person-walking',
  },
  {
    nombre: 'Programa Regenerativo Multisistémico',
    enfoque: 'Varias condiciones o antecedentes simultáneos.',
    candidatos: [
      'Más de una condición activa',
      'Antecedentes clínicos múltiples',
      'Tratamientos previos sin abordaje integral',
      'Necesidad de coordinar distintas áreas clínicas',
    ],
    evaluacionIncluye: [
      'Integración de historia clínica completa',
      'Cruce de antecedentes y estudios existentes',
      'Definición de prioridades entre condiciones',
    ],
    icon: 'fa-solid fa-layer-group',
  },
  {
    nombre: 'Programa Regenerativo Premium',
    enfoque: 'Integración completa: evaluación, laboratorios, consulta profesional, estrategia y seguimiento.',
    candidatos: [
      'Personas que buscan un abordaje integral',
      'Casos que requieren seguimiento continuo',
      'Necesidad de coordinación entre múltiples especialistas',
      'Interés en una estrategia clínica de largo plazo',
    ],
    evaluacionIncluye: [
      'Evaluación PHB Regenerative Capacity™ completa',
      'Panel extendido de laboratorios',
      'Consulta y definición de estrategia con seguimiento',
    ],
    icon: 'fa-solid fa-gem',
  },
]

const pasosFlujo: PasoFlujo[] = [
  { titulo: 'Programa', copy: 'Se identifica el programa regenerativo cuyo enfoque corresponde al contexto de la persona.' },
  { titulo: 'Información', copy: 'Se recopila información inicial sobre antecedentes, síntomas y objetivos.' },
  { titulo: 'Evaluación PHB', copy: 'Se aplica PHB Regenerative Capacity™ para entender el contexto biológico y funcional.' },
  { titulo: 'Estudios', copy: 'Se revisan los estudios disponibles y se determina si se requieren estudios adicionales.' },
  { titulo: 'Consulta', copy: 'Un profesional de la salud revisa el caso y conversa directamente con la persona.' },
  { titulo: 'Candidatura', copy: 'Se determina si existe una indicación clínica para considerar el programa evaluado.' },
  { titulo: 'Propuesta clínica', copy: 'De existir indicación, se presenta una propuesta clínica específica para el caso.' },
  { titulo: 'Contratación', copy: 'La persona decide, con información completa, si continúa con la propuesta presentada.' },
]

const factoresCapacidad: string[] = [
  'edad y función',
  'diagnóstico',
  'cronicidad',
  'daño estructural',
  'estado metabólico',
  'inflamación',
  'comorbilidades',
  'capacidad funcional',
  'antecedentes',
  'expectativas',
  'estudios disponibles',
]

const nivelesMarca: NivelMarca[] = [
  {
    nombre: 'JUAN ROMÁN GARZA',
    rol: 'Autoridad / Comunicación / Educación',
    frase: 'Te enseño a entender y transformar tu relación con tu salud.',
  },
  {
    nombre: 'PHB',
    rol: 'Inteligencia / Medición / Decisión',
    frase: 'Te ayudamos a entender dónde estás y qué deberías priorizar.',
  },
  {
    nombre: 'PHB ACTÚA',
    rol: 'Conducta',
    frase: 'Te ayudamos a convertir conocimiento en acción.',
  },
  {
    nombre: 'RED CLÍNICA',
    rol: 'Intervención',
    frase: 'Cuando existe una indicación clínica, se ejecuta.',
  },
]
</script>

<template>
  <div class="regeneracion-view">
    <!-- 01. HERO -->
    <section class="hero">
      <div class="hero__container">
        <div class="hero__text">
          <p class="hero__eyebrow">PHB | DECISION BEFORE INTERVENTION™</p>
          <h1 class="hero__headline">
            La medicina regenerativa no empieza con un tratamiento. Empieza con una evaluación.
          </h1>
          <p class="hero__subheadline">
            Los programas regenerativos no se compran: se evalúan. Antes de considerar cualquier
            intervención es necesario comprender el contexto biológico, funcional y clínico de cada
            persona.
          </p>
          <div class="hero__actions">
            <BaseButton variant="primary" size="lg" :href="EXTERNAL.evaluacion">
              Evaluar mi candidatura
              <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </BaseButton>
            <BaseButton variant="ghost" size="lg" href="#flujo">Cómo evaluamos</BaseButton>
          </div>
          <p class="hero__notice">
            Toda intervención clínica requiere evaluación previa e indicación de un profesional de
            la salud.
          </p>
        </div>

        <figure class="hero__photo">
          <img
            class="hero__photo-img"
            :src="JUAN.portrait"
            alt="Retrato de Juan Román Garza en estudio"
          />
          <figcaption class="hero__photo-caption">
            Juan Román Garza · Psicología de la Salud · Medicina Conductual
          </figcaption>
        </figure>
      </div>
    </section>

    <!-- 02. PROGRAMAS CLÍNICOS -->
    <section class="programas">
      <div class="programas__container">
        <SectionHeader
          eyebrow="Programas clínicos"
          title="Cinco programas regenerativos, cada uno con su propia evaluación"
          subtitle="Ningún programa se contrata directamente. Cada uno inicia con una evaluación de candidatura."
        />
        <div class="programas__grid">
          <article v-for="programa in programas" :key="programa.nombre" class="programa-card">
            <span class="programa-card__icon"><i :class="programa.icon" aria-hidden="true"></i></span>
            <h3 class="programa-card__nombre">{{ programa.nombre }}</h3>
            <p class="programa-card__enfoque">
              <strong>Enfoque:</strong> {{ programa.enfoque }}
            </p>
            <p class="programa-card__subtitulo">Se evalúa en personas con:</p>
            <ul class="programa-card__lista">
              <li v-for="item in programa.candidatos" :key="item">{{ item }}</li>
            </ul>
            <p class="programa-card__subtitulo">Qué incluye la evaluación previa:</p>
            <ul class="programa-card__lista">
              <li v-for="item in programa.evaluacionIncluye" :key="item">{{ item }}</li>
            </ul>
            <BaseButton variant="ghost" :href="EXTERNAL.evaluacion" block>
              Evaluar mi candidatura
              <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </BaseButton>
          </article>
        </div>
      </div>
    </section>

    <!-- 03. EL FLUJO -->
    <section id="flujo" class="flujo">
      <div class="flujo__container">
        <SectionHeader
          eyebrow="El proceso"
          title="Un flujo clínico, no un carrito de compra"
          subtitle="Cada paso existe para asegurar que cualquier intervención esté respaldada por evidencia clínica y decisión profesional."
        />
        <ol class="flujo__pasos">
          <li v-for="(paso, i) in pasosFlujo" :key="paso.titulo" class="flujo__paso">
            <span class="flujo__numero">{{ String(i + 1).padStart(2, '0') }}</span>
            <div class="flujo__contenido">
              <h3 class="flujo__titulo">{{ paso.titulo }}</h3>
              <p class="flujo__copy">{{ paso.copy }}</p>
            </div>
          </li>
        </ol>
        <div class="flujo__journey">
          <JourneyPath :steps="['Comprender', 'Evaluar', 'Actuar', 'Medir', 'Regenerar']" active="Regenerar" />
        </div>
      </div>
    </section>

    <!-- 04. PHB REGENERATIVE CAPACITY -->
    <section class="capacidad">
      <div class="capacidad__container">
        <div class="capacidad__panel">
          <div class="capacidad__content">
            <p class="capacidad__eyebrow">PHB Regenerative Capacity™</p>
            <h2 class="capacidad__headline">Evalúa antes de regenerar.</h2>

            <div class="capacidad__bloque">
              <p class="capacidad__label">Ideal para:</p>
              <p class="capacidad__texto">
                Personas que están considerando medicina regenerativa o quieren comprender mejor su
                contexto biológico antes de una intervención.
              </p>
            </div>

            <div class="capacidad__bloque">
              <p class="capacidad__label">Analiza factores como:</p>
              <div class="capacidad__chips">
                <span v-for="factor in factoresCapacidad" :key="factor" class="capacidad__chip">
                  {{ factor }}
                </span>
              </div>
            </div>

            <div class="capacidad__bloque">
              <p class="capacidad__label">Resultado:</p>
              <p class="capacidad__texto">
                Una evaluación orientativa para determinar qué información adicional puede ser
                necesaria antes de considerar una estrategia regenerativa.
              </p>
            </div>

            <BaseButton variant="primary" size="lg" :href="EXTERNAL.evaluacion">
              Evaluar mi contexto regenerativo
              <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </BaseButton>
          </div>

          <img
            class="capacidad__img"
            :src="JUAN.masterclass"
            alt="Juan Román Garza impartiendo una masterclass médica"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <!-- 05. ARQUITECTURA DE MARCAS -->
    <section class="marcas">
      <div class="marcas__container">
        <SectionHeader
          eyebrow="Arquitectura de marca"
          title="Cuatro niveles, un mismo ecosistema"
          subtitle="Cada marca cumple un rol distinto dentro del recorrido hacia una decisión clínica informada."
        />
        <div class="marcas__lista">
          <article v-for="nivel in nivelesMarca" :key="nivel.nombre" class="marca-item">
            <h3 class="marca-item__nombre">{{ nivel.nombre }}</h3>
            <p class="marca-item__rol">{{ nivel.rol }}</p>
            <p class="marca-item__frase">{{ nivel.frase }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- 06. CIERRE -->
    <section class="cierre">
      <div class="cierre__container">
        <h2 class="cierre__headline">¿No sabes si eres candidato?</h2>
        <p class="cierre__copy">
          La única forma de saberlo es a través de una evaluación. PHB Regenerative Capacity™
          te ayuda a comprender tu contexto antes de considerar cualquier programa regenerativo.
        </p>
        <div class="cierre__actions">
          <BaseButton variant="primary" size="lg" :href="EXTERNAL.evaluacion">
            Evaluar mi candidatura
            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </BaseButton>
          <BaseButton variant="ghost" size="lg" to="/actua">Conocer PHB ACTÚA</BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.regeneracion-view {
  background: $ink;
}

// --- 01. HERO ---
.hero {
  @include section-pad;
  background: radial-gradient(120% 140% at 50% 0%, rgba($navy-soft, 0.9) 0%, $ink 60%);

  &__container {
    @include container;
    @include col($sp-7);
    align-items: center;

    @include from($bp-lg) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      text-align: left;
    }
  }

  &__text {
    @include col($sp-5);
    text-align: center;
    align-items: center;

    @include from($bp-lg) {
      text-align: left;
      align-items: flex-start;
      flex: 1 1 55%;
    }
  }

  &__eyebrow {
    @include eyebrow;
    color: $gold;
  }

  &__headline {
    @include display-xl;
    color: $white;
    max-width: 22ch;
  }

  &__subheadline {
    @include body-lg;
    max-width: 62ch;
  }

  &__actions {
    @include row($sp-4);
    flex-wrap: wrap;
    justify-content: center;
    margin-top: $sp-2;

    @include from($bp-lg) {
      justify-content: flex-start;
    }
  }

  &__notice {
    @include body;
    max-width: 52ch;
    font-size: 0.85rem;
    color: $muted;
  }

  &__photo {
    @include col($sp-2);
    align-items: center;
    margin: 0;
    flex: 0 0 auto;

    @include from($bp-lg) {
      flex: 0 0 38%;
    }
  }

  &__photo-img {
    width: 100%;
    max-width: 340px;
    height: auto;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    border-radius: $r-lg;
    border: 1px solid rgba($gold, 0.4);
    box-shadow: 0 20px 50px rgba($ink, 0.5);
  }

  &__photo-caption {
    @include body;
    font-size: 0.8rem;
    color: $muted-strong;
    text-align: center;
  }
}

// --- 02. PROGRAMAS CLÍNICOS ---
.programas {
  @include section-pad;

  &__container {
    @include container;
    @include col($sp-7);
  }

  &__grid {
    display: flex;
    flex-wrap: wrap;
    gap: $sp-5;
  }
}

.programa-card {
  @include card-surface;
  @include col($sp-3);
  flex: 1 1 100%;
  padding: $sp-6;
  border-top: 1px solid rgba($gold, 0.35);

  @include from($bp-md) {
    flex: 1 1 calc(50% - #{$sp-5} / 2);
  }

  @include from($bp-lg) {
    flex: 1 1 calc(33.333% - #{$sp-5} * 2 / 3);
  }

  &__icon {
    @include center;
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 50%;
    border: 1px solid rgba($gold, 0.4);
    color: $gold;
    font-size: 1.05rem;
  }

  &__nombre {
    @include display-md;
    color: $white;
  }

  &__enfoque {
    @include body;

    strong {
      color: $cloud;
    }
  }

  &__subtitulo {
    @include eyebrow;
    margin-top: $sp-2;
  }

  &__lista {
    @include col($sp-2);
    list-style: none;
    padding-left: 0;

    li {
      @include body;
      padding-left: $sp-4;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.65em;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: $cyan;
      }
    }
  }

  > :last-child {
    margin-top: auto;
    padding-top: $sp-2;
  }
}

// --- 03. EL FLUJO ---
.flujo {
  @include section-pad;
  background: $bone;

  &__container {
    @include container;
    @include col($sp-7);

    :deep(.section-header__eyebrow) {
      color: rgba($ink, 0.7);
    }

    :deep(.section-header__title) {
      color: $ink;
    }

    :deep(.section-header__subtitle) {
      color: rgba($ink, 0.7);
    }
  }

  &__pasos {
    @include col($sp-5);
    list-style: none;
    position: relative;
    padding-left: 0;
  }

  &__paso {
    display: flex;
    gap: $sp-4;
    position: relative;
    padding-bottom: $sp-5;
    border-left: 1px solid $bone-line;
    padding-left: $sp-5;

    &:last-child {
      padding-bottom: 0;
    }
  }

  &__numero {
    position: absolute;
    left: -0.85rem;
    top: 0;
    @include center;
    width: 1.7rem;
    height: 1.7rem;
    border-radius: 50%;
    background: $bone;
    border: 1px solid $gold;
    color: $gold;
    font-family: $font-accent;
    font-size: 0.72rem;
    font-weight: 700;
  }

  &__contenido {
    @include col($sp-1);
  }

  &__titulo {
    @include display-md;
    color: $ink;
    font-size: 1.15rem;
  }

  &__copy {
    @include body;
    color: rgba($ink, 0.7);
  }

  &__journey {
    padding-top: $sp-5;
    border-top: 1px solid $bone-line;

    :deep(.journey__step) {
      color: rgba($ink, 0.6);
    }

    :deep(.journey__step--active) {
      color: $gold;
    }

    :deep(.journey__index) {
      color: rgba($gold, 0.9);
    }

    :deep(.journey__arrow) {
      color: rgba($ink, 0.35);
    }
  }
}

// --- 04. PHB REGENERATIVE CAPACITY ---
.capacidad {
  @include section-pad;

  &__container {
    @include container;
  }

  &__panel {
    @include card-surface;
    display: flex;
    flex-direction: column;
    gap: $sp-6;
    border: 1px solid $cyan;
    box-shadow: 0 0 0 1px rgba($cyan, 0.15), 0 20px 60px rgba($cyan, 0.12);
    padding: $sp-6;

    @include from($bp-md) {
      padding: $sp-8;
    }

    @include from($bp-lg) {
      flex-direction: row;
      align-items: center;
      gap: $sp-8;
    }
  }

  &__content {
    @include col($sp-5);
    flex: 1 1 auto;

    @include from($bp-lg) {
      flex: 1 1 58%;
    }
  }

  &__img {
    width: 100%;
    max-width: 100%;
    height: auto;
    border-radius: $r-lg;
    border: 1px solid rgba($gold, 0.4);
    object-fit: cover;
    aspect-ratio: 4 / 3;

    @include from($bp-lg) {
      flex: 1 1 42%;
    }
  }

  &__eyebrow {
    @include eyebrow;
  }

  &__headline {
    @include display-lg;
    color: $white;
  }

  &__bloque {
    @include col($sp-2);
  }

  &__label {
    font-family: $font-accent;
    font-weight: 600;
    font-size: 0.85rem;
    color: $cloud;
  }

  &__texto {
    @include body-lg;
  }

  &__chips {
    display: flex;
    flex-wrap: wrap;
    gap: $sp-2;
  }

  &__chip {
    @include body;
    font-size: 0.85rem;
    padding: $sp-2 $sp-4;
    border-radius: $r-pill;
    border: 1px solid $line-strong;
    background: rgba($cyan, 0.06);
    color: $cloud;
  }
}

// --- 05. ARQUITECTURA DE MARCAS ---
.marcas {
  @include section-pad;
  background: $navy;

  &__container {
    @include container;
    @include col($sp-7);
  }

  &__lista {
    @include col($sp-4);
  }
}

.marca-item {
  @include card-surface;
  @include col($sp-2);
  padding: $sp-5;

  &__nombre {
    font-family: $font-display;
    font-weight: 700;
    color: $white;
    letter-spacing: 0.02em;
  }

  &__rol {
    @include eyebrow;
    color: $muted-strong;
  }

  &__frase {
    @include body;
  }
}

// --- 06. CIERRE ---
.cierre {
  @include section-pad;
  background: $grad-accent;

  &__container {
    @include container;
    @include col($sp-4);
    text-align: center;
    align-items: center;
  }

  &__headline {
    @include display-lg;
    color: $ink;
  }

  &__copy {
    @include body-lg;
    color: rgba($ink, 0.82);
    max-width: 56ch;
  }

  &__actions {
    @include row($sp-4);
    flex-wrap: wrap;
    justify-content: center;
    margin-top: $sp-2;
  }
}
</style>
