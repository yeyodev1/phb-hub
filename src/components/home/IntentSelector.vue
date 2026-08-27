<script setup lang="ts">
import { INTENTS } from '@/data/intents'
import { useJourneyStore } from '@/stores/journey'
import SectionHeader from '@/components/ui/SectionHeader.vue'

const journey = useJourneyStore()
</script>

<template>
  <section id="explorar" class="intents">
    <div class="intents__inner">
      <SectionHeader
        eyebrow="Empieza por aquí"
        title="¿Qué estás buscando hoy?"
        subtitle="Elige una opción. Te hacemos tres preguntas cortas y te llevamos exactamente al lugar del ecosistema que corresponde a tu situación."
        align="center"
      />

      <ul class="intents__list">
        <li v-for="item in INTENTS" :key="item.id" class="intents__item">
          <button class="intent" @click="journey.open(item.id)">
            <span class="intent__icon" aria-hidden="true"><i :class="item.icon"></i></span>
            <span class="intent__text">
              <span class="intent__title">{{ item.title }}</span>
              <span class="intent__desc">{{ item.description }}</span>
            </span>
            <span class="intent__stage">{{ item.stage }}</span>
          </button>
        </li>
      </ul>

      <p class="intents__note">
        3 preguntas · menos de 60 segundos · sin costo
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.intents {
  @include section-pad;
  background: linear-gradient(180deg, $ink 0%, $navy 100%);

  &__inner {
    @include container;
    @include col($sp-6);
  }

  &__list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $sp-3;
  }

  &__item {
    flex: 1 1 100%;
    display: flex;

    @include from($bp-md) {
      flex: 1 1 calc(50% - #{$sp-3} / 2);
    }

    @include from($bp-lg) {
      flex: 1 1 calc(33.333% - #{$sp-3} * 2 / 3);
    }
  }

  &__note {
    font-family: $font-accent;
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba($muted, 0.8);
    text-align: center;
  }
}

.intent {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: $sp-4;
  width: 100%;
  text-align: left;
  padding: $sp-5;
  @include card-surface;
  transition: border-color 0.2s ease, transform 0.2s ease, background 0.2s ease;
  @include focus-ring;

  &:hover {
    border-color: rgba($cyan, 0.5);
    transform: translateY(-3px);
  }

  &__icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: $r-md;
    border: 1px solid rgba($gold, 0.35);
    background: rgba($gold, 0.08);
    color: $gold-soft;
    font-size: 1.15rem;
    line-height: 1;
  }

  &__text {
    @include col($sp-1);
    flex: 1;
  }

  &__title {
    font-family: $font-display;
    font-weight: 600;
    font-size: 1.02rem;
    line-height: 1.3;
    color: $white;
  }

  &__desc {
    font-size: 0.86rem;
    line-height: 1.5;
    color: $muted;
  }

  &__stage {
    position: absolute;
    top: $sp-4;
    right: $sp-4;
    font-family: $font-accent;
    font-size: 0.58rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba($cyan, 0.7);
  }
}
</style>
