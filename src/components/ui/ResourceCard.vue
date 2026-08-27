<script setup lang="ts">
/** Tarjeta de producto/recurso. Sin precio: el CTA lleva al ecosistema. */
defineProps<{
  format: string
  title: string
  description: string
  learn?: string
  audience?: string
  duration?: string
  cta: string
  href?: string
  to?: string
  badge?: string
}>()
</script>

<template>
  <article class="resource">
    <div class="resource__top">
      <span class="resource__format">{{ format }}</span>
      <span v-if="badge" class="resource__badge">{{ badge }}</span>
    </div>

    <h3 class="resource__title">{{ title }}</h3>
    <p class="resource__desc">{{ description }}</p>

    <dl class="resource__meta">
      <div v-if="learn" class="resource__meta-row">
        <dt>Aprenderás</dt>
        <dd>{{ learn }}</dd>
      </div>
      <div v-if="audience" class="resource__meta-row">
        <dt>Ideal para ti si</dt>
        <dd>{{ audience }}</dd>
      </div>
      <div v-if="duration" class="resource__meta-row">
        <dt>Tiempo</dt>
        <dd>{{ duration }}</dd>
      </div>
    </dl>

    <component
      :is="href ? 'a' : to ? 'router-link' : 'span'"
      class="resource__cta"
      v-bind="href ? { href, target: '_blank', rel: 'noopener' } : to ? { to } : {}"
    >
      {{ cta }} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
    </component>
  </article>
</template>

<style lang="scss" scoped>
.resource {
  @include card-surface;
  @include col($sp-3);
  padding: $sp-5;
  height: 100%;
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: rgba($cyan, 0.45);
    transform: translateY(-3px);
  }

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $sp-2;
  }

  &__format {
    @include eyebrow;
    font-size: 0.65rem;
  }

  &__badge {
    font-family: $font-accent;
    font-size: 0.62rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: $gold-soft;
    border: 1px solid rgba($gold, 0.45);
    border-radius: $r-pill;
    padding: 0.25rem 0.6rem;
  }

  &__title {
    font-family: $font-display;
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 1.25;
    color: $white;
  }

  &__desc {
    @include body;
  }

  &__meta {
    @include col($sp-2);
    margin-top: auto;
    padding-top: $sp-3;
    border-top: 1px solid $line;
  }

  &__meta-row {
    @include col($sp-1);

    dt {
      font-family: $font-accent;
      font-size: 0.62rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba($cyan, 0.85);
    }

    dd {
      font-size: 0.88rem;
      line-height: 1.5;
      color: $muted;
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
    padding-top: $sp-2;
  }
}
</style>
