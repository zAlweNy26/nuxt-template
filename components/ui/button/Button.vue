<script setup lang="ts">
import { Primitive } from 'radix-vue'
import { type ButtonProps, buttonVariants } from '.'

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
  size: 'md',
  variant: 'solid',
  square: false,
  color: 'primary'
})
</script>

<template>
  <Primitive :as :asChild
    :class="cn(buttonVariants({ variant, size, square, color }), props.class)">
    <slot />
  </Primitive>
</template>
