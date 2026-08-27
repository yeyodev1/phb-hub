<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import JourneyPath from '@/components/ui/JourneyPath.vue'
import { CONTACT } from '@/config/destinations'

interface Indicador {
  label: string
}

const indicadores: Indicador[] = [
  { label: 'Evaluación poblacional' },
  { label: 'Reporte organizacional agregado' },
  { label: 'Activación conductual medible' },
]

interface Programa {
  id: string
  nombre: string
  tagline: string
  paraQuien: string
  incluye: string[]
  entregable: string
  icon: string
  destacado?: boolean
}

const programas: Programa[] = [
  {
    id: 'executive-health',
    nombre: 'PHB Executive Health',
    icon: 'fa-solid fa-user-tie',
    tagline: 'Evaluación de salud para directivos.',
    paraQuien: 'Consejos directivos, C-level y liderazgo senior.',
    incluye: [
      'Evaluación de salud individual y confidencial',
      'Revisión de factores de riesgo clínico y conductual',
      'Sesión de retroalimentación uno a uno',
      'Recomendaciones priorizadas de seguimiento',
    ],
    entregable: 'Reporte individual confidencial + ruta de seguimiento.',
  },
  {
    id: 'workforce-health',
    nombre: 'PHB Workforce Health',
    icon: 'fa-solid fa-users',
    tagline: 'Evaluación poblacional de colaboradores.',
    paraQuien: 'Organizaciones que buscan entender el estado de salud de su plantilla.',
    incluye: [
      'Evaluación de salud aplicada a toda la población objetivo',
      'Consolidación de datos por área o población',
      'Identificación de factores de riesgo prioritarios',
      'Sesión de presentación de hallazgos a RH y liderazgo',
    ],
    entregable: 'Reporte organizacional agregado y anónimo, con mapa de riesgo.',
  },
  {
    id: 'actua-empresas',
    nombre: 'ACTÚA Empresas',
    icon: 'fa-solid fa-bolt',
    tagline: 'Activación conductual de colaboradores.',
    paraQuien: 'Empresas que ya midieron y necesitan que el equipo actúe.',
    incluye: [
      'Programa conductual de 30 días por colaborador',
      'Retos y recordatorios diarios de comportamiento',
      'Seguimiento de adherencia durante el programa',
      'Medición de resultados antes y después',
    ],
    entregable: 'Programa de 30 días con seguimiento y medición de adherencia.',
  },
  {
    id: 'programa-integral',
    nombre: 'Programa Integral',
    icon: 'fa-solid fa-layer-group',
    tagline: 'Conferencia + evaluación + programa de 30 días.',
    paraQuien: 'Organizaciones que buscan una estrategia de salud completa, no un evento aislado.',
    incluye: [
      'Conferencia de activación para la organización',
      'Evaluación conductual y de riesgo de la población',
      'Programa ACTÚA de 30 días con seguimiento',
      'Reporte organizacional agregado al cierre',
    ],
    entregable:
      'Ejemplo de alcance: conferencia para 200 colaboradores, evaluación conductual, evaluación de riesgo, programa ACTÚA 30 y reporte organizacional agregado.',
    destacado: true,
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
    titulo: 'DIAGNÓSTICO ORGANIZACIONAL',
    copy: 'Entendemos tu población, tus riesgos actuales y el objetivo de negocio detrás del programa.',
  },
  {
    numero: '02',
    titulo: 'DISEÑO DEL PROGRAMA',
    copy: 'Definimos el alcance, los entregables y el calendario a la medida de tu organización.',
  },
  {
    numero: '03',
    titulo: 'CONFERENCIA DE ACTIVACIÓN',
    copy: 'Abrimos el programa con una conferencia que conecta a los colaboradores con el porqué.',
  },
  {
    numero: '04',
    titulo: 'EVALUACIÓN Y EJECUCIÓN',
    copy: 'Aplicamos la evaluación y ejecutamos el programa conductual con seguimiento activo.',
  },
  {
    numero: '05',
    titulo: 'REPORTE Y REEVALUACIÓN',
    copy: 'Entregamos el reporte organizacional agregado y volvemos a medir para confirmar el avance.',
  },
]

interface Recibe {
  titulo: string
}

const recibe: Recibe[] = [
  { titulo: 'Mapa agregado de riesgo' },
  { titulo: 'Prioridades de salud por población' },
  { titulo: 'Programa de activación conductual' },
  { titulo: 'Medición antes y después' },
]

type NumColaboradores = 'Hasta 50' | '51 a 250' | '251 a 1,000' | 'Más de 1,000'
type ObjetivoPrincipal =
  | 'Salud de directivos'
  | 'Evaluación poblacional'
  | 'Activación conductual'
  | 'Conferencia + evaluación + programa'
type Momento =
  | 'Con presupuesto aprobado'
  | 'Necesitamos una propuesta formal'
  | 'Explorando opciones'

interface PropuestaForm {
  contacto: string
  puesto: string
  empresa: string
  email: string
  whatsapp: string
  numColaboradores: NumColaboradores | ''
  programaInteres: string
  objetivoPrincipal: ObjetivoPrincipal | ''
  momento: Momento | ''
  mensaje: string
}

const numColaboradoresOpciones: NumColaboradores[] = [
  'Hasta 50',
  '51 a 250',
  '251 a 1,000',
  'Más de 1,000',
]

const objetivoPrincipalOpciones: ObjetivoPrincipal[] = [
  'Salud de directivos',
  'Evaluación poblacional',
  'Activación conductual',
  'Conferencia + evaluación + programa',
]

const momentoOpciones: Momento[] = [
  'Con presupuesto aprobado',
  'Necesitamos una propuesta formal',
  'Explorando opciones',
]

const form = ref<PropuestaForm>({
  contacto: '',
  puesto: '',
  empresa: '',
  email: '',
  whatsapp: '',
  numColaboradores: '',
  programaInteres: '',
  objetivoPrincipal: '',
  momento: '',
  mensaje: '',
})

const sent = ref(false)

const isValid = computed(() => {
  const f = form.value
  return (
    f.contacto.trim().length > 1 &&
    f.puesto.trim().length > 1 &&
    f.empresa.trim().length > 1 &&
    /.+@.+\..+/.test(f.email) &&
    f.whatsapp.trim().length > 5 &&
    f.numColaboradores !== '' &&
    f.programaInteres !== '' &&
    f.objetivoPrincipal !== '' &&
    f.momento !== ''
  )
})

function preseleccionarPrograma(nombre: string) {
  form.value.programaInteres = nombre
}

function enviarPropuesta() {
  if (!isValid.value) return
  sent.value = true
}
</script>

<template>
  <div class="empresas-view">
    <!-- 01. HERO -->
    <section class="hero">
      <div class="hero__container">
        <p class="hero__eyebrow">PHB CORPORATE HEALTH</p>
        <h1 class="hero__title">
          La salud de tu organización no se mide en asistencias. Se mide en decisiones.
        </h1>
        <p class="hero__subtitle">
          Programas de evaluación, conferencia y activación conductual para directivos y
          colaboradores. De un evento aislado de bienestar a una estrategia de salud medible.
        </p>
        <div class="hero__ctas">
          <BaseButton variant="primary" size="lg" href="#propuesta">Diseñar mi programa</BaseButton>
          <BaseButton variant="ghost" size="lg" href="#programas">Ver programas</BaseButton>
        </div>
        <ul class="hero__indicadores">
          <li v-for="i in indicadores" :key="i.label" class="hero__indicador">
            {{ i.label }}
          </li>
        </ul>
      </div>
    </section>

    <!-- 02. PROGRAMAS -->
    <section id="programas" class="programas">
      <div class="programas__container">
        <SectionHeader
          eyebrow="PROGRAMAS"
          title="Cuatro programas. Una misma estrategia de salud organizacional."
          subtitle="Cada programa resuelve una necesidad distinta: entender a tu liderazgo, entender a tu plantilla, activar comportamientos o hacer las tres cosas a la vez."
        />
        <ul class="programas__grid">
          <li
            v-for="p in programas"
            :key="p.id"
            class="programa-card"
            :class="{ 'programa-card--destacado': p.destacado }"
          >
            <span v-if="p.destacado" class="programa-card__badge">Más solicitado</span>
            <i class="programa-card__icon" :class="p.icon" aria-hidden="true"></i>
            <h3 class="programa-card__nombre">{{ p.nombre }}</h3>
            <p class="programa-card__tagline">{{ p.tagline }}</p>
            <p class="programa-card__para-quien"><strong>Para quién:</strong> {{ p.paraQuien }}</p>
            <p class="programa-card__incluye-label">Incluye:</p>
            <ul class="programa-card__incluye">
              <li v-for="item in p.incluye" :key="item">
                <i class="fa-solid fa-check" aria-hidden="true"></i>
                <span>{{ item }}</span>
              </li>
            </ul>
            <p class="programa-card__entregable">
              <strong>Entregable:</strong> {{ p.entregable }}
            </p>
            <BaseButton
              variant="primary"
              size="md"
              href="#propuesta"
              block
              @click="preseleccionarPrograma(p.nombre)"
            >
              Solicitar propuesta
            </BaseButton>
          </li>
        </ul>
      </div>
    </section>

    <!-- 03. CÓMO IMPLEMENTAMOS -->
    <section class="implementacion">
      <div class="implementacion__container">
        <SectionHeader
          eyebrow="CÓMO IMPLEMENTAMOS"
          title="Un proceso, no un evento."
        />
        <ol class="implementacion__fases">
          <li v-for="f in fases" :key="f.numero" class="implementacion__fase">
            <span class="implementacion__numero">{{ f.numero }}</span>
            <div class="implementacion__fase-body">
              <p class="implementacion__fase-title">{{ f.titulo }}</p>
              <p class="implementacion__fase-copy">{{ f.copy }}</p>
            </div>
          </li>
        </ol>
        <div class="implementacion__journey">
          <JourneyPath :steps="['Comprender', 'Evaluar', 'Actuar', 'Medir', 'Regenerar']" active="Evaluar" />
        </div>
      </div>
    </section>

    <!-- 04. QUÉ RECIBE LA ORGANIZACIÓN -->
    <section class="recibe">
      <div class="recibe__container">
        <SectionHeader
          eyebrow="QUÉ RECIBE LA ORGANIZACIÓN"
          title="Información que se puede usar para decidir."
        />
        <ul class="recibe__grid">
          <li v-for="r in recibe" :key="r.titulo" class="recibe__item">
            {{ r.titulo }}
          </li>
        </ul>
        <p class="recibe__nota">
          Los reportes organizacionales son siempre agregados y anónimos. La información
          individual pertenece a cada persona.
        </p>
      </div>
    </section>

    <!-- 05. SOLICITAR PROPUESTA -->
    <section id="propuesta" class="propuesta">
      <div class="propuesta__container">
        <SectionHeader
          eyebrow="SOLICITAR PROPUESTA"
          title="Cuéntanos de tu organización y diseñamos una propuesta a la medida."
          subtitle="Un especialista de PHB revisa tu solicitud y te contacta con una propuesta a la medida de tu organización."
        />

        <div v-if="!sent" class="propuesta__form-wrap">
          <form class="propuesta__form" @submit.prevent="enviarPropuesta">
            <div class="propuesta__field">
              <label class="propuesta__label" for="contacto">Nombre de contacto</label>
              <input
                id="contacto"
                v-model="form.contacto"
                type="text"
                class="propuesta__input"
                placeholder="Nombre y apellido"
              />
            </div>

            <div class="propuesta__field">
              <label class="propuesta__label" for="puesto">Puesto</label>
              <input
                id="puesto"
                v-model="form.puesto"
                type="text"
                class="propuesta__input"
                placeholder="Ej. Directora de Recursos Humanos"
              />
            </div>

            <div class="propuesta__field">
              <label class="propuesta__label" for="empresa">Empresa</label>
              <input
                id="empresa"
                v-model="form.empresa"
                type="text"
                class="propuesta__input"
                placeholder="Nombre de la empresa"
              />
            </div>

            <div class="propuesta__field">
              <label class="propuesta__label" for="email">Email corporativo</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="propuesta__input"
                placeholder="nombre@empresa.com"
              />
            </div>

            <div class="propuesta__field">
              <label class="propuesta__label" for="whatsapp">WhatsApp</label>
              <input
                id="whatsapp"
                v-model="form.whatsapp"
                type="tel"
                class="propuesta__input"
                placeholder="Número con lada"
              />
            </div>

            <div class="propuesta__field">
              <label class="propuesta__label" for="colaboradores">Número de colaboradores</label>
              <select id="colaboradores" v-model="form.numColaboradores" class="propuesta__input">
                <option value="" disabled>Selecciona una opción</option>
                <option v-for="op in numColaboradoresOpciones" :key="op" :value="op">{{ op }}</option>
              </select>
            </div>

            <div class="propuesta__field">
              <label class="propuesta__label" for="programa">Programa de interés</label>
              <select id="programa" v-model="form.programaInteres" class="propuesta__input">
                <option value="" disabled>Selecciona una opción</option>
                <option v-for="p in programas" :key="p.id" :value="p.nombre">{{ p.nombre }}</option>
              </select>
            </div>

            <div class="propuesta__field">
              <label class="propuesta__label" for="objetivo">Objetivo principal</label>
              <select id="objetivo" v-model="form.objetivoPrincipal" class="propuesta__input">
                <option value="" disabled>Selecciona una opción</option>
                <option v-for="op in objetivoPrincipalOpciones" :key="op" :value="op">{{ op }}</option>
              </select>
            </div>

            <div class="propuesta__field">
              <label class="propuesta__label" for="momento">Momento</label>
              <select id="momento" v-model="form.momento" class="propuesta__input">
                <option value="" disabled>Selecciona una opción</option>
                <option v-for="op in momentoOpciones" :key="op" :value="op">{{ op }}</option>
              </select>
            </div>

            <div class="propuesta__field propuesta__field--full">
              <label class="propuesta__label" for="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                v-model="form.mensaje"
                class="propuesta__input propuesta__textarea"
                rows="4"
                placeholder="Cuéntanos más sobre lo que buscas"
              ></textarea>
            </div>

            <div class="propuesta__field propuesta__field--full">
              <BaseButton variant="primary" size="lg" :disabled="!isValid">
                Solicitar propuesta
              </BaseButton>
            </div>
          </form>
        </div>

        <div v-else class="propuesta__confirmacion">
          <p class="propuesta__confirmacion-title">
            Recibimos tu solicitud. Un especialista de PHB te contacta en menos de 24 horas hábiles.
          </p>
        </div>

        <p class="propuesta__contacto-directo">
          También puedes escribirnos directo a
          <a class="propuesta__contacto-link" :href="`mailto:${CONTACT.email}`">{{ CONTACT.email }}</a>
          o por
          <a class="propuesta__contacto-link" :href="CONTACT.whatsapp" target="_blank" rel="noopener">WhatsApp</a>.
        </p>
      </div>
    </section>

    <!-- 06. CIERRE -->
    <section class="cierre">
      <div class="cierre__container">
        <p class="cierre__title">
          Una conferencia informa. Un programa cambia comportamientos.
        </p>
        <div class="cierre__ctas">
          <BaseButton variant="primary" size="lg" to="/conferencias">Ver conferencias</BaseButton>
          <BaseButton variant="ghost" size="lg" to="/actua">Conocer PHB ACTÚA</BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.empresas-view {
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
    max-width: 20ch;
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

  &__indicadores {
    display: flex;
    flex-wrap: wrap;
    gap: $sp-3;
    margin-top: $sp-5;
    padding-top: $sp-5;
    border-top: 1px solid $line;
  }

  &__indicador {
    @include eyebrow;
    color: $accent;
    background: rgba($cyan, 0.08);
    border: 1px solid $line-strong;
    border-radius: $r-pill;
    padding: $sp-2 $sp-4;
  }
}

// 02. PROGRAMAS
.programas {
  @include section-pad;
  background: $navy-soft;

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

  &__para-quien,
  &__entregable {
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

// 03. CÓMO IMPLEMENTAMOS
.implementacion {
  @include section-pad;
  background: $navy;

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
      background: $line-strong;
    }
  }

  &__numero {
    flex: 0 0 auto;
    @include center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: $r-pill;
    background: $surface-2;
    color: $accent;
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
    color: $white;
  }

  &__fase-copy {
    @include body;
    color: $muted;
    max-width: 56ch;
  }

  &__journey {
    padding-top: $sp-5;
    border-top: 1px solid $line;
  }
}

// 04. QUÉ RECIBE LA ORGANIZACIÓN
.recibe {
  @include section-pad;
  background: $bone;

  &__container {
    @include container;
    @include col($sp-6);
  }

  &__grid {
    display: flex;
    flex-wrap: wrap;
    gap: $sp-4;
  }

  &__item {
    @include card-surface;
    background: $white;
    border: 1px solid $bone-line;
    backdrop-filter: none;
    flex: 1 1 100%;
    padding: $sp-5;
    font-family: $font-accent;
    font-weight: 600;
    color: $ink;

    @include from($bp-md) {
      flex: 1 1 calc(50% - #{$sp-4} / 2);
    }
  }

  &__nota {
    @include body;
    color: rgba($ink, 0.7);
    max-width: 62ch;
    padding-top: $sp-4;
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
}

// 05. SOLICITAR PROPUESTA
.propuesta {
  @include section-pad;
  background: $navy;

  &__container {
    @include container;
    @include col($sp-6);
  }

  &__form-wrap {
    @include card-surface;
    padding: $sp-5;
    border: 1px solid $line;
  }

  &__form {
    display: flex;
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

  &__label {
    font-family: $font-accent;
    font-size: 0.82rem;
    letter-spacing: 0.03em;
    color: $cloud;
  }

  &__input {
    width: 100%;
    background: rgba($ink, 0.5);
    border: 1px solid $line-strong;
    border-radius: $r-md;
    padding: $sp-3 $sp-4;
    color: $white;
    font-family: $font-body;
    font-size: 0.95rem;
    transition: border-color 0.18s ease, box-shadow 0.18s ease;
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
    min-height: 7rem;
  }

  &__confirmacion {
    @include card-surface;
    @include col($sp-3);
    padding: $sp-6;
    border: 1px solid $cyan;
    align-items: flex-start;
  }

  &__confirmacion-title {
    @include body-lg;
    color: $white;
  }

  &__contacto-directo {
    @include body;
    color: $muted;
  }

  &__contacto-link {
    color: $cyan;
    text-decoration: underline;

    &:hover {
      color: $accent;
    }
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
