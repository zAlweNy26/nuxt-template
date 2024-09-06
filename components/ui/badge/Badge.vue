<script setup lang="ts">
import type { ClassValue } from 'clsx'
import { type BadgeVariants, badgeVariants } from '.'

const { class: mainClass } = defineProps<{ 
  class?: ClassValue
  variant?: BadgeVariants['variant']
  size?: BadgeVariants['size']
}>()
</script>

<template>
  <div :class="cn(badgeVariants({ variant, size }), mainClass)">
    <slot />
  </div>
</template>
