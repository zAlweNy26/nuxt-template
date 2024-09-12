<script setup lang="ts">
import { type TextareaVariants, textareaVariants } from '.'

const props = defineProps<{
  class?: ClassValue
  defaultValue?: string
  color?: TextareaVariants['color']
  size?: TextareaVariants['size']
}>()

const model = defineModel<string>()

onMounted(() => {
  model.value = model.value ?? props.defaultValue
})
</script>

<template>
  <textarea v-model="model" :class="cn(textareaVariants({ color, size }), props.class)" />
</template>
