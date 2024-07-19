<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ProgressIndicator, ProgressRoot, type ProgressRootProps } from 'radix-vue'
import { cn } from '@/utils/css'

const props = withDefaults(defineProps<ProgressRootProps & { 
  class?: HTMLAttributes['class'] 
}>(), {
  modelValue: 0,
  class: undefined,
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const relativeValue = computed(() => (100 * (props.modelValue ?? 0)) / (props.max ?? 100))
</script>

<template>
  <ProgressRoot v-bind="delegatedProps" :class="cn('relative h-2 w-full overflow-hidden rounded-full bg-primary/20', props.class)">
    <ProgressIndicator class="size-full flex-1 bg-primary transition-all"
      :style="`transform: translateX(-${100 - relativeValue}%);`" />
  </ProgressRoot>
</template>
