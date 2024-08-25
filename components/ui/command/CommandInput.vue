<script setup lang="ts">
import type { ClassValue } from 'clsx'
import { ComboboxInput, type ComboboxInputProps, useForwardProps } from 'radix-vue'
import { cn } from '@/utils/css'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<ComboboxInputProps & {
  class?: ClassValue
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <div class="flex items-center px-2" cmdk-input-wrapper>
    <Icon name="ph:magnifying-glass" class="mr-2 size-4 shrink-0 opacity-50" />
    <ComboboxInput
      v-bind="{ ...forwardedProps, ...$attrs }"
      autofocus
      :class="cn('flex h-8 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50', props.class)"
    />
  </div>
</template>
