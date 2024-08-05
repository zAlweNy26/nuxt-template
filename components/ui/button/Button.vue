<script setup lang="ts">
import { Primitive } from 'radix-vue'
import { type ButtonProps, buttonVariants } from '.'

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
  size: 'sm',
  variant: 'primary',
  square: undefined,
  class: undefined
})
</script>

<template>
  <Primitive :as="as" :as-child="asChild"
    :class="cn(buttonVariants({ variant, size, square: square ? size : undefined }), props.class)">
    <slot />
  </Primitive>
</template>
