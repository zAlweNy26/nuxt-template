<script lang="ts" setup>
import type { StepperRootEmits, StepperRootProps } from 'radix-vue'
import type { StepperItems } from '.'
import {
	Primitive, StepperDescription, StepperIndicator, StepperItem,
	StepperRoot, StepperSeparator, StepperTitle, StepperTrigger,
	useForwardPropsEmits,
} from 'radix-vue'

const props = withDefaults(defineProps<StepperRootProps & {
	class?: ClassValue
	items: StepperItems
}>(), {
	orientation: 'horizontal',
	class: undefined,
})
const emits = defineEmits<StepperRootEmits>()

const delegatedProps = computed(() => {
	const { class: _, items, ...delegated } = props
	return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<StepperRoot v-slot="slotProps" :class="cn(
		'flex gap-2',
		props.orientation === 'horizontal' && 'flex-col',
		props.class,
	)" v-bind="forwarded">
		<div :class="cn('flex gap-2', props.orientation === 'vertical' && 'flex-col')">
			<StepperItem v-for="(item, index) in items" :key="index + 1" :step="index + 1" :disabled="item.disabled"
				:completed="item.completed"
				:class="cn(
					'flex shrink-0 items-center gap-2 group data-[disabled]:pointer-events-none',
					props.orientation === 'vertical' && 'flex-col',
					item.class,
				)"
				:style="{ flexBasis: `${100 / items.length}%` }">
				<StepperTrigger class="flex shrink-0 flex-col items-center gap-2 rounded-md text-center">
					<StepperIndicator :class="cn(
						'grid place-content-center shrink-0 rounded-full transition-colors text-muted-foreground/50 w-8 h-8',
						// Disabled
						'group-data-[disabled]:text-muted-foreground group-data-[disabled]:opacity-50',
						// Active
						'group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground',
						// Completed
						'group-data-[state=completed]:bg-accent group-data-[state=completed]:text-accent-foreground',
					)">
						<slot :name="`icon-${index + 1}`" v-bind="{ ...slotProps, ...item }">
							<Icon v-if="item.icon" :name="item.icon" class="size-4" />
							<span v-else>{{ index + 1 }}</span>
						</slot>
					</StepperIndicator>
					<div class="flex flex-col">
						<StepperTitle v-if="item.title" class="text-md whitespace-nowrap font-semibold">
							{{ item.title }}
						</StepperTitle>
						<StepperDescription v-if="item.description" class="text-xs text-muted-foreground">
							{{ item.description }}
						</StepperDescription>
					</div>
				</StepperTrigger>
				<StepperSeparator v-if="index < items.length - 1" :class="cn(
					'bg-muted transition-colors shrink-0',
					// Disabled
					'group-data-[disabled]:bg-muted group-data-[disabled]:opacity-50',
					// Completed
					'group-data-[state=completed]:bg-accent-foreground',
					props.orientation === 'horizontal' ? 'w-8 h-px' : 'h-8 w-px',
				)" />
			</StepperItem>
		</div>
		<template v-for="(step, index) in items" :key="index">
			<Primitive v-show="slotProps.modelValue === index + 1" asChild>
				<slot :name="`step-${index + 1}`" v-bind="{ ...slotProps, ...step }" />
			</Primitive>
		</template>
	</StepperRoot>
</template>
