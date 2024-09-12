<script setup lang="ts">
import { useForwardPropsEmits, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, 
  DropdownMenuSubContent, type DropdownMenuSubEmits, type DropdownMenuSubProps } from 'radix-vue'

const props = defineProps<DropdownMenuSubProps & {
  class?: ClassValue
  triggerClass?: ClassValue
  disabled?: boolean
}>()

const emits = defineEmits<DropdownMenuSubEmits>()

const delegatedProps = computed(() => {
  const { class: _, triggerClass, disabled, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuSub v-bind="forwarded">
    <DropdownMenuSubTrigger :disabled :class="cn(
      'flex justify-between cursor-pointer gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
      triggerClass,
    )">
      <slot />
      <Icon name="ph:caret-right-bold" class="size-4" />
    </DropdownMenuSubTrigger>
    <DropdownMenuPortal>
      <DropdownMenuSubContent :sideOffset="8" :class="cn(
        'z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        props.class,
      )">
        <slot name="content" />
      </DropdownMenuSubContent>
    </DropdownMenuPortal>
  </DropdownMenuSub>
</template>
