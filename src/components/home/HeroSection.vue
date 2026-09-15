<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import { EXTERNAL } from '@/config/destinations'
import { JUAN, LOGOS } from '@/config/media'
</script>

<template>
  <section class="hero">
    <div class="hero__glow" aria-hidden="true"></div>

    <div class="hero__inner">
      <div class="hero__text">
        <img :src="LOGOS.jrg" alt="Juan Román Garza" class="hero__logo" />

        <p class="hero__eyebrow">
          Psicología de la Salud · Medicina Conductual · Regeneración · Longevidad Productiva
        </p>

        <h1 class="hero__headline">
          Decisiones Inteligentes para tu Salud.
          <span>Simplificadas.</span>
        </h1>

        <p class="hero__sub">
          He reunido años de estudio, experiencia y exploración en salud, conducta, tecnología
          y medicina regenerativa para convertirlos en conferencias, cursos, libros,
          evaluaciones, herramientas y programas que te ayuden a entender mejor tu salud,
          actuar con mayor inteligencia y construir una estrategia personal de prevención,
          regeneración y longevidad.
        </p>

        <div class="hero__actions">
          <BaseButton size="lg" :href="EXTERNAL.catalog">
            Explorar recursos
            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </BaseButton>
          <BaseButton variant="ghost" size="lg" :href="EXTERNAL.evaluate">
            <i class="fa-solid fa-chart-simple" aria-hidden="true"></i>
            Evaluar mi salud
          </BaseButton>
        </div>

        <p class="hero__mission">
          Mi misión es simplificar decisiones inteligentes de salud para ayudarte a vivir más
          años con salud, energía, autonomía y propósito.
        </p>
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
            Psicología de la Salud · Medicina Conductual · Regeneración · Longevidad Productiva
          </span>
        </figcaption>
      </figure>
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
    padding-block: $sp-7;

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

    // Hero 55/45: copy + CTAs a la izquierda, fotografía editorial a la derecha.
    @include from($bp-lg) {
      flex: 1 1 55%;
      max-width: 55%;
    }
  }

  &__logo {
    width: 168px;
    height: auto;
    opacity: 0.95;
  }

  &__eyebrow {
    font-family: $font-accent;
    font-size: 0.7rem;
    line-height: 1.6;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: $gold-soft;
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
    max-width: 60ch;
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

  &__mission {
    padding-left: $sp-4;
    border-left: 2px solid $gold;
    font-family: $font-display;
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.55;
    color: $white;
    max-width: 56ch;
  }

  &__portrait {
    position: relative;
    flex: 1 1 auto;
    border-radius: $r-lg;
    overflow: hidden;
    border: 1px solid rgba($gold, 0.4);
    box-shadow: 0 24px 60px rgba($ink, 0.6);

    @include from($bp-lg) {
      flex: 1 1 45%;
      max-width: 45%;
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
}
</style>
