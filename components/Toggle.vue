<script setup lang="ts">
import { Toggle, type ToggleProps, useForwardProps } from 'radix-vue'
import { buttonVariants, type ButtonProps } from './ui/button'

const props = defineProps<Omit<ToggleProps, 'pressed'> & Omit<ButtonProps, 'variant'>>()

const delegatedProps = computed(() => {
  const { class: _, size, square, ...rest } = props
  return rest
})

const forwarded = useForwardProps(delegatedProps)

const model = defineModel<boolean>()
</script>

<template>
  <Toggle v-model:pressed="model" v-bind="forwarded" 
    :class="cn(buttonVariants({ 
      variant: model ? 'secondary' : 'outline', size, square: square ? size : undefined
    }), props.class)">
    <slot />
  </Toggle>
</template>
