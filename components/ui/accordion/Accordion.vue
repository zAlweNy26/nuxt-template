<script setup lang="ts">
import type { AccordionRootEmits, AccordionRootProps } from 'reka-ui'
import type { AccordionItems } from '.'
import { useForwardPropsEmits } from 'reka-ui'
import { Accordion } from 'reka-ui/namespaced'

const props = withDefaults(defineProps<AccordionRootProps & {
	items: AccordionItems
	class?: ClassValue
	contentClass?: ClassValue
}>(), {
	type: 'single',
	class: undefined,
	contentClass: undefined,
	collapsible: true,
})

const emits = defineEmits<AccordionRootEmits>()

const delegatedProps = reactiveOmit(props, 'items', 'class', 'contentClass')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<Accordion.Root v-bind="forwarded" :class="cn('w-full divide-y', props.class)">
		<Accordion.Item v-for="item in items" :key="item.id" :value="item.id" :class="cn('pb-2', contentClass)">
			<Accordion.Header class="flex">
				<Accordion.Trigger :class="cn(
					'flex flex-1 gap-1 w-full items-center justify-between py-2 text-sm font-medium transition-all cursor-pointer [&[data-state=open]>.accordion-icon]:rotate-180',
					item.class,
				)">
					<slot :item>
						<span>{{ item.label }}</span>
					</slot>
					<slot name="icon">
						<Icon name="ph:caret-down-bold"
							class="accordion-icon size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
					</slot>
				</Accordion.Trigger>
			</Accordion.Header>
			<Accordion.Content
				class="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
				<slot :name="`${item.id}-content`" />
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
</template>
