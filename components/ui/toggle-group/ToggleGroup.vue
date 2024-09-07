<script setup lang="ts">
import { ToggleGroupRoot, type ToggleGroupRootEmits, 
  type ToggleGroupRootProps, useForwardPropsEmits } from 'radix-vue'
import { type GroupVariants, groupVariants } from '../combo-group'
import type { ClassValue } from 'clsx'

const { class: mainClass, size = 'md', ...root } = defineProps<ToggleGroupRootProps & {
  class?: ClassValue
  size?: GroupVariants['size']
}>()
const emits = defineEmits<ToggleGroupRootEmits>()

provide('toggleGroup', { size })

const forwarded = useForwardPropsEmits(() => root, emits)
</script>

<template>
  <ToggleGroupRoot v-bind="forwarded" :class="cn(groupVariants({ size }), mainClass)">
    <slot />
  </ToggleGroupRoot>
</template>
