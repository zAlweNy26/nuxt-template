<script setup lang="ts">
import { MenubarRadioGroup, type MenubarRadioGroupEmits, MenubarItemIndicator, 
  MenubarRadioItem, type MenubarRadioGroupProps, useForwardPropsEmits } from 'radix-vue'
import type { MenuRadioItems } from '.'

const props = defineProps<MenubarRadioGroupProps & {
  class?: ClassValue
  items: MenuRadioItems
  itemClass?: ClassValue
}>()

const emits = defineEmits<MenubarRadioGroupEmits>()

const delegatedProps = computed(() => {
  const { class: _, items, itemClass, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <MenubarRadioGroup v-bind="forwarded" :class="cn('space-y-1', props.class)">
    <MenubarRadioItem v-for="(item, i) in items" :key="i" :value="item.value" :class="cn(
      'relative flex justify-between cursor-pointer gap-2 select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      itemClass,
    )">
      <slot :name="item.slot || 'item'">
        {{ item.label }}
      </slot>
      <MenubarItemIndicator asChild>
        <slot name="icon">
          <Icon name="ph:dot-bold" class="size-4 fill-current" />
        </slot>
      </MenubarItemIndicator>
    </MenubarRadioItem>
  </MenubarRadioGroup>
</template>