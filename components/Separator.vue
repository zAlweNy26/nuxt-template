<script setup lang="ts">
import { Separator, type SeparatorProps } from 'radix-vue'

const props = defineProps<SeparatorProps & {
  class?: ClassValue
  label?: string
  labelClass?: ClassValue
  dividerClass?: ClassValue
}>()

const delegatedProps = computed(() => {
  const { class: _, label, labelClass, dividerClass, ...delegated } = props
  return delegated
})
</script>

<template>
  <Separator v-bind="delegatedProps" :class="cn(
    'flex items-center align-center text-center',
    props.orientation === 'vertical' ? 'flex-col' : 'w-full flex-row',
    props.label && 'gap-1',
    props.class,
  )">
    <div :class="cn('h-px grow bg-muted-foreground', props.dividerClass)" />
    <span v-if="props.label" :class="cn(
      'text-xs text-foreground font-medium select-none flex justify-center items-center',
      props.labelClass,
    )">
      {{ props.label }}
    </span>
    <div :class="cn('h-px grow bg-muted-foreground', props.dividerClass)" />
  </Separator>
</template>
