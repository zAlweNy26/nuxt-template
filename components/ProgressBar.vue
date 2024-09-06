<script setup lang="ts">
import type { ClassValue } from 'clsx'
import { ProgressIndicator, ProgressRoot, type ProgressRootProps } from 'radix-vue'

const { class: mainClass, ...root } = defineProps<ProgressRootProps & { 
  class?: ClassValue
}>()

const relativeValue = computed(() => (100 * (root.modelValue ?? 0)) / (root.max ?? 100))
</script>

<template>
  <ProgressRoot v-bind="root" :class="cn('relative h-2 w-full overflow-hidden rounded-full bg-primary/20', mainClass)">
    <ProgressIndicator class="size-full flex-1 bg-primary transition-all"
      :style="`transform: translateX(-${100 - relativeValue}%);`" />
  </ProgressRoot>
</template>
