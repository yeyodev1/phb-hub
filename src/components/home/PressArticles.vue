<script setup lang="ts">
import { PRESS_ARTICLES } from '@/config/media'
</script>

<template>
  <section class="press" aria-labelledby="press-title">
    <div class="press__inner">
      <p id="press-title" class="press__label">Reconocido en</p>

      <ul class="press__list">
        <li v-for="a in PRESS_ARTICLES" :key="a.url" class="press__item">
          <a :href="a.url" target="_blank" rel="noopener" class="article">
            <span class="article__shot">
              <img :src="a.image" :alt="`Artículo en ${a.outlet}`" loading="lazy" />
            </span>
            <span class="article__outlet">{{ a.outlet }}</span>
            <span class="article__title">{{ a.title }}</span>
            <span class="article__go">
              Leer artículo
              <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.press {
  background: $ink;
  border-block: 1px solid $line;
  padding-block: $sp-6;

  &__inner {
    @include container;
    @include col($sp-4);
  }

  &__label {
    font-family: $font-accent;
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba($muted, 0.8);
  }

  // Tira horizontal con scroll: siete artículos sin empujar el resto del home.
  &__list {
    display: flex;
    flex-direction: row;
    gap: $sp-3;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-bottom: $sp-3;
    // Desvanecido a la derecha: sugiere que hay más artículos sin mostrar una barra tosca.
    mask-image: linear-gradient(90deg, #000 0%, #000 88%, transparent 100%);
    // Barra de scroll delgada con los colores de la marca (la nativa se veía blanca).
    scrollbar-width: thin;
    scrollbar-color: rgba($gold, 0.55) transparent;

    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: rgba($white, 0.04);
      border-radius: $r-pill;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba($gold, 0.5);
      border-radius: $r-pill;

      &:hover {
        background: $gold-soft;
      }
    }
  }

  &__item {
    flex: 0 0 240px;
    display: flex;
    scroll-snap-align: start;

    @include from($bp-md) {
      flex-basis: 260px;
    }
  }
}

.article {
  @include card-surface;
  @include col($sp-2);
  @include focus-ring;
  width: 100%;
  padding: $sp-3;
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: rgba($gold, 0.45);
    transform: translateY(-3px);
  }

  &__shot {
    display: block;
    border-radius: $r-sm;
    overflow: hidden;
    border: 1px solid $line;
    background: $navy;

    img {
      display: block;
      width: 100%;
      aspect-ratio: 16 / 10;
      object-fit: cover;
      object-position: top center;
    }
  }

  &__outlet {
    font-family: $font-accent;
    font-size: 0.66rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: $gold-soft;
  }

  &__title {
    @include body;
    color: $muted-strong;
    flex: 1;
  }

  &__go {
    display: inline-flex;
    align-items: center;
    gap: $sp-2;
    font-family: $font-accent;
    font-weight: 600;
    font-size: 0.78rem;
    color: $cyan;

    i {
      font-size: 0.65rem;
    }
  }
}
</style>
