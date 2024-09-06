<script setup lang="ts">
import type { ClassValue } from 'clsx'
import { type InputVariants, inputVariants } from '.'

const { defaultValue, class: mainClass } = defineProps<{
  defaultValue?: string
  class?: ClassValue
  color?: InputVariants['color']
  size?: InputVariants['size']
}>()

const model = defineModel<string>()

onMounted(() => {
  model.value = model.value ?? defaultValue
})
</script>

<template>
  <input v-model="model" :class="cn(inputVariants({ color, size }), mainClass)">
</template>
