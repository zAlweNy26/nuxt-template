<script setup lang="ts">
import type { DropdownMenuRadioGroupEmits, DropdownMenuRadioGroupProps } from 'radix-vue'
import type { DropdownRadioItems } from '.'
import { useForwardPropsEmits } from 'radix-vue'
import { DropdownMenu } from 'radix-vue/namespaced'

const props = defineProps<DropdownMenuRadioGroupProps & {
	class?: ClassValue
	items: DropdownRadioItems
	itemClass?: ClassValue
}>()

const emits = defineEmits<DropdownMenuRadioGroupEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'items', 'itemClass')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<DropdownMenu.RadioGroup v-bind="forwarded" :class="cn('space-y-1', props.class)">
		<slot />
		<DropdownMenu.RadioItem v-for="(item, i) in items" :key="i" :value="item.value" :class="cn(
			'relative flex justify-between cursor-pointer gap-2 select-none items-center rounded-sm py-1 px-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
			itemClass,
		)">
			<slot :name="item.slot || 'item'">
				{{ item.label }}
			</slot>
			<DropdownMenu.ItemIndicator asChild>
				<slot name="icon">
					<Icon name="ph:circle-fill" class="size-2 fill-current" />
				</slot>
			</DropdownMenu.ItemIndicator>
		</DropdownMenu.RadioItem>
	</DropdownMenu.RadioGroup>
</template>
