<script setup lang="ts">
import { MenubarCheckboxItem, type MenubarCheckboxItemEmits, type MenubarCheckboxItemProps,
	MenubarItemIndicator, useForwardPropsEmits } from 'radix-vue'

const props = defineProps<MenubarCheckboxItemProps & { class?: ClassValue }>()
const emits = defineEmits<MenubarCheckboxItemEmits>()

const delegatedProps = computed(() => {
	const { class: _, ...delegated } = props
	return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<MenubarCheckboxItem v-bind="forwarded" :class="cn(
		'relative flex justify-between cursor-pointer gap-2 select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
		props.class,
	)">
		<slot />
		<MenubarItemIndicator>
			<slot name="icon">
				<Icon name="ph:check-bold" class="size-4 fill-current" />
			</slot>
		</MenubarItemIndicator>
	</MenubarCheckboxItem>
</template>
