<script setup lang="ts">
import type { ClassValue } from 'clsx'
import { Label, type LabelProps } from 'radix-vue'
import { type LabelVariants, labelVariants } from '.'

const { class: mainClass, size, ...root } = defineProps<LabelProps & {
  size?: LabelVariants['size'] 
  class?: ClassValue 
}>()
</script>

<template>
  <Label v-bind="root" :class="cn(labelVariants({ size }), mainClass)">
    <slot />
  </Label>
</template>
