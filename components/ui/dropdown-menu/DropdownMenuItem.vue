<script setup lang="ts">
import type { ClassValue } from 'clsx'
import { DropdownMenuItem, type DropdownMenuItemProps, useForwardProps } from 'radix-vue'

const { class: mainClass, ...root } = defineProps<DropdownMenuItemProps & { class?: ClassValue, inset?: boolean }>()

const forwardedProps = useForwardProps(() => root)
</script>

<template>
  <DropdownMenuItem v-bind="forwardedProps" :class="cn(
    'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    inset && 'pl-8',
    mainClass,
  )">
    <slot />
  </DropdownMenuItem>
</template>
