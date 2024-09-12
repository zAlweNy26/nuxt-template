<script setup lang="ts">
import { MenubarTrigger, type MenubarTriggerProps, useForwardProps } from 'radix-vue'
import type { ClassValue } from 'clsx'

const props = defineProps<MenubarTriggerProps & { class?: ClassValue }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <MenubarTrigger v-bind="forwardedProps" :class="cn(
    'flex justify-between cursor-pointer gap-2 select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
    props.class
  )">
    <slot />
  </MenubarTrigger>
</template>
