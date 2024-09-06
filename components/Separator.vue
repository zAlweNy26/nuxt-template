<script setup lang="ts">
import type { ClassValue } from 'clsx'
import { Separator, type SeparatorProps } from 'radix-vue'

const { class: mainClass, label, ...root } = defineProps<SeparatorProps & {
  class?: ClassValue
  label?: string
}>()
</script>

<template>
  <Separator v-bind="root" :class="cn(
    'shrink-0 bg-border relative',
    orientation === 'vertical' ? 'w-px h-full' : 'h-px w-full',
    mainClass,
  )">
    <span v-if="label" :class="cn(
      'text-xs text-muted-foreground bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center',
      orientation === 'vertical' ? 'w-px px-1 py-2' : 'h-px py-1 px-2',
    )">
      {{ label }}
    </span>
  </Separator>
</template>
