<script setup lang="ts">
import { useForwardPropsEmits, DropdownMenuRadioGroup,
  type DropdownMenuRadioGroupEmits, type DropdownMenuRadioGroupProps } from 'radix-vue'

const props = defineProps<DropdownMenuRadioGroupProps>()
const emits = defineEmits<DropdownMenuRadioGroupEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DropdownMenuRadioGroup v-bind="forwarded">
    <slot />
  </DropdownMenuRadioGroup>
</template>
