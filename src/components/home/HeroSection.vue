<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import { EXTERNAL, JOURNEY } from '@/config/destinations'
import { JUAN, LOGOS, PRESS } from '@/config/media'

const emit = defineEmits<{ (e: 'explore'): void }>()

const CREDENTIALS = [
  'Psicología de la Salud',
  'Medicina Conductual',
  'Prevención',
  'Regeneración',
]
</script>

<template>
  <section class="hero">
    <div class="hero__glow" aria-hidden="true"></div>

    <div class="hero__inner">
      <div class="hero__text">
        <img :src="LOGOS.jrg" alt="Juan Román Garza" class="hero__logo" />

        <p class="hero__eyebrow">
          Juan Román Garza
          <span class="hero__x">×</span>
          <span class="hero__phb">PowerHouse Biotech</span>
        </p>

        <h1 class="hero__headline">
          Tu salud no cambia cuando sabes más.
          <span>Cambia cuando empiezas a tomar mejores decisiones.</span>
        </h1>

        <p class="hero__sub">
          Conferencias, cursos, evaluaciones, herramientas y programas diseñados para
          ayudarte a entender tu salud, actuar oportunamente y construir una estrategia
          personal de prevención y regeneración.
        </p>

        <ul class="hero__credentials">
          <li v-for="c in CREDENTIALS" :key="c">
            <i class="fa-solid fa-circle-check" aria-hidden="true"></i>
            {{ c }}
          </li>
        </ul>

        <div class="hero__actions">
          <BaseButton size="lg" @click="emit('explore')">
            Explorar programas
            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </BaseButton>
          <BaseButton variant="ghost" size="lg" :href="EXTERNAL.evaluacion">
            <i class="fa-solid fa-chart-simple" aria-hidden="true"></i>
            Evaluar mi salud con PHB
          </BaseButton>
        </div>
      </div>

      <figure class="hero__portrait">
        <img
          :src="JUAN.portrait"
          alt="Retrato de Juan Román Garza"
          width="900"
          height="600"
        />
        <figcaption>
          <span class="hero__portrait-name">Juan Román Garza</span>
          <span class="hero__portrait-role">
            Psicología de la Salud · Medicina Conductual · Longevidad Productiva
          </span>
        </figcaption>
      </figure>
    </div>

    <div class="hero__method-wrap">
      <ul class="hero__method">
        <li v-for="(s, i) in JOURNEY" :key="s">
          <span>{{ s }}</span>
          <i
            v-if="i < JOURNEY.length - 1"
            class="fa-solid fa-chevron-right hero__method-sep"
            aria-hidden="true"
          ></i>
        </li>
      </ul>
    </div>

    <div class="hero__press">
      <p class="hero__press-label">Reconocido en</p>
      <ul class="hero__press-list">
        <li v-for="(logo, i) in PRESS" :key="logo">
          <img :src="logo" :alt="`Medio ${i + 1}`" height="26" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  position: relative;
  overflow: hidden;
  background: radial-gradient(120% 90% at 80% 0%, $navy-soft 0%, $ink 62%);

  &__glow {
    position: absolute;
    top: -25%;
    right: -10%;
    width: 90vw;
    height: 60vh;
    background: radial-gradient(
      closest-side,
      rgba($gold, 0.16) 0%,
      rgba($cyan, 0.12) 40%,
      transparent 72%
    );
    pointer-events: none;
  }

  &__inner {
    @include container;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: $sp-6;
    padding-block: $sp-7 $sp-6;

    @include from($bp-lg) {
      flex-direction: row;
      align-items: center;
      gap: $sp-8;
      padding-block: $sp-9 $sp-8;
    }
  }

  &__text {
    @include col($sp-4);
    flex: 1 1 auto;

    @include from($bp-lg) {
      flex: 1 1 56%;
      max-width: 56%;
    }
  }

  &__logo {
    width: 168px;
    height: auto;
    opacity: 0.95;
  }

  &__eyebrow {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: $sp-3;
    font-family: $font-accent;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: $gold-soft;
  }

  &__x {
    color: rgba($white, 0.4);
  }

  &__phb {
    font-family: $font-accent;
    font-weight: 600;
    letter-spacing: 0.2em;
    color: $cyan;
  }

  &__headline {
    @include display-xl;
    color: $white;
    padding-bottom: $sp-4;
    border-bottom: 2px solid rgba($gold, 0.55);

    span {
      display: block;
      background: $grad-accent;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
  }

  &__sub {
    @include body-lg;
    max-width: 58ch;
  }

  &__credentials {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $sp-2 $sp-4;

    li {
      display: flex;
      align-items: center;
      gap: $sp-2;
      font-size: 0.82rem;
      color: $muted-strong;
    }

    i {
      font-size: 0.8rem;
      line-height: 1;
      color: $gold;
    }
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: $sp-3;
    width: 100%;
    margin-top: $sp-2;

    @include from($bp-sm) {
      flex-direction: row;
      flex-wrap: wrap;
      width: auto;
    }
  }

  &__portrait {
    position: relative;
    flex: 1 1 auto;
    border-radius: $r-lg;
    overflow: hidden;
    border: 1px solid rgba($gold, 0.4);
    box-shadow: 0 24px 60px rgba($ink, 0.6);

    @include from($bp-lg) {
      flex: 1 1 44%;
      max-width: 44%;
    }

    img {
      width: 100%;
      height: auto;
      display: block;
      aspect-ratio: 4 / 3;
      object-fit: cover;
      object-position: center 20%;
    }

    figcaption {
      position: absolute;
      inset: auto 0 0 0;
      @include col($sp-1);
      padding: $sp-6 $sp-4 $sp-4;
      background: $grad-portrait;
    }
  }

  &__portrait-name {
    font-family: $font-display;
    font-weight: 700;
    font-size: 1.05rem;
    color: $white;
  }

  &__portrait-role {
    font-family: $font-accent;
    font-size: 0.66rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: $gold-soft;
  }

  &__method-wrap {
    @include container;
    position: relative;
  }

  &__method {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: $sp-3;
    padding-block: $sp-5;
    border-top: 1px solid $line;

    li {
      display: flex;
      align-items: center;
      gap: $sp-3;
      font-family: $font-accent;
      font-size: 0.68rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: rgba($muted-strong, 0.85);
    }
  }

  &__method-sep {
    font-size: 0.55rem;
    color: rgba($gold, 0.65);
  }

  &__press {
    @include container;
    @include col($sp-4);
    position: relative;
    padding-bottom: $sp-7;
  }

  &__press-label {
    font-family: $font-accent;
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba($muted, 0.7);
  }

  &__press-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: $sp-4 $sp-6;
    min-height: 26px;

    img {
      height: 20px;
      width: auto;
      max-width: 130px;
      object-fit: contain;
      filter: brightness(0) invert(1);
      opacity: 0.5;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 1;
      }

      @include from($bp-md) {
        height: 26px;
        max-width: 160px;
      }
    }
  }
}
</style>
