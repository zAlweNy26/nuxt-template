<script setup lang="ts">
import { ToggleGroupItem, type ToggleGroupItemProps, type ToggleGroupRootEmits, useForwardPropsEmits } from 'reka-ui'
import { ToggleGroupKey } from '.'
import { type ButtonProps, buttonVariants } from '../button'

const props = withDefaults(defineProps<ToggleGroupItemProps & Omit<ButtonProps, 'variant'>>(), {
	size: 'md',
	square: false,
	class: undefined,
})

const emits = defineEmits<ToggleGroupRootEmits>()

const delegatedProps = reactiveOmit(props, 'size', 'square', 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const item = useTemplateRef<InstanceType<typeof ToggleGroupItem>>('item')

const context = computedInject(ToggleGroupKey, s => s?.value)
</script>

<template>
	<ToggleGroupItem ref="item" v-bind="forwarded" :class="cn(buttonVariants({
		variant: context?.modelValue === forwarded.value ? 'secondary' : 'outline',
		size: context?.size || size,
		square: square ? (context?.size || size) : undefined,
	}), props.class)">
		<slot />
	</ToggleGroupItem>
</template>
