<script setup lang="ts">
import { ContextMenuPortal, ContextMenuSub, ContextMenuSubContent, type ContextMenuSubEmits,
	type ContextMenuSubProps, ContextMenuSubTrigger, useForwardPropsEmits } from 'radix-vue'

const props = defineProps<ContextMenuSubProps & {
	class?: ClassValue
	triggerClass?: ClassValue
	disabled?: boolean
}>()

const emits = defineEmits<ContextMenuSubEmits>()

const delegatedProps = computed(() => {
	const { class: _, triggerClass, disabled, ...delegated } = props
	return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<ContextMenuSub v-bind="forwarded">
		<ContextMenuSubTrigger :disabled :class="cn(
			'flex justify-between cursor-pointer gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
			triggerClass,
		)">
			<slot />
			<Icon name="ph:caret-right-bold" class="size-4" />
		</ContextMenuSubTrigger>
		<ContextMenuPortal>
			<ContextMenuSubContent :sideOffset="8" :class="cn(
				'z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
				props.class,
			)">
				<slot name="content" />
			</ContextMenuSubContent>
		</ContextMenuPortal>
	</ContextMenuSub>
</template>
