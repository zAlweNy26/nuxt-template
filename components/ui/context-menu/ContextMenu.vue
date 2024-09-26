<script setup lang="ts">
import { type ContextMenuRootEmits, type ContextMenuRootProps, useForwardPropsEmits } from 'radix-vue'
import { ContextMenu } from 'radix-vue/namespaced'

const props = defineProps<ContextMenuRootProps & {
	disabled?: boolean
	class?: ClassValue
}>()
const emits = defineEmits<ContextMenuRootEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'disabled')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<ContextMenu.Root v-bind="forwarded">
		<ContextMenu.Trigger :disabled asChild>
			<slot />
		</ContextMenu.Trigger>
		<ContextMenu.Portal>
			<ContextMenu.Content :class="cn(
				'z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
				props.class,
			)">
				<slot name="content" />
			</ContextMenu.Content>
		</ContextMenu.Portal>
	</ContextMenu.Root>
</template>
