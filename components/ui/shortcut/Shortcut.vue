<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { type ShortcutVariants, shortcutVariants } from '.'

const props = withDefaults(defineProps<PrimitiveProps & {
  class?: ClassValue
  cap: ShortcutKey | string
  size?: ShortcutVariants['size']
}>(), {
  as: 'kbd',
  class: undefined,
  size: 'sm',
})

const { getShortcutKey } = useShortcut()
</script>

<template>
  <Primitive :as :asChild :class="cn(shortcutVariants({ size }), props.class)">
    {{ getShortcutKey(cap) }}
  </Primitive>
</template>