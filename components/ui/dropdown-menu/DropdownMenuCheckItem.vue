<script setup lang="ts">
import {
	DropdownMenuCheckboxItem, type DropdownMenuCheckboxItemEmits, type DropdownMenuCheckboxItemProps,
	DropdownMenuItemIndicator, useForwardPropsEmits,
} from 'radix-vue'

const props = defineProps<DropdownMenuCheckboxItemProps & { class?: ClassValue }>()

const emits = defineEmits<DropdownMenuCheckboxItemEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<DropdownMenuCheckboxItem v-bind="forwarded" :class="cn(
		'relative flex justify-between cursor-pointer gap-2 select-none items-center rounded-sm py-1 px-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
		props.class,
	)">
		<slot />
		<DropdownMenuItemIndicator asChild>
			<slot name="icon">
				<Icon name="ph:check-bold" class="size-4 fill-current" />
			</slot>
		</DropdownMenuItemIndicator>
	</DropdownMenuCheckboxItem>
</template>
