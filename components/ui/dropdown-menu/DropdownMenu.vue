<script setup lang="ts">
import type { DropdownMenuContentProps, DropdownMenuRootEmits, DropdownMenuRootProps } from 'radix-vue'
import { useForwardPropsEmits } from 'radix-vue'
import { DropdownMenu } from 'radix-vue/namespaced'

const props = defineProps<{
	disabled?: boolean
	root?: DropdownMenuRootProps
	content?: DropdownMenuContentProps
	class?: ClassValue
}>()

const emits = defineEmits<DropdownMenuRootEmits>()

const contentProps = computed<DropdownMenuContentProps>(() => ({ sideOffset: 4, ...props.content }))

const forwardedRoot = useForwardPropsEmits(() => props.root ?? {}, emits)
</script>

<template>
	<DropdownMenu.Root v-bind="forwardedRoot">
		<DropdownMenu.Trigger :disabled asChild>
			<slot />
		</DropdownMenu.Trigger>
		<DropdownMenu.Portal v-if="$slots.content">
			<DropdownMenu.Content v-bind="contentProps" :class="cn(
				'z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 space-y-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
				props.class,
			)">
				<slot name="content" />
			</DropdownMenu.Content>
		</DropdownMenu.Portal>
	</DropdownMenu.Root>
</template>
