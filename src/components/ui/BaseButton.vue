<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'ghost' | 'solid-light' | 'link'
    size?: 'md' | 'lg'
    to?: string
    href?: string
    block?: boolean
    disabled?: boolean
  }>(),
  { variant: 'primary', size: 'md', block: false, disabled: false },
)

const tag = computed(() => {
  if (props.href) return 'a'
  if (props.to) return 'router-link'
  return 'button'
})

const bind = computed(() => {
  if (props.href) return { href: props.href, target: '_blank', rel: 'noopener' }
  if (props.to) return { to: props.to }
  return { disabled: props.disabled }
})
</script>

<template>
  <component
    :is="tag"
    v-bind="bind"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`, { 'btn--block': block }]"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $sp-2;
  font-family: $font-accent;
  font-weight: 600;
  font-size: 0.92rem;
  line-height: 1;
  text-align: center;
  border-radius: $r-pill;
  padding: 0.95rem 1.5rem;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease,
    border-color 0.18s ease, opacity 0.18s ease;
  @include focus-ring;

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
}

.btn--lg {
  padding: 1.1rem 1.9rem;
  font-size: 1rem;
}

.btn--block {
  display: flex;
  width: 100%;
}

.btn--primary {
  background: $grad-cta;
  color: $ink;
  box-shadow: 0 10px 30px rgba($cyan, 0.28);

  &:hover:not(:disabled) {
    box-shadow: 0 14px 38px rgba($cyan, 0.4);
  }
}

.btn--ghost {
  border: 1px solid $line-strong;
  color: $white;
  background: rgba($white, 0.03);

  &:hover:not(:disabled) {
    border-color: $cyan;
    background: rgba($cyan, 0.08);
  }
}

.btn--solid-light {
  background: $white;
  color: $ink;

  &:hover:not(:disabled) {
    background: $cloud;
  }
}

.btn--link {
  padding: 0;
  color: $cyan;
  background: none;

  &:hover:not(:disabled) {
    color: $accent;
  }
}
</style>
