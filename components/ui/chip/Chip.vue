<script lang="ts" setup>
import { chipVariants, type ChipVariants } from '.'

const props = withDefaults(defineProps<{
  class?: ClassValue
  show?: boolean
  inset?: boolean
  text?: string | number
  animation?: boolean
  position?: ChipVariants['position']
  color?: ChipVariants['color']
  size?: ChipVariants['size']
}>(), {
  class: undefined,
  show: true,
  inset: true,
  text: '',
  animation: true,
  position: 'top-right',
  color: 'primary',
  size: 'sm',
})
</script>

<template>
  <div class="relative inline-flex h-fit shrink-0 items-center justify-center">
    <slot />
    <template v-if="show">
      <span v-if="animation" :class="cn(chipVariants({ color, position, size, translate: inset ? null : position }), 'animate-ping', props.class)" />
      <span :class="cn(chipVariants({ color, position, size, translate: inset ? null : position }), props.class)">
        <slot name="content">
          {{ text }}
        </slot>
      </span>
    </template>
  </div>
</template>