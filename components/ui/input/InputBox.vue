<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { type InputVariants, inputVariants } from '.'
import { cn } from '@/lib/utils'

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
  <div class="grid w-full max-w-sm items-center gap-1.5">
    <Label v-if="label" :for="id" :size :class="props.labelClass">{{ label }}</Label>
    <input v-model="model" :class="cn(inputVariants({ color, size }), props.class)">
  </div>
</template>
