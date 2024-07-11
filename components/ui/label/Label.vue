<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Label, type LabelProps } from 'radix-vue'
import { type LabelVariants, labelVariants } from '.'
import { cn } from '@/lib/utils'

const props = defineProps<LabelProps & {
  class?: HTMLAttributes['class']
  size?: LabelVariants['size']
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})
</script>

<template>
  <Label v-bind="delegatedProps" :class="cn(labelVariants({ size }), props.class)">
    <slot />
  </Label>
</template>
