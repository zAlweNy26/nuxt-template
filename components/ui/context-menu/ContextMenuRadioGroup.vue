<script setup lang="ts">
import type { ContextRadioItems } from '.'
import { type ContextMenuRadioGroupEmits, type ContextMenuRadioGroupProps, useForwardPropsEmits } from 'radix-vue'
import { ContextMenu } from 'radix-vue/namespaced'

const props = defineProps<ContextMenuRadioGroupProps & {
	class?: ClassValue
	items: ContextRadioItems
	itemClass?: ClassValue
}>()

const emits = defineEmits<ContextMenuRadioGroupEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'items', 'itemClass')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<ContextMenu.RadioGroup v-bind="forwarded" :class="cn('space-y-1', props.class)">
		<slot />
		<ContextMenu.RadioItem v-for="(item, i) in items" :key="i" :value="item.value" :class="cn(
			'relative flex justify-between cursor-pointer gap-2 select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
			itemClass,
		)">
			<slot :name="item.slot || 'item'">
				{{ item.label }}
			</slot>
			<ContextMenu.ItemIndicator asChild>
				<slot name="icon">
					<Icon name="ph:circle-fill" class="size-2 fill-current" />
				</slot>
			</ContextMenu.ItemIndicator>
		</ContextMenu.RadioItem>
	</ContextMenu.RadioGroup>
</template>
