<script setup lang="ts">
import type { ClassValue } from 'clsx'
import type { ComboboxSeparatorProps } from 'radix-vue'
import { ComboboxSeparator } from 'radix-vue'

const { class: mainClass, ...root } = defineProps<ComboboxSeparatorProps & { class?: ClassValue }>()
</script>

<template>
  <ComboboxSeparator v-bind="root" :class="cn('-mx-1 h-px bg-border', mainClass)">
    <slot />
  </ComboboxSeparator>
</template>
