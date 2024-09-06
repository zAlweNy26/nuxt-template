<script setup lang="ts">
import type { ClassValue } from 'clsx'
import { DropdownMenuSeparator, type DropdownMenuSeparatorProps } from 'radix-vue'

const { class: mainClass, ...root } = defineProps<DropdownMenuSeparatorProps & { class?: ClassValue }>()
</script>

<template>
  <DropdownMenuSeparator v-bind="root" :class="cn('-mx-1 my-1 h-px bg-muted', mainClass)" />
</template>
