<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { type InputVariants, inputVariants } from '.'

const props = defineProps<{
  id?: HTMLAttributes['id']
  defaultValue?: string | number
  color?: InputVariants['color']
  size?: InputVariants['size']
  class?: HTMLAttributes['class']
  labelClass?: HTMLAttributes['class']
  label?: string
}>()

const model = defineModel<string | number>()

onMounted(() => {
  model.value = model.value ?? props.defaultValue
})
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-1">
    <Label v-if="label" :for="id" :size :class="cn('ps-1', props.labelClass)">{{ label }}</Label>
    <input v-model="model" :class="cn(inputVariants({ color, size }), props.class)">
  </div>
</template>
