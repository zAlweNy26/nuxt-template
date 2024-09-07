<script setup lang="ts">
import { Toggle, type ToggleProps } from 'radix-vue'
import { buttonVariants, type ButtonProps } from './ui/button'

const { class: mainClass, size = 'sm', 
  square = false, ...root } = defineProps<Omit<ToggleProps, 'pressed'> & Omit<ButtonProps, 'variant'>>()

const model = defineModel<boolean>()
</script>

<template>
  <Toggle v-model:pressed="model" v-bind="root" 
    :class="cn(buttonVariants({ 
      variant: model ? 'secondary' : 'outline', size, square: square ? size : undefined
    }), mainClass)">
    <slot />
  </Toggle>
</template>
