<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import {
  DropdownMenuItemIndicator,
  DropdownMenuRadioItem,
  type DropdownMenuRadioItemEmits,
  type DropdownMenuRadioItemProps,
  useForwardPropsEmits,
} from 'radix-vue'
import { DotFilledIcon } from '@radix-icons/vue'
import { cn } from '@/lib/utils'

const props = defineProps<DropdownMenuRadioItemProps & { class?: HTMLAttributes['class'] }>()

const emits = defineEmits<DropdownMenuRadioItemEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuRadioItem
    v-bind="forwarded"
    :class="cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pr-7 pl-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      props.class,
    )"
  >
    <slot />
    <span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuItemIndicator>
        <DotFilledIcon class="h-4 w-4 fill-current" />
      </DropdownMenuItemIndicator>
    </span>
  </DropdownMenuRadioItem>
</template>
