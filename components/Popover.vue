<script setup lang="ts">
import type { PopoverContentProps, PopoverRootEmits, PopoverRootProps } from 'reka-ui'
import { useForwardPropsEmits } from 'reka-ui'
import { Popover } from 'reka-ui/namespaced'

const props = defineProps<{
	root?: PopoverRootProps
	content?: PopoverContentProps
	class?: ClassValue
}>()

const emits = defineEmits<PopoverRootEmits>()

const contentProps = computed<PopoverContentProps>(() => ({ sideOffset: 4, ...props.content }))

const forwarded = useForwardPropsEmits(() => props.root ?? {}, emits)
</script>

<template>
	<Popover.Root v-bind="forwarded">
		<Popover.Trigger asChild>
			<slot />
		</Popover.Trigger>
		<Popover.Portal v-if="$slots.content">
			<Popover.Content v-bind="contentProps" :class="cn(
				'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
				props.class,
			)">
				<slot name="content" />
			</Popover.Content>
		</Popover.Portal>
	</Popover.Root>
</template>
