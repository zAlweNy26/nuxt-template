<script setup lang="ts">
import type { ClassValue } from 'clsx'
import { MenubarItem, type MenubarItemEmits, type MenubarItemProps, useForwardPropsEmits } from 'radix-vue'

const props = defineProps<MenubarItemProps & { 
  class?: ClassValue,
  shortcuts?: Shortcuts
}>()

const emits = defineEmits<MenubarItemEmits>()

const delegatedProps = computed(() => {
  const { class: _, shortcuts, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <MenubarItem v-bind="forwarded" :class="cn(
    'relative flex justify-between cursor-pointer gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    props.class,
  )">
    <slot />
    <span v-if="shortcuts" class="flex gap-0.5">
      <Shortcut v-for="(k, i) in shortcuts" :key="i" :cap="k" />
    </span>
  </MenubarItem>
</template>
