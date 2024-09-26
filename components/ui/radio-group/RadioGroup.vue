<script setup lang="ts">
import type { RadioGroupRootEmits, RadioGroupRootProps } from 'radix-vue'
import { useForwardPropsEmits } from 'radix-vue'
import { RadioGroup } from 'radix-vue/namespaced'
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
		<div v-for="i in items" :key="i.value" class="flex items-center space-x-2">
			<RadioGroup.Item :id="i.value" :value="i.value"
				:class="cn(radioVariants({ variant, size }), props.itemClass)">
				<RadioGroup.Indicator class="flex items-center justify-center" />
			</RadioGroup.Item>
			<slot :value="i.value">
				<Label :for="i.value">{{ i.name }}</Label>
			</slot>
		</div>
	</RadioGroup.Root>
</template>
