<script setup lang="ts">
import type { ClassValue } from 'clsx'
import { Separator, type SeparatorProps } from 'radix-vue'

const props = defineProps<SeparatorProps & {
  class?: ClassValue
  label?: string
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})
</script>

<template>
  <Separator v-bind="delegatedProps" :class="cn(
    'shrink-0 bg-border relative',
    props.orientation === 'vertical' ? 'w-px h-full' : 'h-px w-full',
    props.class,
  )">
    <span v-if="props.label" :class="cn(
      'text-xs text-muted-foreground bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center',
      props.orientation === 'vertical' ? 'w-px px-1 py-2' : 'h-px py-1 px-2',
    )">
      {{ props.label }}
    </span>
  </Separator>
</template>
