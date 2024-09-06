<script setup lang="ts" generic="T extends AcceptableValue">
import type { AcceptableValue, DropdownMenuItems } from '.'
import type { ClassValue } from 'clsx'
import { DropdownMenuCheckboxItem, DropdownMenuItemIndicator } from 'radix-vue'

const { class: mainClass, items, itemClass } = defineProps<{ 
  class?: ClassValue
  items: DropdownMenuItems<T>
  itemClass?: ClassValue
}>()

const model = defineModel<T[]>({ default: [] })

defineEmits<{
  'update:modelValue': [value: T[]]
  'update:checked': [value: T, checked: boolean]
}>()

const checkItem = (value: T, checked: boolean) => {
  const arr = model.value.slice()
  if (checked) {
    arr.push(value)
  } else {
    const index = arr.indexOf(value)
    if (index > -1) arr.splice(index, 1)
  }
  return arr
}
</script>

<template>
  <div role="group" :class="cn('space-y-1', mainClass)">
    <DropdownMenuCheckboxItem v-for="(item, i) in items" :key="i" :checked="model.includes(item.value)" :class="cn(
      'relative flex cursor-default select-none w-full justify-between items-center rounded-sm py-1 px-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      itemClass,
    )" @update:checked="(v) => {
      $emit('update:checked', item.value, v)
      $emit('update:modelValue', checkItem(item.value, v))
    }">
      <slot :name="item.slot || 'item'">
        {{ item.label }}
      </slot>
      <slot name="icon">
        <DropdownMenuItemIndicator asChild>
          <Icon name="ph:check-bold" class="size-4 fill-current" />
        </DropdownMenuItemIndicator>
      </slot>
    </DropdownMenuCheckboxItem>
  </div>
</template>
