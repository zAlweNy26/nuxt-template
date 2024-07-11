<script setup lang="ts">
import {
  DropdownMenuRoot, DropdownMenuTrigger, type DropdownMenuRootEmits,
  type DropdownMenuRootProps, type DropdownMenuTriggerProps, useForwardPropsEmits
} from 'radix-vue'

const props = defineProps<DropdownMenuRootProps & DropdownMenuTriggerProps>()
const emits = defineEmits<DropdownMenuRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DropdownMenuRoot v-bind="forwarded">
    <DropdownMenuTrigger asChild class="outline-none" :disabled>
      <slot name="trigger" />
    </DropdownMenuTrigger>
    <slot />
  </DropdownMenuRoot>
</template>
