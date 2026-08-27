<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import JourneyPath from '@/components/ui/JourneyPath.vue'
import { EXTERNAL } from '@/config/destinations'

interface MicroBenefit {
  title: string
  copy: string
}

const microBenefits: MicroBenefit[] = [
  { title: 'Estructura diaria', copy: 'Un plan claro, día a día, sin adivinar qué sigue.' },
  { title: 'Seguimiento medible', copy: 'Datos y hábitos que muestran si de verdad estás avanzando.' },
  { title: 'Acompañamiento real', copy: 'No estás solo: hay guía humana detrás de cada etapa.' },
]

interface Barrier {
  icon: string
  title: string
  copy: string
}

const barriers: Barrier[] = [
  {
    icon: 'fa-solid fa-hourglass-half',
    title: 'Postergación',
    copy: 'Sé lo que tengo que hacer, pero siempre encuentro un mejor momento para empezar.',
  },
  {
    icon: 'fa-solid fa-rotate',
    title: 'Empiezo y no sostengo',
    copy: 'Arranco con fuerza las primeras semanas y después todo se diluye.',
  },
  {
    icon: 'fa-solid fa-triangle-exclamation',
    title: 'Solo actúo cuando algo me asusta',
    copy: 'Me muevo por miedo a un diagnóstico, no por una decisión sostenida.',
  },
]

interface Programa {
  id: string
  nombre: string
  tagline: string
  idealPara: string
  incluye: string[]
  icon: string
  destacado?: boolean
}

const programas: Programa[] = [
  {
    id: 'actua-30',
    nombre: 'ACTÚA 30',
    icon: 'fa-solid fa-calendar-check',
    tagline: 'Programa base. 30 días para convertir conciencia en acción.',
    idealPara: 'Quien empieza y necesita estructura.',
    incluye: [
      'Línea base de hábitos y disposición al cambio',
      'Plan diario de comportamientos mínimos viables',
      'Seguimiento semanal de progreso',
      'Reevaluación al día 30',
    ],
    destacado: true,
  },
  {
    id: 'actua-metabolico',
    nombre: 'ACTÚA Metabólico',
    icon: 'fa-solid fa-fire-flame-simple',
    tagline: 'Para sobrepeso, resistencia a la insulina, glucosa elevada y sedentarismo.',
    idealPara: 'Quien necesita revertir marcadores metabólicos con acción sostenida.',
    incluye: [
      'Diseño conductual enfocado en glucosa y peso',
      'Retos diarios de movimiento y alimentación',
      'Seguimiento de marcadores clave',
      'Reevaluación conductual y metabólica',
    ],
  },
  {
    id: 'actua-preventivo',
    nombre: 'ACTÚA Preventivo',
    icon: 'fa-solid fa-shield-heart',
    tagline: 'Para quien está bien y quiere seguir estándolo.',
    idealPara: 'Personas sanas que quieren blindar sus hábitos a futuro.',
    incluye: [
      'Línea base de hábitos protectores',
      'Plan de mantenimiento conductual',
      'Alertas tempranas de desviación',
      'Reevaluación periódica',
    ],
  },
  {
    id: 'actua-50-mas',
    nombre: 'ACTÚA 50+',
    icon: 'fa-solid fa-person-walking',
    tagline: 'Preservar energía, fuerza, función y autonomía.',
    idealPara: 'Personas de 50 años en adelante que priorizan independencia funcional.',
    incluye: [
      'Evaluación de fuerza, función y energía',
      'Rutina conductual de preservación muscular',
      'Seguimiento de autonomía funcional',
      'Reevaluación trimestral',
    ],
  },
  {
    id: 'actua-diabetes',
    nombre: 'ACTÚA Diabetes',
    icon: 'fa-solid fa-chart-line',
    tagline: 'Acompañamiento conductual para vivir con diabetes con mayor control.',
    idealPara: 'Personas que viven con diabetes y buscan mayor control diario.',
    incluye: [
      'Línea base de manejo diario de la condición',
      'Hábitos mínimos viables para control glucémico',
      'Recordatorios y seguimiento constante',
      'Reevaluación con datos clínicos',
    ],
  },
  {
    id: 'actua-regenerativo',
    nombre: 'ACTÚA Regenerativo',
    icon: 'fa-solid fa-dna',
    tagline: 'Preparación y sostenimiento conductual alrededor de una estrategia regenerativa.',
    idealPara: 'Quien está en o considera una estrategia de medicina regenerativa.',
    incluye: [
      'Preparación conductual previa al protocolo',
      'Hábitos de sostenimiento durante el proceso',
      'Seguimiento de adherencia',
      'Reevaluación post-protocolo',
    ],
  },
]

interface Fase {
  numero: string
  titulo: string
  copy: string
}

const fases: Fase[] = [
  {
    numero: '01',
    titulo: 'LÍNEA BASE',
    copy: 'Medimos dónde estás hoy: hábitos, barreras, contexto y disposición al cambio.',
  },
  {
    numero: '02',
    titulo: 'DISEÑO CONDUCTUAL',
    copy: 'Definimos comportamientos mínimos viables, no metas heroicas.',
  },
  {
    numero: '03',
    titulo: 'EJECUCIÓN ACOMPAÑADA',
    copy: '30 días de estructura diaria, recordatorios, retos y seguimiento.',
  },
  {
    numero: '04',
    titulo: 'REEVALUACIÓN',
    copy: 'Volvemos a medir. Lo que se mide, se sostiene.',
  },
]

interface Recomendacion {
  situacion: string
  programa: string
}

const recomendaciones: Recomendacion[] = [
  { situacion: 'Quiero empezar y no sé por dónde', programa: 'ACTÚA 30' },
  { situacion: 'Tengo glucosa o peso fuera de rango', programa: 'ACTÚA Metabólico' },
  { situacion: 'Tengo más de 50 años', programa: 'ACTÚA 50+' },
  { situacion: 'Estoy explorando medicina regenerativa', programa: 'ACTÚA Regenerativo' },
]

const seleccionActiva = ref<string | null>(null)

const recomendacionSeleccionada = computed(() =>
  recomendaciones.find((r) => r.situacion === seleccionActiva.value) ?? null,
)

function seleccionar(situacion: string) {
  seleccionActiva.value = situacion
}
</script>

<template>
  <div class="actua-view">
    <!-- 01. HERO -->
    <section class="hero">
      <div class="hero__container">
        <p class="hero__eyebrow">PHB ACTÚA™ | DE LA CONCIENCIA A LA ACCIÓN</p>
        <h1 class="hero__title">30 días para convertir conciencia en acción.</h1>
        <p class="hero__subtitle">
          Saber qué deberías hacer no es lo mismo que hacerlo. ACTÚA no vende información: vende
          transformación guiada. Programas conductuales diseñados desde la psicología de la salud
          y la medicina conductual para que la intención se convierta en comportamiento sostenido.
        </p>
        <div class="hero__ctas">
          <BaseButton variant="primary" size="lg" href="#programas">Encontrar mi programa</BaseButton>
          <BaseButton variant="ghost" size="lg" href="#metodo">¿Cómo funciona ACTÚA?</BaseButton>
        </div>
        <ul class="hero__benefits">
          <li v-for="b in microBenefits" :key="b.title" class="hero__benefit">
            <p class="hero__benefit-title">{{ b.title }}</p>
            <p class="hero__benefit-copy">{{ b.copy }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- 02. EL PROBLEMA -->
    <section class="problema">
      <div class="problema__container">
        <SectionHeader
          eyebrow="EL PROBLEMA"
          title="El problema casi nunca es la falta de información."
          subtitle="La mayoría de las personas ya sabe que debería moverse más, dormir mejor, comer distinto y revisarse a tiempo. Y aun así, no lo hace. Entre saber y actuar existe una distancia conductual — y esa distancia se puede diseñar."
        />
        <ul class="problema__barreras">
          <li v-for="b in barriers" :key="b.title" class="problema__barrera">
            <i class="problema__icon" :class="b.icon" aria-hidden="true"></i>
            <p class="problema__barrera-title">{{ b.title }}</p>
            <p class="problema__barrera-copy">{{ b.copy }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- 03. PROGRAMAS -->
    <section id="programas" class="programas">
      <div class="programas__container">
        <SectionHeader
          eyebrow="PROGRAMAS ACTÚA"
          title="Seis programas. Un mismo método conductual."
          subtitle="Cada programa se adapta a un contexto distinto, pero comparte la misma estructura: línea base, diseño conductual, ejecución acompañada y reevaluación."
        />
        <ul class="programas__grid">
          <li
            v-for="p in programas"
            :key="p.id"
            class="programa-card"
            :class="{ 'programa-card--destacado': p.destacado }"
          >
            <span v-if="p.destacado" class="programa-card__badge">Empieza aquí</span>
            <i class="programa-card__icon" :class="p.icon" aria-hidden="true"></i>
            <h3 class="programa-card__nombre">{{ p.nombre }}</h3>
            <p class="programa-card__tagline">{{ p.tagline }}</p>
            <p class="programa-card__ideal"><strong>Ideal para:</strong> {{ p.idealPara }}</p>
            <p class="programa-card__incluye-label">Incluye:</p>
            <ul class="programa-card__incluye">
              <li v-for="item in p.incluye" :key="item">
                <i class="fa-solid fa-check" aria-hidden="true"></i>
                <span>{{ item }}</span>
              </li>
            </ul>
            <BaseButton
              variant="primary"
              size="md"
              :href="EXTERNAL.evaluacion"
              block
            >
              Quiero este programa
            </BaseButton>
          </li>
        </ul>
      </div>
    </section>

    <!-- 04. CÓMO FUNCIONA -->
    <section id="metodo" class="metodo">
      <div class="metodo__container">
        <SectionHeader
          eyebrow="CÓMO FUNCIONA"
          title="Un programa no es un PDF con recomendaciones."
        />
        <ol class="metodo__fases">
          <li v-for="f in fases" :key="f.numero" class="metodo__fase">
            <span class="metodo__numero">{{ f.numero }}</span>
            <div class="metodo__fase-body">
              <p class="metodo__fase-title">{{ f.titulo }}</p>
              <p class="metodo__fase-copy">{{ f.copy }}</p>
            </div>
          </li>
        </ol>
        <div class="metodo__journey">
          <JourneyPath :steps="['Comprender', 'Evaluar', 'Actuar', 'Medir', 'Regenerar']" active="Actuar" />
        </div>
      </div>
    </section>

    <!-- 05. ¿POR DÓNDE EMPIEZO? -->
    <section class="selector">
      <div class="selector__container">
        <SectionHeader
          eyebrow="¿POR DÓNDE EMPIEZO?"
          title="Encuentra tu punto de partida."
          subtitle="Elige la situación que más se parece a la tuya."
        />
        <ul class="selector__lista">
          <li
            v-for="r in recomendaciones"
            :key="r.situacion"
            class="selector__fila"
            :class="{ 'selector__fila--activa': seleccionActiva === r.situacion }"
            tabindex="0"
            role="button"
            @click="seleccionar(r.situacion)"
            @keyup.enter="seleccionar(r.situacion)"
          >
            <span class="selector__situacion">{{ r.situacion }}</span>
            <i class="fa-solid fa-arrow-right selector__flecha" aria-hidden="true"></i>
            <span class="selector__programa">{{ r.programa }}</span>
          </li>
        </ul>
        <p v-if="recomendacionSeleccionada" class="selector__resultado">
          Para ti, recomendamos <strong>{{ recomendacionSeleccionada.programa }}</strong>.
        </p>
        <div class="selector__ctas">
          <BaseButton variant="primary" size="lg" :href="EXTERNAL.evaluacion">
            Ayúdame a elegir
          </BaseButton>
          <BaseButton variant="ghost" size="lg" :href="EXTERNAL.evaluacion">
            Hablar con PHB
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- 06. CIERRE -->
    <section class="cierre">
      <div class="cierre__container">
        <p class="cierre__title">
          ACTÚA es el puente entre lo que aprendes y lo que realmente cambia.
        </p>
        <div class="cierre__ctas">
          <BaseButton variant="primary" size="lg" to="/aprende">Ir a APRENDE</BaseButton>
          <BaseButton variant="ghost" size="lg" to="/regeneracion">Ir a REGENERACIÓN</BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.actua-view {
  background: $ink;
}

// 01. HERO
.hero {
  @include section-pad;
  background: $navy;

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
    max-width: 18ch;
  }

  &__subtitle {
    @include body-lg;
    color: $muted;
    max-width: 62ch;
  }

  &__ctas {
    @include row($sp-3);
    flex-wrap: wrap;
  }

  &__benefits {
    display: flex;
    flex-wrap: wrap;
    gap: $sp-5;
    margin-top: $sp-5;
    padding-top: $sp-5;
    border-top: 1px solid $line;
  }

  &__benefit {
    flex: 1 1 100%;

    @include from($bp-md) {
      flex: 1 1 calc(33.333% - #{$sp-5});
    }
  }

  &__benefit-title {
    font-family: $font-accent;
    font-weight: 600;
    color: $accent;
    margin-bottom: $sp-1;
  }

  &__benefit-copy {
    @include body;
    color: $muted;
  }
}

// 02. EL PROBLEMA
.problema {
  @include section-pad;
  background: $navy-soft;

  &__container {
    @include container;
    @include col($sp-6);
  }

  &__barreras {
    display: flex;
    flex-wrap: wrap;
    gap: $sp-4;
  }

  &__barrera {
    @include card-surface;
    flex: 1 1 100%;
    padding: $sp-5;

    @include from($bp-md) {
      flex: 1 1 calc(33.333% - #{$sp-4});
    }
  }

  &__icon {
    display: block;
    font-size: 1.75rem;
    margin-bottom: $sp-3;
  }

  &__barrera-title {
    font-family: $font-display;
    font-weight: 600;
    color: $white;
    margin-bottom: $sp-2;
  }

  &__barrera-copy {
    @include body;
    color: $muted;
  }
}

// 03. PROGRAMAS
.programas {
  @include section-pad;
  background: $navy;

  &__container {
    @include container;
    @include col($sp-6);
  }

  &__grid {
    display: flex;
    flex-wrap: wrap;
    gap: $sp-4;
  }
}

.programa-card {
  @include card-surface;
  @include col($sp-3);
  position: relative;
  flex: 1 1 100%;
  padding: $sp-5;
  border: 1px solid $line;

  @include from($bp-md) {
    flex: 1 1 calc(50% - #{$sp-4} / 2);
  }

  &--destacado {
    border-color: $gold;
  }

  &__badge {
    position: absolute;
    top: $sp-4;
    right: $sp-4;
    @include eyebrow;
    background: $grad-gold;
    color: $ink;
    padding: $sp-1 $sp-3;
    border-radius: $r-pill;
  }

  &__icon {
    display: block;
    font-size: 1.4rem;
    line-height: 1;
    color: $cyan;
  }

  &--destacado &__icon {
    color: $gold;
  }

  &__nombre {
    font-family: $font-display;
    font-size: 1.3rem;
    font-weight: 700;
    color: $white;
  }

  &__tagline {
    @include body;
    color: $muted;
  }

  &__ideal {
    @include body;
    color: $cloud;

    strong {
      color: $white;
    }
  }

  &__incluye-label {
    font-family: $font-accent;
    font-size: 0.8rem;
    letter-spacing: 0.04em;
    color: $accent;
    margin-top: $sp-2;
  }

  &__incluye {
    @include col($sp-2);
    margin-bottom: $sp-2;

    li {
      @include body;
      display: flex;
      align-items: flex-start;
      gap: $sp-2;
      color: $muted;

      i {
        flex: 0 0 auto;
        color: $green;
        line-height: 1.5;
      }
    }
  }
}

// 04. CÓMO FUNCIONA
.metodo {
  @include section-pad;
  background: $bone;

  &__container {
    @include container;
    @include col($sp-7);
  }

  &__fases {
    @include col(0);
  }

  &__fase {
    display: flex;
    gap: $sp-4;
    padding-bottom: $sp-6;
    position: relative;

    &:not(:last-child)::before {
      content: '';
      position: absolute;
      left: 1.35rem;
      top: 2.75rem;
      bottom: 0;
      width: 1px;
      background: $bone-line;
    }
  }

  &__numero {
    flex: 0 0 auto;
    @include center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: $r-pill;
    background: $bone-dim;
    color: $gold;
    font-family: $font-accent;
    font-weight: 700;
    font-size: 0.9rem;
  }

  &__fase-body {
    @include col($sp-1);
    padding-top: $sp-1;
  }

  &__fase-title {
    font-family: $font-accent;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: $ink;
  }

  &__fase-copy {
    @include body;
    color: rgba($ink, 0.7);
    max-width: 56ch;
  }

  &__journey {
    padding-top: $sp-5;
    border-top: 1px solid $bone-line;
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

  :deep(.journey__step) {
    color: rgba($ink, 0.6);
  }

  :deep(.journey__step--active) {
    color: $gold;
  }

  :deep(.journey__index) {
    color: rgba($gold, 0.7);
  }

  :deep(.journey__arrow) {
    color: rgba($ink, 0.28);
  }
}

// 05. ¿POR DÓNDE EMPIEZO?
.selector {
  @include section-pad;
  background: $navy;

  &__container {
    @include container;
    @include col($sp-6);
  }

  &__lista {
    @include col($sp-3);
  }

  &__fila {
    @include card-surface;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: $sp-3;
    padding: $sp-4 $sp-5;
    cursor: pointer;
    border: 1px solid $line;
    transition: border-color 0.18s ease, background 0.18s ease;
    @include focus-ring;

    &:hover {
      border-color: $line-strong;
    }

    &--activa {
      border-color: $cyan;
      background: $surface-2;
    }
  }

  &__situacion {
    @include body;
    color: $white;
    flex: 1 1 auto;
  }

  &__flecha {
    color: $accent;
  }

  &__programa {
    font-family: $font-accent;
    font-weight: 600;
    color: $accent;
  }

  &__resultado {
    @include body-lg;
    color: $white;
  }

  &__ctas {
    @include row($sp-3);
    flex-wrap: wrap;
  }
}

// 06. CIERRE
.cierre {
  @include section-pad;
  background: $grad-accent;

  &__container {
    @include container;
    @include col($sp-5);
    align-items: flex-start;
  }

  &__title {
    @include display-md;
    color: $ink;
    max-width: 30ch;
  }

  &__ctas {
    @include row($sp-3);
    flex-wrap: wrap;
  }
}
</style>
