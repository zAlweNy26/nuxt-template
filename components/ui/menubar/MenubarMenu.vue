<script setup lang="ts">
import type { MenubarContentProps, MenubarMenuProps } from 'radix-vue'
import { Menubar } from 'radix-vue/namespaced'

defineOptions({ inheritAttrs: false })

const props = defineProps<MenubarMenuProps & {
	disabled?: boolean
	contentClass?: ClassValue
	class?: ClassValue
	content?: MenubarContentProps
}>()

const contentProps = computed<MenubarContentProps>(() => ({
	align: 'start',
	alignOffset: -4,
	sideOffset: 8,
	...props.content,
}))
</script>

<template>
	<Menubar.Menu :value>
		<Menubar.Trigger :class="cn(
			'flex justify-between cursor-pointer gap-2 select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
			props.class,
		)">
			<slot />
		</Menubar.Trigger>
		<Menubar.Portal>
			<Menubar.Content v-bind="contentProps" :class="cn(
				'z-50 min-w-48 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
				contentClass,
			)">
				<slot name="content" />
			</Menubar.Content>
		</Menubar.Portal>
	</Menubar.Menu>
</template>
