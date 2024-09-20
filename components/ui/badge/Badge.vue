<script setup lang="ts">
import { type BadgeProps, badgeVariants } from '.'

const { class: rootClass, variant = 'solid', color = 'primary', size = 'sm' } = defineProps<BadgeProps>()
</script>

<template>
  <div :class="cn(badgeVariants({ variant, size, color }), rootClass)">
    <slot />
  </div>
</template>
