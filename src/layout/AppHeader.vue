<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { EXTERNAL } from '@/config/destinations'
import { LOGOS } from '@/config/media'

const NAV = [
  { label: 'Inicio', to: '/' },
  { label: 'Aprende', to: '/aprende' },
  { label: 'Actúa', to: '/actua' },
  { label: 'Regeneración', to: '/regeneracion' },
  { label: 'Conferencias', to: '/conferencias' },
  { label: 'Empresas', to: '/empresas' },
]

const open = ref(false)
const route = useRoute()

watch(
  () => route.fullPath,
  () => (open.value = false),
)
</script>

<template>
  <header class="header">
    <div class="header__bar">
      <router-link to="/" class="header__brand" aria-label="Juan Román Garza × PHB">
        <img :src="LOGOS.jrg" alt="Juan Román Garza" class="header__brand-logo" />
        <span class="header__brand-x">×</span>
        <span class="header__brand-phb">PHB</span>
      </router-link>

      <button
        class="header__toggle"
        :aria-expanded="open"
        aria-controls="nav-drawer"
        :aria-label="open ? 'Cerrar menú' : 'Abrir menú'"
        @click="open = !open"
      >
        <span :class="{ 'is-open': open }"></span>
      </button>

      <nav class="header__desktop-nav">
        <router-link v-for="item in NAV.slice(1)" :key="item.to" :to="item.to">
          {{ item.label }}
        </router-link>
        <a :href="EXTERNAL.evaluacion" target="_blank" rel="noopener">Evalúate</a>
      </nav>

      <a class="header__cta" :href="EXTERNAL.evaluacion" target="_blank" rel="noopener">
        <i class="fa-solid fa-chart-simple" aria-hidden="true"></i>
        Evaluar mi salud
      </a>
    </div>

    <nav v-show="open" id="nav-drawer" class="header__drawer">
      <router-link v-for="item in NAV" :key="item.to" :to="item.to">
        {{ item.label }}
      </router-link>
      <a :href="EXTERNAL.evaluacion" target="_blank" rel="noopener">
        Evalúate — PHB
        <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
      </a>
      <a :href="EXTERNAL.store" target="_blank" rel="noopener">
        Tienda
        <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
      </a>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba($ink, 0.86);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid $line;

  &__bar {
    @include container;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: $sp-4;
    height: 64px;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: $sp-3;
    font-family: $font-display;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  &__brand-logo {
    height: 22px;
    width: auto;

    @include from($bp-md) {
      height: 26px;
    }
  }

  &__brand-x {
    color: rgba($gold, 0.7);
    font-size: 0.75rem;
  }

  &__brand-phb {
    font-family: $font-accent;
    font-weight: 700;
    font-size: 0.9rem;
    letter-spacing: 0.14em;
    color: $cyan;

    @include from($bp-md) {
      font-size: 1rem;
    }
  }

  &__toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 1px solid $line-strong;
    border-radius: $r-sm;
    @include focus-ring;

    span {
      position: relative;
      display: block;
      width: 16px;
      height: 1.5px;
      background: $white;
      transition: background 0.2s ease;

      &::before,
      &::after {
        content: '';
        position: absolute;
        left: 0;
        width: 16px;
        height: 1.5px;
        background: $white;
        transition: transform 0.22s ease;
      }

      &::before {
        top: -5px;
      }

      &::after {
        top: 5px;
      }

      &.is-open {
        background: transparent;

        &::before {
          transform: translateY(5px) rotate(45deg);
        }

        &::after {
          transform: translateY(-5px) rotate(-45deg);
        }
      }
    }

    @include from($bp-lg) {
      display: none;
    }
  }

  &__desktop-nav {
    display: none;

    @include from($bp-lg) {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: $sp-5;
      font-size: 0.88rem;
      color: $muted-strong;

      a {
        transition: color 0.18s ease;

        &:hover,
        &.router-link-active {
          color: $cyan;
        }
      }
    }
  }

  &__cta {
    display: none;

    @include from($bp-lg) {
      display: inline-flex;
      align-items: center;
      gap: $sp-2;
      background: $grad-cta;
      color: $ink;
      font-family: $font-accent;
      font-weight: 600;
      font-size: 0.82rem;
      border-radius: $r-pill;
      padding: 0.7rem 1.2rem;
    }
  }

  &__drawer {
    @include col($sp-1);
    @include container;
    padding-block: $sp-4 $sp-5;
    border-top: 1px solid $line;

    a {
      display: flex;
      align-items: center;
      gap: $sp-2;
      padding: 0.85rem 0;
      font-family: $font-display;
      font-size: 1.05rem;
      color: $muted-strong;
      border-bottom: 1px solid rgba($white, 0.05);

      i {
        font-size: 0.7rem;
        color: rgba($gold, 0.8);
      }

      &.router-link-active {
        color: $cyan;
      }
    }

    @include from($bp-lg) {
      display: none !important;
    }
  }
}
</style>
