<script setup lang="ts">
import type { ClassValue } from 'clsx'
import { DropdownMenuLabel, type DropdownMenuLabelProps, useForwardProps } from 'radix-vue'

const { class: mainClass, ...root } = defineProps<DropdownMenuLabelProps & { class?: ClassValue, inset?: boolean }>()

const forwardedProps = useForwardProps(() => root)
</script>

<template>
  <DropdownMenuLabel v-bind="forwardedProps"
    :class="cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', mainClass)">
    <slot />
  </DropdownMenuLabel>
</template>
