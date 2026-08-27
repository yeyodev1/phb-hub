<script setup lang="ts">
withDefaults(
  defineProps<{
    steps?: readonly string[]
    active?: string
  }>(),
  { steps: () => ['Comprender', 'Evaluar', 'Actuar', 'Medir', 'Regenerar'] },
)
</script>

<template>
  <ol class="journey">
    <li
      v-for="(s, i) in steps"
      :key="s"
      class="journey__step"
      :class="{ 'journey__step--active': s === active }"
    >
      <span class="journey__index">{{ String(i + 1).padStart(2, '0') }}</span>
      <span class="journey__label">{{ s }}</span>
      <i
        v-if="i < steps.length - 1"
        class="fa-solid fa-chevron-right journey__arrow"
        aria-hidden="true"
      ></i>
    </li>
  </ol>
</template>

<style lang="scss" scoped>
.journey {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: $sp-2 $sp-3;

  &__step {
    display: flex;
    align-items: center;
    gap: $sp-2;
    font-family: $font-accent;
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: $muted;

    &--active {
      color: $accent;
    }
  }

  &__index {
    font-size: 0.62rem;
    color: rgba($gold, 0.85);
  }

  &__arrow {
    font-size: 0.55rem;
    color: rgba($gold, 0.6);
  }
}
</style>
