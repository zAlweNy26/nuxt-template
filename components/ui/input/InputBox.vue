<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { type InputVariants, inputVariants } from '.'

const props = defineProps<{
  id?: HTMLAttributes['id']
  defaultValue?: string | number
  color?: InputVariants['color']
  size?: InputVariants['size']
  class?: HTMLAttributes['class']
}>()

const model = defineModel<string | number>()

onMounted(() => {
  model.value = model.value ?? props.defaultValue
})
</script>

<template>
  <input v-model="model" :class="cn(inputVariants({ color, size }), props.class)">
</template>
