<script lang="ts" setup>
import type { ClassValue } from 'clsx'
import { chipVariants, type ChipVariants } from '.'

const { class: mainClass, show = true, inset = true, animation = true, 
  position = 'top-right', color = 'primary', size = 'sm' } = defineProps<{
  class?: ClassValue
  show?: boolean
  inset?: boolean
  text?: string | number
  animation?: boolean
  position?: ChipVariants['position']
  color?: ChipVariants['color']
  size?: ChipVariants['size']
}>()
</script>

<template>
  <div class="relative inline-flex h-fit shrink-0 items-center justify-center">
    <slot />
    <template v-if="show">
      <span v-if="animation" :class="cn(chipVariants({ color, position, size, translate: inset ? null : position }), 'animate-ping', mainClass)" />
      <span :class="cn(chipVariants({ color, position, size, translate: inset ? null : position }), mainClass)">
        <slot name="content">
          {{ text }}
        </slot>
      </span>
    </template>
  </div>
</template>