<script setup lang="ts">
import { ToggleGroupItem, type ToggleGroupItemProps, useForwardProps } from 'radix-vue'
import { buttonVariants, type ButtonProps } from '../button'
import { ToggleGroupKey } from '.'

const props = withDefaults(defineProps<Omit<ToggleGroupItemProps, 'pressed'> & Omit<ButtonProps, 'variant'>>(), {
  size: 'md',
  square: false,
  class: undefined
})

const delegatedProps = computed(() => {
  const { class: _, size, square, ...rest } = props
  return rest
})

const forwarded = useForwardProps(delegatedProps)

const item = useTemplateRef<InstanceType<typeof ToggleGroupItem>>('item')

const context = computedInject(ToggleGroupKey, (s) => s?.value)
</script>

<template>
  <ToggleGroupItem ref="item" v-bind="forwarded" 
    :class="cn(buttonVariants({ 
      variant: context?.state === forwarded.value ? 'secondary' : 'outline', 
      size: context?.size || size, 
      square: square ? (context?.size || size) : undefined 
  }), props.class)">
    <slot />
  </ToggleGroupItem>
</template>
