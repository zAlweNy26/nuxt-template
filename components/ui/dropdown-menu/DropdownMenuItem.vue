<script setup lang="ts">
import { DropdownMenuItem, type DropdownMenuItemProps, useForwardProps } from 'reka-ui'

const props = defineProps<DropdownMenuItemProps & {
	class?: ClassValue
	shortcuts?: Shortcuts
}>()

const delegatedProps = reactiveOmit(props, 'class', 'shortcuts')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
	<DropdownMenuItem v-bind="forwardedProps" :class="cn(
		'relative flex justify-between cursor-pointer gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
		props.class,
	)">
		<slot />
		<span v-if="shortcuts" class="flex gap-0.5">
			<Shortcut v-for="(k, i) in shortcuts" :key="i" :cap="k" />
		</span>
	</DropdownMenuItem>
</template>
