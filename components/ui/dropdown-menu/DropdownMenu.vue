<script setup lang="ts">
import { DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuPortal, DropdownMenuContent, type DropdownMenuContentProps,
  type DropdownMenuRootEmits, type DropdownMenuRootProps, useForwardPropsEmits } from 'radix-vue'

const props = defineProps<{
  disabled?: boolean
  root?: DropdownMenuRootProps
  content?: DropdownMenuContentProps
  class?: ClassValue
}>()

const contentProps = computed<DropdownMenuContentProps>(() => ({ sideOffset: 4, ...props.content }))

const emits = defineEmits<DropdownMenuRootEmits>()

const forwardedRoot = useForwardPropsEmits(() => props.root ?? {}, emits)
</script>

<template>
  <DropdownMenuRoot v-bind="forwardedRoot">
    <DropdownMenuTrigger :disabled asChild>
      <slot />
    </DropdownMenuTrigger>
    <DropdownMenuPortal v-if="$slots.content">
      <DropdownMenuContent v-bind="contentProps"
        :class="cn(
          'z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 space-y-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', 
          props.class
        )">
        <slot name="content" />
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
