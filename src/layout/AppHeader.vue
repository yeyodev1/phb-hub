<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { CONTACT, EXTERNAL } from '@/config/destinations'
import { LOGOS } from '@/config/media'

interface NavItem {
  label: string
  to: string
  hint: string
}

const NAV: NavItem[] = [
  { label: 'Inicio', to: '/', hint: 'El punto de partida' },
  { label: 'Aprende', to: '/aprende', hint: 'Libros, guías, cursos y masterclasses' },
  { label: 'Actúa', to: '/actua', hint: 'Programas para sostener el cambio' },
  { label: 'Regeneración', to: '/regeneracion', hint: 'Programas clínicos regenerativos' },
  { label: 'Conferencias', to: '/conferencias', hint: 'Para empresas e instituciones' },
  { label: 'Empresas', to: '/empresas', hint: 'PHB Corporate Health' },
]

const EXTERNOS = [
  { label: 'Evalúate — PHB', href: EXTERNAL.evaluate, icon: 'fa-solid fa-chart-simple' },
  { label: 'Tienda', href: EXTERNAL.store, icon: 'fa-solid fa-bag-shopping' },
]

const open = ref(false)
const route = useRoute()

function close() {
  open.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

watch(open, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
  if (isOpen) window.addEventListener('keydown', onKeydown)
  else window.removeEventListener('keydown', onKeydown)
})

watch(() => route.fullPath, close)

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header class="header">
    <div class="header__bar">
      <router-link to="/" class="header__brand" aria-label="Juan Román Garza × PHB">
        <img :src="LOGOS.jrg" alt="Juan Román Garza" class="header__brand-logo" />
        <span class="header__brand-x">×</span>
        <span class="header__brand-phb">PHB</span>
      </router-link>

      <nav class="header__desktop-nav">
        <router-link v-for="item in NAV.slice(1)" :key="item.to" :to="item.to">
          {{ item.label }}
        </router-link>
      </nav>

      <div class="header__right">
        <a
          class="header__wa"
          :href="CONTACT.whatsapp"
          target="_blank"
          rel="noopener"
          aria-label="Escribir por WhatsApp"
        >
          <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
          <span>Contactar</span>
        </a>

        <button
          class="header__toggle"
          :aria-expanded="open"
          aria-controls="menu-full"
          aria-label="Abrir menú"
          @click="open = true"
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <!-- MENÚ PANTALLA COMPLETA -->
    <transition name="menu">
      <div v-if="open" id="menu-full" class="menu" role="dialog" aria-modal="true">
        <div class="menu__glow" aria-hidden="true"></div>

        <div class="menu__top">
          <img :src="LOGOS.jrg" alt="Juan Román Garza" class="menu__logo" />
          <button class="menu__close" aria-label="Cerrar menú" @click="close">
            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </div>

        <nav class="menu__nav">
          <router-link
            v-for="(item, i) in NAV"
            :key="item.to"
            :to="item.to"
            class="menu__link"
            :style="{ '--i': i }"
          >
            <span class="menu__index">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="menu__link-text">
              <span class="menu__label">{{ item.label }}</span>
              <span class="menu__hint">{{ item.hint }}</span>
            </span>
            <i class="fa-solid fa-arrow-right menu__arrow" aria-hidden="true"></i>
          </router-link>
        </nav>

        <div class="menu__externos">
          <a
            v-for="e in EXTERNOS"
            :key="e.href"
            :href="e.href"
            target="_blank"
            rel="noopener"
            class="menu__externo"
          >
            <i :class="e.icon" aria-hidden="true"></i>
            {{ e.label }}
            <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
          </a>
        </div>

        <div class="menu__contacto">
          <p class="menu__contacto-label">¿Prefieres hablar con alguien?</p>

          <a
            class="menu__wa"
            :href="CONTACT.whatsapp"
            target="_blank"
            rel="noopener"
          >
            <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
            <span class="menu__wa-text">
              <span class="menu__wa-title">Escríbenos por WhatsApp</span>
              <span class="menu__wa-num">{{ CONTACT.whatsappDisplay }}</span>
            </span>
          </a>

          <a class="menu__mail" :href="`mailto:${CONTACT.email}`">
            <i class="fa-solid fa-envelope" aria-hidden="true"></i>
            {{ CONTACT.email }}
          </a>

          <p class="menu__method">
            COMPRENDER · DECIDIR · ACTUAR · MEDIR · REGENERAR
          </p>
        </div>
      </div>
    </transition>
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
    flex-shrink: 0;
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

  &__right {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: $sp-3;
  }

  &__wa {
    display: inline-flex;
    align-items: center;
    gap: $sp-2;
    font-family: $font-accent;
    font-weight: 600;
    font-size: 0.8rem;
    color: $ink;
    background: $grad-cta;
    border-radius: $r-pill;
    padding: 0.6rem 0.9rem;
    @include focus-ring;

    i {
      font-size: 1rem;
    }

    span {
      display: none;

      @include from($bp-sm) {
        display: inline;
      }
    }

    @include from($bp-md) {
      padding: 0.7rem 1.2rem;
      font-size: 0.85rem;
    }
  }

  &__toggle {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: 42px;
    height: 42px;
    border: 1px solid $line-strong;
    border-radius: $r-sm;
    @include focus-ring;

    span {
      display: block;
      height: 1.5px;
      background: $white;
      transition: width 0.2s ease;

      &:first-child {
        width: 18px;
      }

      &:last-child {
        width: 12px;
      }
    }

    &:hover span:last-child {
      width: 18px;
    }
  }
}

/* ---------- MENÚ PANTALLA COMPLETA ---------- */
.menu {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: $sp-5;
  overflow-y: auto;
  padding: $sp-5 $sp-5 $sp-7;
  background: radial-gradient(130% 80% at 85% 0%, $navy-soft 0%, $ink 60%);

  @include from($bp-lg) {
    padding: $sp-6 $sp-8 $sp-8;
    gap: $sp-6;
  }

  &__glow {
    position: absolute;
    top: -20%;
    right: -20%;
    width: 90vw;
    height: 60vh;
    background: radial-gradient(
      closest-side,
      rgba($gold, 0.16) 0%,
      rgba($cyan, 0.1) 45%,
      transparent 72%
    );
    pointer-events: none;
  }

  &__top {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: $sp-4;
  }

  &__logo {
    height: 24px;
    width: auto;

    @include from($bp-md) {
      height: 30px;
    }
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 46px;
    border-radius: $r-pill;
    border: 1px solid $line-strong;
    color: $white;
    font-size: 1.1rem;
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
    @include focus-ring;

    &:hover {
      border-color: $gold;
      background: rgba($gold, 0.1);
      transform: rotate(90deg);
    }
  }

  &__nav {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &__link {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: $sp-4;
    padding-block: $sp-4;
    border-bottom: 1px solid $line;
    animation: menu-in 0.42s cubic-bezier(0.22, 1, 0.36, 1) backwards;
    animation-delay: calc(var(--i) * 45ms + 60ms);
    transition: padding-left 0.22s ease;

    &:hover,
    &.router-link-active {
      padding-left: $sp-3;

      .menu__label {
        color: $gold-soft;
      }

      .menu__arrow {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @include from($bp-md) {
      padding-block: $sp-5;
    }
  }

  &__index {
    flex-shrink: 0;
    font-family: $font-accent;
    font-size: 0.66rem;
    letter-spacing: 0.1em;
    color: rgba($gold, 0.8);
  }

  &__link-text {
    @include col($sp-1);
    flex: 1;
  }

  &__label {
    font-family: $font-display;
    font-weight: 700;
    font-size: clamp(1.6rem, 7vw, 2.6rem);
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: $white;
    transition: color 0.2s ease;
  }

  &__hint {
    font-size: 0.8rem;
    color: $muted;
  }

  &__arrow {
    flex-shrink: 0;
    color: $gold;
    opacity: 0;
    transform: translateX(-8px);
    transition: opacity 0.22s ease, transform 0.22s ease;
  }

  &__externos {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $sp-3;
  }

  &__externo {
    display: flex;
    align-items: center;
    gap: $sp-3;
    flex: 1 1 100%;
    padding: $sp-4;
    border: 1px solid $line-strong;
    border-radius: $r-md;
    font-family: $font-accent;
    font-size: 0.85rem;
    color: $muted-strong;
    transition: border-color 0.2s ease, color 0.2s ease;

    i:first-child {
      color: $cyan;
    }

    i:last-child {
      margin-left: auto;
      font-size: 0.7rem;
      color: rgba($gold, 0.8);
    }

    &:hover {
      border-color: $cyan;
      color: $white;
    }

    @include from($bp-md) {
      flex: 1 1 calc(50% - #{$sp-3} / 2);
    }
  }

  &__contacto {
    position: relative;
    @include col($sp-3);
    padding-top: $sp-5;
    border-top: 1px solid $line;
  }

  &__contacto-label {
    @include eyebrow;
    color: $gold-soft;
  }

  &__wa {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: $sp-4;
    padding: $sp-4 $sp-5;
    border-radius: $r-md;
    background: linear-gradient(120deg, #25d366 0%, #128c7e 100%);
    color: $ink;
    box-shadow: 0 14px 34px rgba(#25d366, 0.24);
    transition: transform 0.18s ease, box-shadow 0.18s ease;
    @include focus-ring;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 18px 42px rgba(#25d366, 0.34);
    }

    > i {
      font-size: 1.8rem;
    }
  }

  &__wa-text {
    @include col(2px);
  }

  &__wa-title {
    font-family: $font-display;
    font-weight: 700;
    font-size: 1rem;
  }

  &__wa-num {
    font-family: $font-accent;
    font-size: 0.8rem;
    opacity: 0.85;
  }

  &__mail {
    display: flex;
    align-items: center;
    gap: $sp-3;
    font-size: 0.9rem;
    color: $muted;

    i {
      color: rgba($gold, 0.8);
    }

    &:hover {
      color: $white;
    }
  }

  &__method {
    font-family: $font-accent;
    font-size: 0.62rem;
    letter-spacing: 0.16em;
    color: rgba($muted, 0.6);
    padding-top: $sp-3;
  }
}

@keyframes menu-in {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.28s ease, transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: scale(1.02);
}
</style>
