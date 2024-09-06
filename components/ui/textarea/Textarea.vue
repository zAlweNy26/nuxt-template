<script setup lang="ts">
import type { ClassValue } from 'clsx'
import { type TextareaVariants, textareaVariants } from '.'

const { class: mainClass, defaultValue } = defineProps<{
  class?: ClassValue
  defaultValue?: string
  color?: TextareaVariants['color']
  size?: TextareaVariants['size']
}>()

const model = defineModel<string>()

onMounted(() => {
  model.value = model.value ?? defaultValue
})
</script>

<template>
  <textarea v-model="model" :class="cn(textareaVariants({ color, size }), mainClass)" />
</template>
