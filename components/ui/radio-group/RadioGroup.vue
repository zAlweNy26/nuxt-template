<script setup lang="ts">
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot,
	type RadioGroupRootEmits, type RadioGroupRootProps, useForwardPropsEmits } from 'radix-vue'
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
	<RadioGroupRoot :class="cn('grid gap-2', props.class)" v-bind="forwarded">
		<div v-for="i in items" :key="i.value" class="flex items-center space-x-2">
			<slot :value="i.value">
				<RadioGroupItem :id="i.value" :value="i.value" :class="cn(radioVariants({ variant, size }), props.itemClass)">
					<RadioGroupIndicator class="flex items-center justify-center" />
				</RadioGroupItem>
				<Label :for="i.value">{{ i.name }}</Label>
			</slot>
		</div>
	</RadioGroupRoot>
</template>
