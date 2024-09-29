<script setup lang="ts">
import type { RadioGroupRootEmits, RadioGroupRootProps } from 'reka-ui'
import { useForwardPropsEmits } from 'reka-ui'
import { RadioGroup } from 'reka-ui/namespaced'
import { type RadioItems, type RadioVariants, radioVariants } from '.'

const props = withDefaults(defineProps<{
	root?: RadioGroupRootProps
	items: RadioItems
	class?: ClassValue
	variant?: RadioVariants['variant']
	size?: RadioVariants['size']
	itemClass?: ClassValue
}>(), {
	variant: 'primary',
	size: 'sm',
	root: undefined,
	class: undefined,
	itemClass: undefined,
})

const emits = defineEmits<RadioGroupRootEmits>()

const forwarded = useForwardPropsEmits(() => props.root ?? {}, emits)
</script>

<template>
	<RadioGroup.Root :class="cn('grid gap-2', props.class)" v-bind="forwarded">
		<div v-for="(r, i) in items" :key="`rgi-${i}`" class="flex items-center space-x-2">
			<RadioGroup.Item :id="`rgi-${i}`" :value="r.value"
				:class="cn(radioVariants({ variant, size }), props.itemClass)">
				<RadioGroup.Indicator class="flex items-center justify-center" />
			</RadioGroup.Item>
			<slot :value="r.value">
				<Label :for="`rgi-${i}`">{{ r.name }}</Label>
			</slot>
		</div>
	</RadioGroup.Root>
</template>
