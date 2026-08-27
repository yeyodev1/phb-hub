<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    subtitle?: string
    align?: 'start' | 'center'
  }>(),
  { align: 'start' },
)
</script>

<template>
  <header class="section-header" :class="`section-header--${align}`">
    <p v-if="eyebrow" class="section-header__eyebrow">{{ eyebrow }}</p>
    <h2 class="section-header__title">{{ title }}</h2>
    <p v-if="subtitle" class="section-header__subtitle">{{ subtitle }}</p>
    <slot />
  </header>
</template>

<style lang="scss" scoped>
.section-header {
  @include col($sp-3);
  max-width: 60ch;

  &--center {
    align-items: center;
    text-align: center;
    margin-inline: auto;
  }

  &__eyebrow {
    @include eyebrow;
  }

  &__title {
    @include display-lg;
    color: $white;
  }

  &__subtitle {
    @include body-lg;
  }
}
</style>
