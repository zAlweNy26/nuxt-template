<script setup lang="ts">
import { DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuPortal, DropdownMenuContent, type DropdownMenuContentProps,
  type DropdownMenuRootEmits, type DropdownMenuRootProps, type DropdownMenuTriggerProps, useForwardPropsEmits, } from 'radix-vue'

const props = defineProps<{
  root?: DropdownMenuRootProps
  trigger?: DropdownMenuTriggerProps
  content?: DropdownMenuContentProps
}>()

const triggerProps = computed<DropdownMenuContentProps>(() => ({ asChild: true, ...props.trigger }))
const contentProps = computed<DropdownMenuContentProps>(() => ({ align: 'center', sideOffset: 8, ...props.content }))

const emits = defineEmits<DropdownMenuRootEmits>()

const forwardedRoot = useForwardPropsEmits(() => props.root ?? {}, emits)
</script>

<template>
  <DropdownMenuRoot v-bind="forwardedRoot">
    <DropdownMenuTrigger class="outline-none" v-bind="triggerProps">
      <slot name="trigger" />
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent v-bind="contentProps"
        class="z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
        <slot />
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
