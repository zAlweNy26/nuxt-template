<script setup lang="ts">
import { Primitive } from 'radix-vue'
import { type ShortcutVariants, shortcutVariants } from '.'

const props = withDefaults(defineProps<{
	class?: ClassValue
	cap: ShortcutKey | string
	size?: ShortcutVariants['size']
}>(), {
	class: undefined,
	size: 'sm',
})

const { getShortcutKey } = useShortcut()
</script>

<template>
	<Primitive as="kbd" :class="cn(shortcutVariants({ size }), props.class)">
		{{ getShortcutKey(cap) }}
	</Primitive>
</template>
