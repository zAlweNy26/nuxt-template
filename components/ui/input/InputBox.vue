<script setup lang="ts">
import type { ClassValue } from 'clsx'
import { type InputVariants, inputVariants } from '.'

const props = defineProps<{
  defaultValue?: string | number
  class?: ClassValue
  color?: InputVariants['color']
  size?: InputVariants['size']
}>()

const model = defineModel<string | number>()

onMounted(() => {
  model.value = model.value ?? props.defaultValue
})
</script>

<template>
  <input v-model="model" :class="cn(inputVariants({ color, size }), props.class)">
</template>
