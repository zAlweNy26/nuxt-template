<script setup lang="ts">
import type { MenubarSubEmits, MenubarSubProps } from 'reka-ui'
import { useForwardPropsEmits } from 'reka-ui'
import { Menubar } from 'reka-ui/namespaced'

const props = defineProps<MenubarSubProps & {
	class?: ClassValue
	triggerClass?: ClassValue
	disabled?: boolean
}>()

const emits = defineEmits<MenubarSubEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'triggerClass', 'disabled')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<Menubar.Sub v-bind="forwarded">
		<Menubar.SubTrigger :disabled :class="cn(
			'flex justify-between cursor-pointer gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
			triggerClass,
		)">
			<slot />
			<Icon name="ph:caret-right-bold" class="size-4" />
		</Menubar.SubTrigger>
		<Menubar.Portal>
			<Menubar.SubContent :sideOffset="8" :class="cn(
				'z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
				props.class,
			)">
				<slot name="content" />
			</Menubar.SubContent>
		</Menubar.Portal>
	</Menubar.Sub>
</template>
