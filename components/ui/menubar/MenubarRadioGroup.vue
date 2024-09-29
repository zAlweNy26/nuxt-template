<script setup lang="ts">
import type { MenubarRadioGroupEmits, MenubarRadioGroupProps } from 'reka-ui'
import type { MenuRadioItems } from '.'
import { useForwardPropsEmits } from 'reka-ui'
import { Menubar } from 'reka-ui/namespaced'

const props = defineProps<MenubarRadioGroupProps & {
	class?: ClassValue
	items: MenuRadioItems
	itemClass?: ClassValue
}>()

const emits = defineEmits<MenubarRadioGroupEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'items', 'itemClass')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<Menubar.RadioGroup v-bind="forwarded" :class="cn('space-y-1', props.class)">
		<slot />
		<Menubar.RadioItem v-for="(item, i) in items" :key="i" :value="item.value" :class="cn(
			'relative flex justify-between cursor-pointer gap-2 select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
			itemClass,
		)">
			<slot :name="item.slot || 'item'">
				{{ item.label }}
			</slot>
			<Menubar.ItemIndicator asChild>
				<slot name="icon">
					<Icon name="ph:circle-fill" class="size-2 fill-current" />
				</slot>
			</Menubar.ItemIndicator>
		</Menubar.RadioItem>
	</Menubar.RadioGroup>
</template>
