<script setup lang="ts">
import { useForwardPropsEmits, DropdownMenuRadioGroup, DropdownMenuItemIndicator, DropdownMenuRadioItem,
  type DropdownMenuRadioGroupEmits, type DropdownMenuRadioGroupProps } from 'radix-vue'
import type { DropdownMenuItems } from '.'
import type { ClassValue } from 'clsx'

const props = defineProps<Omit<DropdownMenuRadioGroupProps, 'modelValue'> & {
  class?: ClassValue
  items: DropdownMenuItems<string>
  itemClass?: ClassValue
}>()

const emits = defineEmits<DropdownMenuRadioGroupEmits>()

const model = defineModel<string>()

const delegatedProps = computed(() => {
  const { class: _, items, itemClass, ...rest } = props
  return rest
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuRadioGroup v-model="model" v-bind="forwarded" :class="cn('space-y-1', props.class)">
    <DropdownMenuRadioItem v-for="(item, i) in items" :key="i" :value="item.value" :class="cn(
      'relative flex cursor-default justify-between w-full select-none items-center rounded-sm py-1 px-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      itemClass,
    )">
      <slot :name="item.slot || 'item'">
        {{ item.label }}
      </slot>
      <slot name="icon">
        <DropdownMenuItemIndicator asChild>
          <Icon name="ph:dot-bold" class="size-4 fill-current" />
        </DropdownMenuItemIndicator>
      </slot>
    </DropdownMenuRadioItem>
  </DropdownMenuRadioGroup>
</template>
