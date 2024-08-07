<script setup lang="ts">
import type { ClassValue } from 'clsx'
import { useForwardPropsEmits, DropdownMenuItemIndicator, DropdownMenuRadioItem,
  type DropdownMenuRadioItemEmits, type DropdownMenuRadioItemProps } from 'radix-vue'

const props = defineProps<DropdownMenuRadioItemProps & { class?: ClassValue }>()

const emits = defineEmits<DropdownMenuRadioItemEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuRadioItem v-bind="forwarded" :class="cn(
    'relative flex cursor-default select-none items-center rounded-sm py-1.5 pr-7 pl-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    props.class,
  )">
    <slot />
    <span class="absolute right-2 flex size-3.5 items-center justify-center">
      <DropdownMenuItemIndicator>
        <Icon name="ph:dot-bold" class="size-4 fill-current" />
      </DropdownMenuItemIndicator>
    </span>
  </DropdownMenuRadioItem>
</template>
