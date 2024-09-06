<script setup lang="ts">
import type { ClassValue } from 'clsx'

const { class: mainClass } = defineProps<{
  class?: ClassValue
}>()
</script>

<template>
  <div :class="cn('animate-pulse rounded-md bg-primary/10', mainClass)" />
</template>
