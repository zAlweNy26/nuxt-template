<script setup lang="ts">
import type { ClassValue } from 'clsx'

const props = defineProps<{
  class?: ClassValue
}>()
</script>

<template>
  <div :class="cn('animate-pulse rounded-md bg-primary/10', props.class)" />
</template>
