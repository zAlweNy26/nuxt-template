<script setup lang="ts">
import { ToggleGroupItem, type ToggleGroupItemProps, useForwardProps } from 'radix-vue'
import { buttonVariants, type ButtonProps } from '../button'

const { class: mainClass, size = 'md', 
  square = false, ...root } = defineProps<ToggleGroupItemProps & Omit<ButtonProps, 'variant'>>()

const forwardedProps = useForwardProps(() => root)

const item = useTemplateRef<InstanceType<typeof ToggleGroupItem>>('item')

const isActive = ref(false)

useMutationObserver(item, (records) => {
  if (records[0].attributeName === 'data-state') {
    isActive.value = (item.value?.$el as Element).getAttribute('data-state') === 'on'
  }
}, { attributes: true, attributeFilter: ['data-state'] })
</script>

<template>
  <ToggleGroupItem ref="item" v-bind="forwardedProps" 
    :class="cn(buttonVariants({ variant: isActive ? 'secondary' : 'outline', size, 
      square: square ? size : undefined }), mainClass)">
    <slot />
  </ToggleGroupItem>
</template>
