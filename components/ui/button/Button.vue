<script setup lang="ts">
import { Primitive } from 'radix-vue'
import { type ButtonProps, buttonVariants } from '.'

const { class: mainClass, as = 'button', size = 'sm' } = defineProps<ButtonProps>()
</script>

<template>
  <Primitive :as :asChild
    :class="cn(buttonVariants({ variant, size, square: square ? size : undefined }), mainClass)">
    <slot />
  </Primitive>
</template>
