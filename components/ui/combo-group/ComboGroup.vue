<script lang="ts" setup>
import type { ClassValue } from 'clsx'
import { groupVariants, type GroupVariants } from '.'

const { class: mainClass } = defineProps<{
  class?: ClassValue
  size?: GroupVariants['size']
}>()
</script>

<template>
  <div :class="cn(groupVariants({ size }), mainClass)">
    <slot />
  </div>
</template>